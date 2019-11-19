import { checkElements, curry } from '@djforth/utilities';

import CheckTypes from './check_type';
import ImageSet from './image_set';
import PictureSet from './picture_set';
import RemoveClass from './remove_class';

const defaultOptions = {
  selector: 'img.lozad, iframe.lozad, picture.lozad',
  imgData: {
    src: 'src',
    srcset: 'srcset',
  },
  removeClass: 'lozad',
  picData: {
    src: 'iesrc',
    alt: 'alt',
  },
};

export default opts => {
  const { selector, imgData, removeClass, picData } = {
    ...defaultOptions,
    ...opts,
  };

  const elements = [...document.querySelectorAll(selector)];

  if (!checkElements(...elements)) return null;

  const remover = curry(RemoveClass, removeClass);

  const SetImages = curry(ImageSet, imgData, remover);
  const SetPicture = curry(PictureSet, picData, remover);

  const { iframes, images, pictures } = CheckTypes(elements);

  images.concat(iframes).forEach(SetImages);

  pictures.forEach(SetPicture);
};
