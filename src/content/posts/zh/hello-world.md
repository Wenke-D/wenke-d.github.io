---
title: 你好，世界
date: 2026-08-20
description: 模板文章 —— 写完第一篇真正的文章后可以删掉它。
draft: true
---

这个文件是模板，放在 `src/content/posts/zh/` 里，文件名（`hello-world.md`）
就是它的网址：`/zh/blog/hello-world`。

因为上面的 frontmatter 里写了 `draft: true`，它只在 `npm run dev` 时可见，不会
出现在构建出来的网站上。改成 `draft: false` 就发布了。`description` 是可选的，
会显示在文章列表的标题下面，也会作为搜索引擎看到的页面描述。

## 可以写些什么

普通段落、**粗体**、*斜体*、[链接](https://astro.build)，还有 `行内代码`。
标题从 `##` 开始 —— 上面的文章标题已经占掉了 `#`。

- 无序列表可以用
- 有序列表也可以

> 引用块，用来单独拎出一句值得强调的话。

代码块带语法高亮：

```python
def surrogate(mesh):
    return model(mesh)
```

---

写新文章时，复制这个文件、改个名字，然后开始写就行。列表按 `date` 倒序排列。
