import LazyLoading from '../src';

import { readFileSync } from 'fs';
import { join } from 'path';

const imagePath = join(__dirname, '../__html__/img.html');
const images = readFileSync(imagePath);

const picturePath = join(__dirname, '../__html__/picture.html');
const pictures = readFileSync(picturePath);

const iframePath = join(__dirname, '../__html__/iframe.html');
const iframes = readFileSync(iframePath);

describe('LazyLoading', () => {
  let ifs, imgs, pics;
  beforeAll(() => {
    document.body.innerHTML = images.toString() + pictures.toString() + iframes.toString();

    ifs = [...document.querySelectorAll('iframe.lozad')];

    imgs = [...document.querySelectorAll('img.lozad')];

    pics = [...document.querySelectorAll('picture.lozad')];

    LazyLoading();
  });

  test('should set iframes', () => {
    ifs.forEach(iframe => {
      expect(iframe).toHaveAttribute('loading', 'lazy');
      expect(iframe).not.toHaveCssClass('lozad');
      expect(iframe).toHaveAttribute('src', 'embed.html');
      expect(iframe).not.toHaveAttribute('data-src', 'embed.html');
    });
  });

  test('should set images', () => {
    imgs.forEach((img, i) => {
      expect(img).toHaveAttribute('loading', 'lazy');
      expect(img).toHaveAttribute('src');
      expect(img).not.toHaveCssClass('lozad');
      expect(img).not.toHaveAttribute('data-src', expect.any(String));
      if (i === 2) {
        expect(img).not.toHaveAttribute('data-srcset');
        expect(img).toHaveAttribute('srcset');
      }
    });
  });

  test('should set picture', () => {
    pics.forEach(pic => {
      expect(pic).not.toHaveCssClass('lozad');
      expect(pic).not.toHaveAttribute('data-iesrc');
      expect(pic).not.toHaveAttribute('data-alt');

      const img = pic.querySelector('img');
      expect(img).toHaveAttribute('loading', 'lazy');
      expect(img).toHaveAttribute('src', 'images/thumbs/04.jpg');
      expect(img).toHaveAttribute('alt', 'Woman in a jacuzzi');
    });
  });
});
