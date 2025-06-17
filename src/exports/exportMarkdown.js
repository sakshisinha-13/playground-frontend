// exports/exportMarkdown.js
// -----------------------------------------------------------------------------
// Utility function to export filtered questions to a Markdown table.
// Each row shows: Link, Type, Topic, Difficulty
// -----------------------------------------------------------------------------

export const exportToMarkdown = (questions) => {
  // Define Markdown table headers
  const headers = "| Link | Type | Topic | Difficulty |\n|------|------|--------|------------|";

  // Convert each question into a Markdown table row
  const rows = questions.map(q =>
    `| ${q.link || ''} | ${q.type || ''} | ${q.topic || ''} | ${q.difficulty || ''} |`
  );

  // Combine headers and rows into a single Markdown string
  const mdContent = [headers, ...rows].join('\n');

  // Create and trigger download as .md file
  const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "questions.md");
  link.click();
};
