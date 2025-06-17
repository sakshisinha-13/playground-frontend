// src/pages/Playground.jsx
// -----------------------------------------------------------------------------
// This page renders the code execution environment. It includes:
// - Problem description on the left (title, difficulty, topic, year)
// - Code editor on the right with AceEditor
// - Language selector, stdin input, and run button
// - Calls backend to execute code and display output
// -----------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AceEditor from "react-ace";
import axios from "axios";

// 🔧 ACE Editor configuration
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

// 📌 Default template code for each language
const defaultCodeMap = {
  javascript: `function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("World"));`,

  python: `def greet(name):
    return "Hello, " + name + "!"

print(greet("World"))`,

  c_cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`
};

// 🎨 Badge colors based on difficulty level
const difficultyBadge = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Hard: "bg-red-100 text-red-700",
};

const Playground = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [code, setCode] = useState(defaultCodeMap["javascript"]);
  const [language, setLanguage] = useState("javascript");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Redirect if opened without question state
  useEffect(() => {
    if (!state || !state.title) navigate("/dashboard");
  }, [state, navigate]);

  // 🚀 Run code via backend API
  const runCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/execute", {
        language,
        code,
        input,
      });
      setOutput(res.data.output);
    } catch (err) {
      setOutput("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!state) return null;    // prevent render if state is missing

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* LEFT PANEL - Question Description  */}
      <div className="md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-300 dark:border-gray-700">
        <button
          className="mb-4 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300">{state.title}</h1>

        <div className="flex gap-2 mt-2">
          <span className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700">{state.topic}</span>
          <span className={`px-2 py-1 text-xs rounded ${difficultyBadge[state.difficulty] || "bg-gray-300"}`}>
            {state.difficulty}
          </span>
          <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">{state.year}</span>
        </div>

        {/* 📄 Description */}
        <div className="mt-4">
          <h2 className="text-md font-semibold mb-1">📝 Description:</h2>
          <p className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
            {state.description}
          </p>
        </div>

        {/* 💡 Instructions */}
        <div className="mt-4">
          <h2 className="text-md font-semibold mb-1">Instructions:</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
            <li>Write your code in the editor.</li>
            <li>You can provide custom input (stdin).</li>
            <li>Click “Run Code” to see the output.</li>
          </ul>
        </div>
      </div>

      {/* RIGHT PANEL - Code Editor & Output */}
      <div className="md:w-1/2 p-6 flex flex-col gap-4">
        {/* Language Selector */}
        <div className="flex gap-4 items-center">
          <label className="font-medium">Language:</label>
          <select
            className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
            value={language}
            onChange={(e) => {
              const lang = e.target.value;
              setLanguage(lang);
              setCode(defaultCodeMap[lang]);
            }}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c_cpp">C++</option>
          </select>
        </div>

        {/* Ace Code Editor */}
        <AceEditor
          mode={language}
          theme="monokai"
          value={code}
          onChange={setCode}
          name="code-editor"
          width="100%"
          height="300px"
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            useWorker: false,
          }}
        />

        {/* Input box */}
        <div>
          <label className="block text-sm font-medium mb-1">Custom Input (stdin):</label>
          <textarea
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Run Button */}
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={runCode}
          disabled={loading}
        >
          {loading ? "Running…" : "Run Code"}
        </button>

        {/* Output box */}
        <div>
          <label className="block text-sm font-medium mb-1">Output:</label>
          <pre className="w-full p-2 bg-gray-200 dark:bg-gray-800 rounded overflow-x-auto whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Playground;
