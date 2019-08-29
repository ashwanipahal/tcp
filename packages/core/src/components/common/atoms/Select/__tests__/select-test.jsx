import React from 'react';
import { shallow } from 'enzyme';
import { SelectBoxVanilla } from '../views/Select';

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
      name: '',
      placeholder: 'placeholder',
      Value: 'hi',
      type: 'text',
      id: 'abcd',
      className: 'asdfasdf',
      options: displayValue,
      meta: {
        touched: '',
        error: '',
        warning: '',
      },
      input: {
        value: 'hello',
      },
    };
    const component = shallow(<SelectBoxVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly with disabled props', () => {
    const props = {
      name: '',
      placeholder: 'placeholder',
      Value: 'hi',
      type: 'text',
      id: 'abcd',
      className: 'asdfasdf',
      options: displayValue,
      meta: {
        touched: '',
        error: '',
        warning: '',
      },
      input: {
        value: 'hello',
      },
      disabled: true,
    };
    const component = shallow(<SelectBoxVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly with touched and error', () => {
    const valueInfo = 'some string @@LABEL@@';
    const props = {
      id: 'abcd',
      className: 'asdfasdf',
      options: displayValue,
      value: valueInfo,
      meta: {
        touched: true,
        error: 'REQUIRED_FIELD',
        warning: '',
      },
      input: {},
      defaultValue: countryUS,
      placeholder: 'first name for user',
    };
    const component = shallow(<SelectBoxVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly with touched and warning', () => {
    const props = {
      type: 'text',
      id: 'abcd',
      className: 'asdfasdf',
      options: displayValue,
      meta: {
        touched: true,
        error: null,
        warning: 'this is a warning',
      },
      input: {},
      defaultValue: countryUS,
    };
    const component = shallow(<SelectBoxVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
