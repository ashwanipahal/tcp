import React from 'react';
import { shallow } from 'enzyme';
import { SelectBoxVanilla } from '../views/Select';

describe('Selectbox component', () => {
  it('renders correctly', () => {
    const props = {
      name: '',
      placeholder: 'placeholder',
      Value: 'hi',
      type: 'text',
      id: 'abcd',
      className: 'asdfasdf',
      options: [
        {
          id: '',
          displayName: '',
        },
        { id: 'CA', displayName: 'Canada' },
      ],
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
  it('renders correctly with touched and error', () => {
    const props = {
      type: 'text',
      id: 'abcd',
      className: 'asdfasdf',
      options: [
        {
          id: '',
          displayName: '',
        },
      ],
      meta: {
        touched: true,
        error: 'this is an error',
        warning: '',
      },
      input: {},
      defaultValue: 'United States',
    };
    const component = shallow(<SelectBoxVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly with touched and warning', () => {
    const props = {
      type: 'text',
      id: 'abcd',
      className: 'asdfasdf',
      options: [
        {
          id: '',
          displayName: '',
        },
        { id: 'CA', displayName: 'Canada' },
      ],
      meta: {
        touched: true,
        error: null,
        warning: 'this is a warning',
      },
      input: {},
      defaultValue: 'United States',
    };
    const component = shallow(<SelectBoxVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
