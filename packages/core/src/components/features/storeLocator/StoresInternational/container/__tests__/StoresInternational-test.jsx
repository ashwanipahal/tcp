import React from 'react';
import { shallow, mount } from 'enzyme';
import Theme from '@tcp/core/styles/themes';
import { ThemeProvider } from 'styled-components';
import StoresInternational from '../views/StoresInternational';

describe('StoresInternational component', () => {
  it('StoresInternational component renders correctly without props', () => {
    const component = shallow(<StoresInternational />);
    expect(component).toMatchSnapshot();
  });

  it('StoresInternational component renders correctly with props', () => {
    const props = {
      className: 'test',
      content: 'test',
      dataLocator: 'test',
    };
    const component = mount(
      <ThemeProvider theme={Theme()}>
        <StoresInternational {...props} />
      </ThemeProvider>
    );
    expect(component.html()).toMatchSnapshot();
  });
});
