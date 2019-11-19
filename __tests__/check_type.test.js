import CheckTypes from '../src/check_type';

import { readFileSync } from 'fs';
import { join } from 'path';

const imagePath = join(__dirname, '../__html__/img.html');
const images = readFileSync(imagePath);

const picturePath = join(__dirname, '../__html__/picture.html');
const pictures = readFileSync(picturePath);

const iframePath = join(__dirname, '../__html__/iframe.html');
const iframes = readFileSync(iframePath);

describe('check_type', () => {
  let els, ifs, imgs, pics, data;
  beforeAll(() => {
    document.body.innerHTML = images.toString() + pictures.toString() + iframes.toString();
    els = [...document.querySelectorAll('iframe.lozad, img.lozad, picture.lozad')];
    ifs = [...document.querySelectorAll('iframe.lozad')];

    imgs = [...document.querySelectorAll('img.lozad')];

    pics = [...document.querySelectorAll('picture.lozad')];

    data = CheckTypes(els);
  });

  test('should include all iframes', () => {
    expect(data.iframes).toHaveLength(1);
    expect(data.iframes).toEqual(ifs);
  });

  test('should include all pictures', () => {
    expect(data.pictures).toHaveLength(1);
    expect(data.pictures).toEqual(pics);
  });

  test('should include all images', () => {
    expect(data.images).toHaveLength(3);
    expect(data.images).toEqual(imgs);
  });
});
