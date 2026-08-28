import { DAYS } from './data.js';

export const dateKey = (date = new Date()) => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};

export function tripDayForToday(now = dateKey()) { return DAYS.find(day => day.date === now) || null; }

export function parseRoute(hash = location.hash) {
  const clean = hash.replace(/^#/, '') || '/';
  if (clean === '/') return { name:'home' };
  if (clean === '/ruta') return { name:'route' };
  if (clean === '/kit') return { name:'kit' };
  const match = clean.match(/^\/dia\/(\d{4}-\d{2}-\d{2})$/);
  if (match && DAYS.some(day => day.date === match[1])) return { name:'day', date:match[1] };
  return { name:'home', invalid:true };
}

export const dayHref = date => `#/dia/${date}`;
export const routeHref = name => ({ home:'#/', route:'#/ruta', kit:'#/kit' }[name] || '#/');
