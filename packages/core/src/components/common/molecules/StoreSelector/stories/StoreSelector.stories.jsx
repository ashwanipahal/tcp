import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import StoreSelector from '../views/StoreSelector';
import optionsMock from '../__mocks__/options.mock';

// eslint-disable-next-line react/prop-types
const ContainerComponent = ({ titleText, defaultSelectText, options, selectedLocation }) => {
  const [location, setLocation] = useState(selectedLocation);
  return (
    <StoreSelector
      options={options}
      selectedLocation={location}
      selectionCallback={(_, v) => setLocation(v)}
      defaultSelectText={defaultSelectText}
      titleText={titleText}
    />
  );
};

storiesOf('StoreSelector', module)
  .add('International', () => (
    <ContainerComponent
      options={optionsMock}
      selectionCallback={v => console.log(v)}
      defaultSelectText="Select a Country"
      titleText="International Stores"
    />
  ))
  .add('Selected Location', () => (
    <ContainerComponent
      options={optionsMock}
      defaultSelectText="Select a Country"
      titleText="International Stores"
      selectedLocation="Canada"
    />
  ))
  .add('US/Canada', () => (
    <ContainerComponent
      options={optionsMock}
      selectionCallback={v => console.log(v)}
      defaultSelectText="Select a State"
      titleText="SEARCH FOR STORES BY STATE OR PROVINCE"
    />
  ));
