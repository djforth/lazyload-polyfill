import removeAttr from './remove_attrs';

// const removeAttributes = img => {
//   img.removeAttribute('data-iesrc');
//   img.removeAttribute('data-alt');
// };

const imgTemplate = ({ src, alt }) =>
  `<img src="${src}" alt="${alt}" loading="lazy" />`;

const insertImg = (picture, img) => {
  picture.insertAdjacentHTML('beforeend', img);
};

const getAttrs = ({ src, alt }, picture) => ({
  alt: picture.dataset[alt],
  src: picture.dataset[src]
});

export default (opts, remover, pic) => {
  const img = imgTemplate(getAttrs(opts, pic));
  insertImg(pic, img);
  const { src, alt } = opts;

  removeAttr([src, alt], pic);
  remover(pic);
};
