import ImageSet from '../src/image_set';

describe('Image setup', () => {
  let opts = { src: 'src', srcset: 'srcset' };
  let remover = jest.fn(img => {
    img.classList.remove('lozad');
  });

  describe('if basic image', () => {
    let img;

    beforeAll(() => {
      document.body.innerHTML = '<img data-src="some-image.jpg" class="lozad" />';
      img = document.querySelector('.lozad');
      ImageSet(opts, remover, img);
    });

    afterAll(() => {
      remover.mockClear();
    });

    test('should set src', () => {
      expect(img).toHaveAttribute('src', 'some-image.jpg');
    });

    test('should set loading to lazy', () => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });

    test('should remove lozad class', () => {
      expect(img).not.toHaveCssClass('lozad');
    });

    test('should remove data-src', () => {
      expect(img).not.toHaveAttribute('data-src', 'some-image.jpg');
    });
  });

  describe('if has srcset', () => {
    let img;
    beforeAll(() => {
      document.body.innerHTML =
        '<img data-src="some-image.jpg" class="lozad" data-srcset="large.jpg 1024w, medium.jpg 640w, small.jpg 320w" sizes="(min-width: 36em) 33.3vw, 100vw" />';
      img = document.querySelector('.lozad');
      ImageSet(opts, remover, img);
    });

    afterAll(() => {
      remover.mockClear();
    });

    test('should set src', () => {
      expect(img).toHaveAttribute('src', 'some-image.jpg');
    });

    test('should set srcset', () => {
      expect(img).toHaveAttribute('srcset', 'large.jpg 1024w, medium.jpg 640w, small.jpg 320w');
    });

    test('should set loading to lazy', () => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });

    test('should remove lozad class', () => {
      expect(img).not.toHaveCssClass('lozad');
    });

    test('should remove data-src', () => {
      expect(img).not.toHaveAttribute('data-src', 'some-image.jpg');
    });

    test('should remove data-srcset', () => {
      expect(img).not.toHaveAttribute('data-srcset', 'large.jpg 1024w, medium.jpg 640w, small.jpg 320w');
    });
  });
});
