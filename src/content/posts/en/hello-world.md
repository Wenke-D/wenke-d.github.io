---
title: "A project CLI: alors"
date: 2026-08-20
description: Putting the commands you type every day behind a CLI that belongs to the project.
draft: true
---

Every coding project comes with a handful of commands you end up typing over
and over:

- install or update dependencies
- build the project
- build for release, or build for debugging
- run in release mode
- run in debug mode
- run the tests, again and again
- switch profiles
- deploy
- run a step of CI/CD
- generate some charts

They come from different tools, and the set of them keeps shifting as the
project evolves.

The mismatch is in the mental model. We think in terms of what we want to
do — test, deploy, run, build. What we type is which tool does it. That mapping
does not change often, but every time you cross it you pay a small context
switch: which tool handles this step again?

Some tools already solve part of this. Myself included: on the first C/C++
project I worked on, before we moved to CMake, we used GNU make for more than
the build pipeline — there was a `clean` target that deleted the intermediate
output. At that point make was not really a C build tool. It was a shortcut
runner.

What we actually want is something that runs on behalf of the project: one
place that holds every command we may reach for, so we can forget which tool
does the work and keep only the intent. Something like `my_project run`,
`my_project dev`, `my_project deploy`. That is friendly to the mind.

More specialized tools exist. npm lets us define ad-hoc shortcuts in
`package.json`, but it comes bound to the JavaScript ecosystem. `just` does
only this, and does it well: `just run`, `just dev`, `just deploy` — smooth for
daily work.

But as my usage got more complex, parts of its design stopped fitting me:
subcommands, and how to import another justfile so a project does not end up as
one long file. In its design, those two concepts are somewhat conflated.

So, with the help of an AI agent, I built `alors`. Same purpose, inspired by
just, with subcommands and imports redesigned as separate things. Shell
execution differs slightly too, favouring explicitness and strictness — which,
now that AI agents are writing and running these commands with us, I think
matters more than ever.
