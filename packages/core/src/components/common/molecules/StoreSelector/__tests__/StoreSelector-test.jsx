import React from 'react';
import { mount } from 'enzyme';
import Theme from '@tcp/core/styles/themes';
import { ThemeProvider } from 'styled-components';
import StoreSelector from '../views/StoreSelector';
import optionsMock from '../__mocks__/options.mock';

describe('StoreSelector component', () => {
  it('should render correctly', () => {
    const component = mount(
      <ThemeProvider theme={Theme()}>
        <StoreSelector options={optionsMock} defaultSelectText="Test Text" titleText="Test Title" />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });
  it('should default set title as value for selected item', () => {
    const component = mount(
      <ThemeProvider theme={Theme()}>
        <StoreSelector
          options={optionsMock}
          defaultSelectText="Test Text"
          titleText="Test Title"
          selectedLocation="Canada"
        />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });
});
