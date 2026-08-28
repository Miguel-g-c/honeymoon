import test from 'node:test';
import assert from 'node:assert/strict';

import { STAYS } from '../assets/js/data.js';
import { mapFallbackUrl, mapUrl } from '../assets/js/maps.js';

const stay = {
  name: 'Sunworld Dynasty Hotel Beijing Wangfujing',
  local: '北京天伦王朝酒店',
  address: '50 Wangfujing Avenue, Dongcheng, Beijing',
  region: 'china',
  coordinates: '39.917919, 116.412254',
};

test('AMap routes to exact accommodation coordinates in the iOS and Android apps', () => {
  assert.equal(
    mapFallbackUrl(stay),
    'https://uri.amap.com/search?keyword=%E5%8C%97%E4%BA%AC%E5%A4%A9%E4%BC%A6%E7%8E%8B%E6%9C%9D%E9%85%92%E5%BA%97&src=honeymoon&callnative=0',
  );
  assert.equal(
    mapUrl(stay, 'Mozilla/5.0 (iPhone)'),
    'iosamap://path?sourceApplication=Honeymoon&dlat=39.917919&dlon=116.412254&dname=%E5%8C%97%E4%BA%AC%E5%A4%A9%E4%BC%A6%E7%8E%8B%E6%9C%9D%E9%85%92%E5%BA%97&dev=1&t=0',
  );
  assert.equal(
    mapUrl(stay, 'Mozilla/5.0 (Linux; Android 15)'),
    'amapuri://route/plan/?sourceApplication=Honeymoon&dlat=39.917919&dlon=116.412254&dname=%E5%8C%97%E4%BA%AC%E5%A4%A9%E4%BC%A6%E7%8E%8B%E6%9C%9D%E9%85%92%E5%BA%97&dev=1&t=0',
  );
});

test('AMap keeps a POI-name search when coordinates are not verified', () => {
  const uncertain = { ...stay, coordinates: '' };
  const expected = 'https://uri.amap.com/search?keyword=%E5%8C%97%E4%BA%AC%E5%A4%A9%E4%BC%A6%E7%8E%8B%E6%9C%9D%E9%85%92%E5%BA%97&src=honeymoon&callnative=0';

  assert.equal(mapFallbackUrl(uncertain), expected);
});

test('every user-verified China stay routes to its supplied coordinates', () => {
  const expectedCoordinates = {
    sunworld: ['39.917919', '116.412254'],
    yurealm: ['29.350525', '110.547859'],
    fenghuang: ['27.953337', '109.590775'],
    yunshang: ['25.804054', '110.146652'],
    yangshuo: ['24.790167', '110.506882'],
    elong: ['31.234379', '121.479439'],
  };

  for (const [id, [latitude, longitude]] of Object.entries(expectedCoordinates)) {
    const stayLocation = STAYS.find(stay => stay.id === id).location;
    const url = new URL(mapUrl(stayLocation, 'Mozilla/5.0 (iPhone)'));
    assert.equal(url.searchParams.get('dlat'), latitude, `${id}: latitud`);
    assert.equal(url.searchParams.get('dlon'), longitude, `${id}: longitud`);
    assert.equal(url.searchParams.get('dev'), '1', `${id}: conversión WGS-84`);
  }
});
