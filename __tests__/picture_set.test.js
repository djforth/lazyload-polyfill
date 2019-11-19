import PictureSet from '../src/picture_set';

import { readFileSync } from 'fs';
import { join } from 'path';

const picturePath = join(__dirname, '../__html__/picture.html');
const markup = readFileSync(picturePath);

describe('Picture set', () => {
  let pic;
  let remover = jest.fn(img => {
    img.classList.remove('lozad');
  });

  let opts = {
    src: 'iesrc',
    alt: 'alt',
  };

  beforeAll(() => {
    document.body.innerHTML = markup;
    pic = document.querySelector('picture.lozad');

    PictureSet(opts, remover, pic);
  });

  test('picture should remove data-iesrc', () => {
    expect(pic).not.toHaveAttribute('data-iesrc');
  });

  test('picture should remove data-alt', () => {
    expect(pic).not.toHaveAttribute('data-alt');
  });

  test('should remove lozad class', () => {
    expect(pic).not.toHaveCssClass('lozad');
  });

  describe('Should include image', () => {
    let img;
    beforeAll(() => {
      img = pic.querySelector('img');
    });

    test('should have img element', () => {
      expect(img).toBeElement();
    });

    test('should set loading to lazy', () => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });

    test('should set src from iesrc', () => {
      expect(img).toHaveAttribute('src', 'images/thumbs/04.jpg');
    });

    test('should set alt from data-alt', () => {
      expect(img).toHaveAttribute('alt', 'Woman in a jacuzzi');
    });
  });
});
