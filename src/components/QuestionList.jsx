// components/QuestionList.jsx
// -----------------------------------------------------------------------------
// Displays a list of filtered questions in a card-style layout.
// - Clickable cards navigate to the Playground page with question details.
// - Each question can be ticked/unticked using a checkbox.
// -----------------------------------------------------------------------------

import React from "react";
import { useNavigate } from "react-router-dom";

export default function QuestionList({ filteredQuestions = [], tickedQuestions = {}, toggleTick }) {
  const navigate = useNavigate();

  // 🚀 Navigate to Playground with question data
  const handleClick = (q, index) => {
    const title = q.title || `Question ${index + 1}`;
    const description = q.description || `${q.topic || "General"} (${q.difficulty || "Unknown"})`;
    const difficulty = q.difficulty || "Unknown";
    const topic = q.topic || "N/A";
    const year = q.year || "N/A";
    const type = q.type || "Interview";

    navigate(`/playground/${encodeURIComponent(title)}`, {
      state: { title, description, difficulty, topic, year, type },
    });
  };

  // 🔑 Generate a unique key for each question card
  const uniqueKey = (q, index) => `${q.title || index}-${index}`;

  // 🧾 No questions to show
  if (filteredQuestions.length === 0) {
    return <p className="text-center text-gray-600 dark:text-gray-300">No questions found.</p>;
  }

  return (
    <div className="grid gap-4">
      {filteredQuestions.map((q, index) => {
        const isTicked = tickedQuestions[q.link];
        const title = q.title || `Question ${index + 1}`;
        const difficulty = q.difficulty || "Unknown";
        const topic = q.topic || "N/A";

        return (
          <div
            key={uniqueKey(q, index)}
            className={`p-4 rounded shadow cursor-pointer ${isTicked ? "bg-green-100 dark:bg-green-800" : "bg-white dark:bg-gray-800"
              } hover:bg-gray-200 dark:hover:bg-gray-700`}
            onClick={() => handleClick(q, index)}
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold break-words max-w-[90vw]">
                {title}
              </span>
              <input
                type="checkbox"
                checked={!!isTicked}
                onClick={(e) => e.stopPropagation()}
                onChange={() => toggleTick(q.link)}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Difficulty: {difficulty}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Topic: {topic}</p>
          </div>
        );
      })}
    </div>
  );
}
