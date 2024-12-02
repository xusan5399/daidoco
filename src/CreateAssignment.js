import React, { useState } from "react";

export default function CreateAssignment() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 在这里提交课题
    console.log("发布课题：", { title, description, category, tags });
  };

  return (
    <div className="create-assignment">
      <h2>发布新课题</h2>
      <form onSubmit={handleSubmit}>
        <label>
          课题标题：
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          课题描述：
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          课题分类：
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <label>
          标签（逗号分隔）：
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
        <button type="submit">提交课题</button>
      </form>
    </div>
  );
}
