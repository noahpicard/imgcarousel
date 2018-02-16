# imgcarousel
A generalized image carousel framework

# Introduction
This provides a carousel module for any number of images (4 included in the example).

To run, simply open `public/index.html`

The React code is in `public/js/index.js`, and the CSS code is in `public/css/style.css`

To update the index.js file and see results, simply run the `npm run build` command from the top directory when finished editing. This uses babel and webpack to create the final JS file at `public/dist/bundle.js`.

The React component ImgCarousel expects a rotationTime (seconds to rotate an image), height, width, and list of images. An example request is:

```
ReactDOM.render(
  <ImgCarousel 
    rotationTime="8" 
    height="400px" 
    width="100%" 
    items={[
      {"name": "image1", "src": "images/river.jpg"}, 
      {"name": "image2", "src": "images/rock.jpg"}, 
      {"name": "image3", "src": "images/sky.jpg"},
      {"name": "image4", "src": "images/snow.jpg"}
    ]}/>,
  document.getElementById('carousel')
);
``` 

Requires: npm, babel (babel-cli, babel-plugin-transform-react-jsx, babel-preset-env, babel-preset-react), lodash, react, react-dom, webpack