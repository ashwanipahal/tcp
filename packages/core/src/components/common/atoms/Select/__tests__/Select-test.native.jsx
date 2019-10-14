import React from 'react';
import { shallow } from 'enzyme';
import SelectBox from '../views/Select.native';

describe('Selectbox component', () => {
  const countryUS = 'United States';
  const displayValue = [
    {
      id: 'US',
      displayName: countryUS,
    },
    { id: 'CA', displayName: 'Canada' },
  ];

  it('renders correctly', () => {
    const props = {
      name: 'test',
      id: 'test',
      heading: 'test',
      input: {
        value: 'test',
        onChange: () => {},
      },
      options: displayValue,
    };
    const component = shallow(<SelectBox {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly for error', () => {
    const props = {
      name: 'test',
      id: 'test',
      heading: 'test',
      input: {
        value: 'test',
        onChange: () => {},
      },
      options: displayValue,
      meta: {
        touched: true,
        error: 'error message',
      },
    };
    const component = shallow(<SelectBox {...props} />);
    expect(component).toMatchSnapshot();
  });
});
