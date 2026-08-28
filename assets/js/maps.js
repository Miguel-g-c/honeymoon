const encode = value => encodeURIComponent(value || '');

const userAgent = () => typeof navigator === 'undefined' ? '' : navigator.userAgent;
const isIOS = agent => /iPad|iPhone|iPod/.test(agent);
const isAndroid = agent => /Android/i.test(agent);

function amapKeyword(location) {
  // AMap indexes Chinese POI names much more reliably than mixed Chinese/English strings.
  return location.local || location.name;
}

export function mapFallbackUrl(location) {
  if (location.region === 'indonesia') return '';
  return `https://uri.amap.com/search?keyword=${encode(amapKeyword(location))}&src=honeymoon&callnative=0`;
}

export function mapUrl(location, agent = userAgent()) {
  const target = location.local || location.name;
  if (location.region === 'indonesia') {
    const [lat, lon] = String(location.coordinates || location.address).split(',').map(part => part.trim());
    const destination = /^-?\d/.test(lat) && /^-?\d/.test(lon) ? `${lat},${lon}` : encode(`${target}, ${location.address}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  }
  const keyword = amapKeyword(location);
  // Native schemes are required for a dependable app hand-off. The HTTPS URI's
  // callnative flag is best-effort and is blocked by some mobile browsers/webviews.
  if (isIOS(agent)) return `iosamap://path?sourceApplication=Honeymoon&dname=${encode(keyword)}&dev=0&t=0`;
  if (isAndroid(agent)) return `androidamap://poi?sourceApplication=Honeymoon&keywords=${encode(keyword)}&dev=0`;
  return mapFallbackUrl(location);
}

export function mapLabel(location, agent = userAgent()) {
  if (location.region === 'indonesia') return 'Abrir en Maps';
  return isIOS(agent) || isAndroid(agent) ? 'Abrir app AMap' : 'Abrir en AMap';
}
