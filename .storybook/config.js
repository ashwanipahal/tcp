import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { configure, addDecorator } from '@storybook/react';
import Provider from './provider';
import commonStyles from '@tcp/core/styles/globalStyles/commonStyles';
import overrideStyles from './styles';
import Theme from '@tcp/core/styles/themes';

const GlobalStyles = createGlobalStyle`${commonStyles}${overrideStyles}`;

addDecorator(story => {
  return <Provider story={story()} />;
});

addDecorator(story => (
  <div className="app">
    <ThemeProvider theme={Theme()}>
      <>
        <GlobalStyles />
        {story()}
      </>
    </ThemeProvider>
  </div>
));

// automatically import all files ending in *.stories.js
const reqRoot = require.context('../stories', true, /\.stories\.jsx?$/);
const reqPkgs = require.context('../packages', true, /\.stories\.jsx?$/);
function loadStories() {
  reqRoot.keys().forEach(filename => reqRoot(filename));
  reqPkgs.keys().forEach(filename => reqPkgs(filename));
}

configure(loadStories, module);
