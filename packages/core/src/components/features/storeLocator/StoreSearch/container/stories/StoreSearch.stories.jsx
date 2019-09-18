import React from 'react';
import { ThemeProvider } from 'styled-components';
import Theme from '@tcp/core/styles/themes';
import { storiesOf } from '@storybook/react';
import StoreSearch from '../views/StoreSearch';
import mockLabels from '../__mocks__/storeSearchData';

storiesOf('StoreSearch', module)
  .add('with styles and redux-form', () => (
    <StoreSearch searchIcon="/search-icon.svg" markerIcon="/marker-icon.svg" labels={mockLabels} />
  ))
  .add('with store brand selected', () => (
    <StoreSearch
      searchIcon="/search-icon.svg"
      markerIcon="/marker-icon.svg"
      gymSelected={true}
      labels={mockLabels}
    />
  ))
  .add('with brand selected', props => {
    console.log(Theme());
    const theme = { ...Theme(), isGymboree: true };
    return (
      <ThemeProvider theme={theme}>
        <StoreSearch
          searchIcon="/search-icon.svg"
          markerIcon="/marker-icon.svg"
          labels={mockLabels}
        />
      </ThemeProvider>
    );
  });
