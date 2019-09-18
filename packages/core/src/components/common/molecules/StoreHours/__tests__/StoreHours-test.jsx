import React from 'react';
import { shallow, mount } from 'enzyme';
import theme from '@tcp/core/styles/themes/TCP';
import StoreHours from '../views/StoreHours';

describe('StoreHours component', () => {
  it('StoreHours component renders correctly without props', () => {
    const props = {
      theme,
    };
    const component = shallow(<StoreHours {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render component with timing data', () => {
    const props = {
      defaultOpen: true,
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
    const component = mount(<StoreHours {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render component with timing data', () => {
    const props = {
      defaultOpen: true,
      storeMeta: [
        {
          id: 1,
          label: 'Test',
          value: 'Test',
        },
      ],
      storeTiming: [
        {
          id: 1,
          label: 'Test',
          value: 'Test',
        },
      ],
      title: 'Store Hours',
      theme,
    };
    const component = mount(<StoreHours {...props} />);
    expect(component).toMatchSnapshot();
  });
});
