# lazyload-polyfil;

A Lazyload polyfill that converts JS lazyload to native lazyloading.

Because of the way images load, it is important to set up the lazyload for the JS and then if native lazyload is available this polyfill will re-write the images into the lazyload syntax. This is because the images will start to load before the JS initialised in browsers that don't support native lazyload.

By default this is set up for (lozad)[https://apoorv.pro/lozad.js], however it can be configured to other lazyloading libraries.

The best way to set this is using (dynamic imports)[https://github.com/tc39/proposal-dynamic-import#import] which can be set up in (webpack)[https://webpack.js.org/guides/code-splitting/#dynamic-imports], (rollup)[https://rollupjs.org/guide/en/#importing] or (parcel)[https://parceljs.org/code_splitting.html]

This example uses lozad standard set up:

```
<img class="lozad" data-src="image.png" data-alt="Some image" />
```

In the JS -

```
if ('loading' in HTMLImageElement.prototype) {
    import(
    /* webpackChunkName: "lazyload-polyfill" */ '@djforth/lazyload-polyfill'
  ).then(({ default: lazyload }) => {
    lazyload();
  });
} else {
   import(
    /* webpackChunkName: "lozad" */ 'lozad'
  ).then(({ default: lozad }) => {
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
  });
}
```

If you want to change the defaults to your lazyloader of choice they are set to the following:

| Option   | Description                                                 | default                                  |
| :------- | :---------------------------------------------------------- | :--------------------------------------- |
| selector | Set the selectors for the to replace                        | 'img.lozad, iframe.lozad, picture.lozad' |
| imgData  | Sets the data attributes used for src and srcset for images | {                                        |

    src: 'src',
    srcset: 'srcset',

} |
|
