import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const reqRoot = require.context('../stories', true, /\.stories\.jsx?$/);
const reqPkgs = require.context('../packages', true, /\.stories\.jsx?$/);
function loadStories() {
  reqRoot.keys().forEach(filename => reqRoot(filename));
  reqPkgs.keys().forEach(filename => reqPkgs(filename));
}

configure(loadStories, module);
