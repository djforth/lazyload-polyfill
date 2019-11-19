export default list =>
  list.reduce(
    ({ iframes, images, pictures }, item) => {
      switch (item.tagName) {
        case 'PICTURE':
          pictures.push(item);
          break;
        case 'IFRAME':
          iframes.push(item);
          break;
        case 'IMG':
          images.push(item);
          break;
      }

      return { iframes, images, pictures };
    },
    {
      iframes: [],
      images: [],
      pictures: [],
    }
  );
