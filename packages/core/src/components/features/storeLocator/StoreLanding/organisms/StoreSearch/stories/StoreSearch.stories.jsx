import React from 'react';
import { ThemeProvider } from 'styled-components';
import Theme from '@tcp/core/styles/themes';
import { storiesOf } from '@storybook/react';
import StoreSearchView from '../views/StoreSearch';
import mockLabels from '../../../container/__mocks__/storeSearchData';

storiesOf('StoreSearch', module)
  .add('with styles and redux-form', () => (
    <StoreSearchView
      searchIcon="/static/images/search-icon.svg"
      markerIcon="/static/images/marker-icon.svg"
      labels={mockLabels}
    />
  ))
  .add('with store brand selected', () => (
    <StoreSearchView
      searchIcon="/static/images/search-icon.svg"
      markerIcon="/static/images/marker-icon.svg"
      gymSelected
      labels={mockLabels}
    />
  ))
  .add('with brand selected', () => {
    console.log(Theme());
    const theme = { ...Theme(), isGymboree: true };
    return (
      <ThemeProvider theme={theme}>
        <StoreSearchView
          searchIcon="/static/images/search-icon.svg"
          markerIcon="/static/images/marker-icon.svg"
          labels={mockLabels}
        />
      </ThemeProvider>
    );
  });
