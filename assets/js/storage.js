const PREFIX = 'honeymoon-2026:';
const keys = { checklist:'checklist', favourites:'favourites', notes:'notes' };

function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(PREFIX + key)) ?? fallback; } catch { return fallback; }
}
function write(key, value) { localStorage.setItem(PREFIX + key, JSON.stringify(value)); return value; }

export const storage = {
  checklist: () => read(keys.checklist, {}),
  favourites: () => read(keys.favourites, []),
  notes: () => read(keys.notes, ''),
  toggleChecklist(item) { const value = this.checklist(); value[item] = !value[item]; return write(keys.checklist, value); },
  toggleFavourite(id) { const values = this.favourites(); const next = values.includes(id) ? values.filter(value => value !== id) : [...values, id]; return write(keys.favourites, next); },
  saveNotes(value) { return write(keys.notes, value); },
  reset() { Object.values(keys).forEach(key => localStorage.removeItem(PREFIX + key)); },
};
