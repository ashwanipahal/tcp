import React from 'react';
import { storiesOf } from '@storybook/react';
import labelsMock from '@tcp/core/src/components/common/molecules/StoreLocations/__mocks__/labels.mock';
import storeMock from '@tcp/core/src/components/common/molecules/StoreLocations/__mocks__/stores.mock';
import StoresCountryTile from '../views/StoresCountryTile';

const stores = [...storeMock, ...storeMock];

const testCountries = [
  {
    title: 'India',
    stores,
    labels: labelsMock.StoreLocator,
  },
  {
    title: 'US/Canada',
    stores,
    labels: labelsMock.StoreLocator,
  },
];

class ContainerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openItem: -1,
      countries: [...testCountries],
    };
  }

  isDefaultOpen(index) {
    return this.state.openItem === index;
  }

  render() {
    return (
      <>
        {this.state.countries.map((country, i) => (
          <StoresCountryTile
            {...country}
            key={i}
            isDefaultOpen={this.isDefaultOpen(i)}
            onToggleCallback={({ isExpanded }) => {
              if (isExpanded) {
                this.setState({
                  openItem: i,
                });
              } else {
                this.setState({
                  openItem: -1,
                });
              }
            }}
          />
        ))}
      </>
    );
  }
}

storiesOf('StoresCountryTile', module)
  .add('Basic', () => (
    <StoresCountryTile
      title="India"
      labels={labelsMock.StoreLocator}
      stores={stores}
      titleClickCb={item => {
        console.log(item);
      }}
    />
  ))
  .add('Single Open', () => <ContainerComponent />);
