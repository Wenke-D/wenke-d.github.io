---
title: "alors: A CLI for your project"
date: 2026-10-04
description: Give the commands you type every day a home in your project's CLI.
draft: false
---

In every coding project, we keep repeating the same tasks:

- install or update dependencies
- build the executable in release or debug mode
- run the executable in release or debug mode
- run a specific test suite or all the tests
- deploy to a test environment or production
- run a step in a CI/CD pipeline
- generate some charts

These commands come from different tools, and the list keeps changing as the
project evolves.

There is a mismatch between how we think about a task and how we execute
it. We think in terms of the task: build, test, or deploy. But to run the task,
we first have to remember which tool to use, such as `cmake`, `npm`, `scp`,
`ctest`, or `docker`. Each time, we make a small mental context switch: which
tool handles this step again? Could we stop having to think about that part?

Some tools already help with this. Take `make`, for example. Like many others,
I first encountered it when learning how to compile a C project. We often
define a phony `clean` target to delete intermediate build files, letting us
type `make clean` instead of
`rm -rf build/*.o`. The target produces no build artifact; it simply gives a
task a name and hides the command behind it. That is exactly what I want here:
to run a task without having to remember the underlying command. We find
similar conveniences in other ecosystems, such as `npm run` for web projects,
Gradle tasks like `./gradlew test` for Java and Kotlin projects, and Invoke
tasks like `invoke clean` for Python projects.

We need a CLI for the project itself: one place to define common tasks and run
them by name.
Something like `my_project run`, `my_project test`, or `my_project deploy`.
Those names follow the way we think about the work. A shorter command name
would make this easier to type.

Tools like this already exist. [`just`](https://github.com/casey/just) is the
one I used. Two other projects share the name `lets`:
[`lets-cli/lets`](https://github.com/lets-cli/lets) in Go and
[`rapidity-rs/lets`](https://github.com/rapidity-rs/lets) in Rust.

`just` served me well, but as my usage grew more complex, some of its design
choices became less convenient for me. In particular, I wanted to define
subcommands independently of how I split tasks across files. In `just`,
subcommands are defined through modules, each in a separate file.

With the help of AI agents, I built [`alors`](https://github.com/Wenke-D/alors).
It serves the same purpose and takes inspiration from `just` (I wasn't aware of
either `lets` project at the time), with a few different design choices
described below.

## Using `alors`

### Define tasks

Define tasks in a file called `tasks.alors`, using syntax similar to `make`:

```make
install:
    npm ci

release:
    cmake -S . -B build-release -DCMAKE_BUILD_TYPE=Release
    cmake --build build-release
```

Then run them from the terminal:

```console
alors install
alors release
```

Each task's body runs in a single shell session, even when it spans multiple
lines. Running `alors` without a task name lists the available tasks.

### Task sequences

A task can depend on other tasks. List them after the `:`, separated by commas,
and they run in the order given, before the task's own body.

In `tasks.alors`:

```make
install:
    npm ci

configure:
    cmake -S . -B build

compile:
    cmake --build build

prepare: install, configure, compile
```

One command then runs all three tasks:

```console
$ alors prepare
npm ci
cmake -S . -B build
cmake --build build
```

### Define subcommands

Group related tasks under a namespace to expose them as subcommands. In the
task file, separate the namespace from the task name with `::`. On the command
line, separate them with a space.

In `tasks.alors`:

```make
docker::build:
    docker build -t app .

docker::push: docker::build
    docker push app

# a namespace can also carry a task of its own
docker: docker::build
```

And in the terminal:

```console
alors docker build
alors docker push
alors docker
```

For more details, see the project's
[README](https://github.com/Wenke-D/alors).

## Differences from other tools

The design of `alors` emphasizes explicit defaults and minimal setup.

### Task arguments

`alors` treats task arguments as strings and leaves type conversion and value
validation to the underlying command. Shell commands receive arguments as
strings; the command that uses them is responsible for interpreting their
meaning.

Task parameters are positional. For commands we run frequently, the goal is a
short invocation. If we keep typing a long command with many options, we should
put that invocation in `tasks.alors` and give it a short task name.

### Shell execution defaults

In `alors`, each task body runs in a single shell session by default to facilitate writing short shell scripts directly inside a task.

The shell also runs with `-e` enabled by default, so a failed command normally
stops the task instead of letting subsequent commands hide the failure.

Ordinary shell recipes in `just` run each line in a fresh shell by default.

### Subcommands

In `alors`, subcommands come directly from task namespaces: `docker::build`
becomes `alors docker build`. The command structure is visible in the task name
and does not depend on a separate module file.

In `just`, [modules](https://just.systems/man/en/modules.html) provide subcommands,
with each module defined in its own file. It also supports
[imports](https://just.systems/man/en/imports.html) for combining files without
creating subcommands. My preference is to define the command hierarchy directly
in the task names.

The [Rust version of `lets`](https://github.com/rapidity-rs/lets) uses nested KDL
blocks to define subcommands. For `alors`, I chose to keep the familiar task
syntax and add namespaces through `::`.

### Task sequences and skipping

In `alors`, a task sequence says what to run and in what order. There is no
built-in mechanism for skipping tasks: `alors` does not cache task results or
check whether a task's outputs are already up to date.

Other tools handle this in different ways:

- [`just`](https://just.systems/man/en/dependencies.html) runs a recipe with the
  same arguments only once per invocation, even if several recipes depend on
  it. This avoids repeating shared dependencies within that invocation.
- The [Go version of `lets`](https://lets-cli.org/docs/config/#persist_checksum)
  can calculate and persist file checksums, then expose whether they changed
  through environment variables. A task's script can use those flags to decide
  whether to do the work.
- The [Rust version of `lets`](https://github.com/rapidity-rs/lets#preconditions--up-to-date-checks)
  supports `status` checks that skip tasks considered up to date, as well as
  `sources` declarations that skip tasks when the tracked file contents have
  not changed since the last successful run. It also runs shared dependencies
  at most once per invocation.

I prefer to leave incremental builds to dedicated build tools. They already
track dependencies between source files and build artifacts, and know which
parts need rebuilding. Keeping that decision there also means I do not have to
maintain another set of build inputs and skip conditions in `tasks.alors`.

For example, `alors` invokes `cmake --build build` each time the `compile` task
runs. CMake then delegates to the underlying build tool, such as Make or Ninja,
which decides what actually needs recompiling. Calling the build command every
time does not mean rebuilding everything every time.
