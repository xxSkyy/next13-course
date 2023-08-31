"use client";

import { askQuestion } from "@/services/api";
import { ChangeEventHandler, useState } from "react";

const Question = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const answer = await askQuestion(value);

    setResponse(answer);
    setValue("");
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-row">
        <input
          disabled={loading}
          onChange={onChange}
          type="text"
          placeholder="Ask a question"
          className="border border-black/10 p-4 py-2 flex-grow text-lg rounded-lg"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 text-white px-4 py-2 rounded-lg text-lg font-bold"
        >
          Ask
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {response && !loading && <div>{response}</div>}
    </div>
  );
};

export default Question;
