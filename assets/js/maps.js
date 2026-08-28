const encode = value => encodeURIComponent(value || '');

export function mapUrl(location) {
  const target = location.local || location.name;
  if (location.region === 'indonesia') {
    const [lat, lon] = String(location.coordinates || location.address).split(',').map(part => part.trim());
    const destination = /^-?\d/.test(lat) && /^-?\d/.test(lon) ? `${lat},${lon}` : encode(`${target}, ${location.address}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  }
  // Coordinates are deliberately only used where verified. AMap search avoids invented pins.
  return `https://uri.amap.com/search?keyword=${encode(`${target} ${location.address}`)}&src=honeymoon&callnative=1`;
}

export function mapLabel(location) { return location.region === 'indonesia' ? 'Abrir en Maps' : 'Abrir en AMap'; }
