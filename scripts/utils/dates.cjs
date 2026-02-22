/**
 * Generate a spread of publish dates between startDate and endDate.
 * Returns an array of date strings in YYYY-MM-DD format.
 */
function generateDateRange(startDate, endDate, count) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const range = end.getTime() - start.getTime();
  const dates = [];

  for (let i = 0; i < count; i++) {
    const offset = Math.floor((range * i) / Math.max(count - 1, 1));
    const d = new Date(start.getTime() + offset);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    dates.push(`${yyyy}-${mm}-${dd}`);
  }

  return dates;
}

/**
 * Build a publish schedule mapping each topic to a date.
 * Topics is a flat array; dates are spread across the range.
 */
function buildPublishSchedule(topics, startDate = '2024-03-01', endDate = '2026-02-15') {
  const dates = generateDateRange(startDate, endDate, topics.length);
  return topics.map((topic, i) => ({ ...topic, publishDate: dates[i] }));
}

module.exports = { generateDateRange, buildPublishSchedule };
