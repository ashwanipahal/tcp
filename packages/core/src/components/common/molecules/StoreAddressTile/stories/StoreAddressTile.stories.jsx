import React from 'react';
import { storiesOf } from '@storybook/react';
import StoreAddressTile from '../views/StoreAddressTile';
import labelsMock from '../__mocks__/labels.mock';
import storeMock from '../__mocks__/store.mock';

const labels = labelsMock.StoreLocator;
const storeMockNotGym = { ...storeMock };
storeMockNotGym.isGym = false;

storiesOf('StoreAddressTile', module)
  .add('Store Details - No Favorite', () => <StoreAddressTile labels={labels} store={storeMock} />)
  .add('Store Details - Show Set Fav', () => (
    <StoreAddressTile labels={labels} store={storeMock} showSetFavorite />
  ))
  .add('Store Details - Favorite', () => (
    <StoreAddressTile isFavorite labels={labels} store={storeMock} />
  ))
  .add('Store Details - Not Gymboree', () => (
    <StoreAddressTile isFavorite labels={labels} store={storeMockNotGym} />
  ))
  .add('Store Listing -  No Favorite', () => (
    <StoreAddressTile variation="listing" labels={labels} store={storeMock} />
  ))
  .add('Store Listing -  No Favorite Index', () => (
    <StoreAddressTile storeIndex={1} variation="listing" labels={labels} store={storeMock} />
  ))
  .add('Store Listing -  Favorite', () => (
    <StoreAddressTile variation="listing" isFavorite labels={labels} store={storeMock} />
  ))
  .add('Store Listing -  Header', () => (
    <StoreAddressTile variation="listing-header" isFavorite labels={labels} store={storeMock} />
  ))
  .add('Store Listing -  Not Gymboree', () => (
    <StoreAddressTile variation="listing" isFavorite labels={labels} store={storeMockNotGym} />
  ));
