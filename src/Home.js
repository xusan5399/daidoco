import React from "react";

export default function Home() {
  const topics = [
    { id: 1, title: "如何优化JS性能？", description: "分享你的技巧与经验" },
    {
      id: 2,
      title: "UI设计中的配色方案",
      description: "大家讨论一下好用的工具和方案",
    },
    { id: 3, title: "机器学习课题讨论", description: "关于模型优化的经验" },
  ];

  return (
    <div className="home">
      <h2>社区课题列表</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
