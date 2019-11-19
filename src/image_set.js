const removeAttributes = ({ src, srcset }, img) => {
  img.removeAttribute(`data-${src}`);
  img.removeAttribute(`data-${srcset}`);
};

const setSrcSet = (srcSet, img) => {
  if (!img.hasAttribute(`data-${srcSet}`)) return;

  const srcset = img.dataset[srcSet];
  img.setAttribute('srcset', srcset);
};

export default ({ src, srcset }, remover, img) => {
  const Src = img.dataset[src];
  img.setAttribute('src', Src);
  img.setAttribute('loading', 'lazy');
  setSrcSet(srcset, img);
  removeAttributes({ src, srcset }, img);
  remover(img);
};
