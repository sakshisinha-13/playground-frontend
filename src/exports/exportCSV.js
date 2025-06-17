// exports/exportCSV.js
// -----------------------------------------------------------------------------
// Utility function to export filtered questions to a downloadable CSV file.
// Each row contains: Link, Type (OA/Interview), Topic, and Difficulty.
// -----------------------------------------------------------------------------

export const exportToCSV = (questions) => {
  // Define CSV headers
  const headers = ['Link', 'Type', 'Topic', 'Difficulty'];

  // Format question rows as arrays of strings
  const rows = questions.map(q => [
    q.link || '',
    q.type || '',
    q.topic || '',
    q.difficulty || ''
  ]);

  // Convert headers + rows to a CSV string with comma-separated values
  const csvContent = [headers, ...rows]
    .map(e => e.map(v => `"${v}"`).join(','))
    .join('\n');

  // Create a Blob (downloadable file)
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  // Create and auto-click a download link
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "questions_export.csv");
  link.click();
};
