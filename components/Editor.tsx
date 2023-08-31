"use client";

import { updateEntry } from "@/services/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

type AnalysisDataListEntry = {
  name: string;
  value: string;
};
type AnalysisData = {
  color: string;
  entries: AnalysisDataListEntry[];
};

const createAnalysisData = ({ color, summary, subject, mood, negative }) => {
  const analysisData: AnalysisData = {
    color,
    entries: [
      { name: "Summary", value: summary },
      { name: "Subject", value: subject },
      { name: "Mood", value: mood },
      { name: "Negative", value: `${negative}` },
    ],
  };

  return analysisData;
};

const Editor = ({ entry }) => {
  const [content, setContent] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);

  const [analysis, updateAnalysis] = useState(entry.analysis);

  const { mood, summary, color, subject, negative } = analysis;

  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: `${negative}` },
  ];

  useAutosave({
    data: content,
    onSave: async (value) => {
      setIsLoading(true);
      const updatedEntry = await updateEntry(entry.id, value);
      updateAnalysis(updatedEntry.analysis);
      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && <div>Loading...</div>}
        <textarea
          className="w-full h-full p-8 text-lg rounded-lg outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="border-l border-black/20">
        <div className="p-8 " style={{ backgroundColor: color }}>
          <h2 className="text-2xl font-semibold">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between py-4 px-2 border-b border-black/20"
              >
                <span className="font-semibold">{item.name}</span>
                <span className="font-light">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
