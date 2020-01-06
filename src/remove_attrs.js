// Taken from https://stackoverflow.com/a/54246501/482751
const convertCase = str =>
  str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

export default (attrs, element) => {
  attrs.forEach(attr => {
    const dataAttr = convertCase(attr);

    element.removeAttribute(`data-${dataAttr}`);
  });
};
