// All translatable text lives here. Add a language by adding a key to each map.
export const languages = {
  en: "English",
  zh: "中文",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const ui = {
  en: {
    name: "Wenke DU",
    role: "PhD Student",
    affiliation: "Inria, IFPEN & Université Grenoble Alpes",
    blurb:
      "I'm a PhD student (2024–2027) with the DataMove team at Inria and IFP Energies Nouvelles, affiliated with Université Grenoble Alpes. My research designs a deep neural network (DNN) inference framework for massively parallel, exascale simulations — bringing trained models into HPC codes written in C, C++, and Fortran. I work at the intersection of deep learning, graph neural networks, and high-performance computing, with applications to computational fluid dynamics (CFD). I'm advised by Bruno Raffin, Jean-Marc Gratien, and Raphaël Gayno.",
    nav: { thesis: "Thesis" },
    newsHeading: "News",
    selectedHeading: "Selected Publications",
    allLink: "All →",
    pubsTitle: "Publications",
    backHome: "← Home",
  },
  zh: {
    name: "杜文可",
    role: "博士研究生",
    affiliation: "Inria、IFPEN 与格勒诺布尔阿尔卑斯大学",
    blurb:
      "我是一名博士研究生(2024–2027),就读于法国国家信息与自动化研究所(Inria)DataMove 团队与法国石油研究院(IFPEN),隶属于格勒诺布尔阿尔卑斯大学。我的研究致力于为面向百亿亿次(Exascale)的大规模并行仿真设计深度神经网络(DNN)推理框架,将训练好的模型引入以 C、C++ 和 Fortran 编写的高性能计算(HPC)代码中。我的研究方向位于深度学习、图神经网络与高性能计算的交叉领域,并应用于计算流体力学(CFD)。我的导师为 Bruno Raffin、Jean-Marc Gratien 与 Raphaël Gayno。",
    nav: { thesis: "博士课题" },
    newsHeading: "近况",
    selectedHeading: "代表性论文",
    allLink: "全部 →",
    pubsTitle: "论文发表",
    backHome: "← 返回首页",
  },
} as const;

// News items per language (newest first). HTML is allowed in `text`.
export const news: Record<Lang, { date: string; text: string }[]> = {
  en: [
    {
      date: "Jun 2026",
      text:
        'Paper accepted at the <a class="text-accent hover:underline" href="https://repro-hpc.github.io/">1st REPRO-HPC Workshop</a> (co-located with ISC26), where I\'ll give a talk on June 26. 🎉',
    },
    { date: "Sep 2024", text: "Started my PhD at Inria & IFPEN." },
  ],
  zh: [
    {
      date: "2026年6月",
      text:
        '论文被 <a class="text-accent hover:underline" href="https://repro-hpc.github.io/">第一届 REPRO-HPC 研讨会</a>(与 ISC26 同期举办)接收,我将于 6 月 26 日作报告。🎉',
    },
    { date: "2024年9月", text: "于 Inria 与 IFPEN 开始博士研究。" },
  ],
};
