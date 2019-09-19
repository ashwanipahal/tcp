import React from 'react';
import { shallow } from 'enzyme';
import theme from '@tcp/core/styles/themes/TCP';
import StoreHours from '../views/StoreHours.native';

describe('StoreHours component', () => {
  it('StoreHours component renders correctly without props', () => {
    const props = {
      theme,
      title: '',
    };
    const component = shallow(<StoreHours {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the title text', () => {
    const props = {
      title: 'Store Hours',
      theme,
    };
    const component = shallow(<StoreHours {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the store timings', () => {
    const props = {
      storeTiming: [
        {
          id: 1,
          label: 'Test',
          value: 'Test',
        },
        {
          id: 2,
          label: 'Test',
          value: 'Test',
        },
      ],
      title: 'Store Hours',
      theme,
    };
    const component = shallow(<StoreHours {...props} />);
    expect(component).toMatchSnapshot();
  });
});
