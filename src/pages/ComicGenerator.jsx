import { useState } from "react";

export default function ComicGenerator() {
  const [topic, setTopic] = useState("");
  const [story, setStory] = useState("");
  const [panels, setPanels] = useState([]);

  const generateComic = async () => {
    const response = await fetch("http://127.0.0.1:8000/story/generate-comic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: topic
      })
    });

    const data = await response.json();

    setStory(data.story);
    setPanels(data.panels);
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-4">AI Comic Generator 🎨</h1>

      <input
        type="text"
        placeholder="Enter story topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border p-2 rounded mr-2"
      />

      <button
        onClick={generateComic}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate Comic
      </button>

      {story && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Story:</h2>
          <p>{story}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-6">
        {panels.map((panel, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow">
            <img src={panel.image_url} alt="comic" />
            <p className="mt-2">{panel.text}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
