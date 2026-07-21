/* ============================================
   FILADELPHIA MINISTRY — Modern Daily Devotion
   (Fixed Version)
   ============================================ */

const state = {
  currentDate: null,
  archiveFiles: [],
  archiveData: [],
  todayData: null,
  isDark: false,
  currentPage: 'today',
  archivedDates: new Set()
};

function formatDate(dateStr) {
  try {
    const date = new Date(dateStr + 'T00:00:00');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  } catch (e) {
    return dateStr;
  }
}

function formatShortDate(dateStr) {
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}

function estimateReadingTime(text) {
  if (!text) return '1 min read';
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes + ' min read';
}

function stripHtml(html) {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function getTodayDateString() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

function getYesterdayDateString(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

function getTomorrowDateString(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

function parseFrontMatter(markdown) {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { frontMatter: {}, content: markdown };

  const frontMatter = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontMatter[key] = value;
    }
  }
  return { frontMatter, content: match[2] };
}

function processDevotionContent(html, sectionType) {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;

  const blockquotes = div.querySelectorAll('blockquote');
  blockquotes.forEach(bq => bq.classList.add('verse-highlight'));

  const headings = div.querySelectorAll('h2, h3');
  headings.forEach(h => {
    const text = h.textContent.toLowerCase();
    if (text.includes('doa') || text.includes('prayer')) {
      let sibling = h.nextElementSibling;
      const prayerContent = [];
      while (sibling && !sibling.matches('h1, h2, h3, h4, h5,
