import React from 'react';
import { shallow } from 'enzyme';
import StoreHours from '../views/StoreHours';

describe('StoreHours component', () => {
  it('StoreHours component renders correctly without props', () => {
    const component = shallow(<StoreHours />);
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
      ],
      title: 'Store Hours',
    };
    const component = shallow(<StoreHours {...props} />);
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
    };
    const component = shallow(<StoreHours {...props} />);
    expect(component).toMatchSnapshot();
  });
});
