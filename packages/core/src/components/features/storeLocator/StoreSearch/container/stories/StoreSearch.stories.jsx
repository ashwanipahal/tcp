import React from 'react';
import { storiesOf } from '@storybook/react';
import StoreSearch from '../views/StoreSearch';

storiesOf('StoreSearch', module).add('with styles and redux-form', () => (
  <StoreSearch searchIcon="/search-icon.svg" markerIcon="/marker-icon.svg" />
));
