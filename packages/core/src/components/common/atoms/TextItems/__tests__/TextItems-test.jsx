import React from 'react';
import { shallow } from 'enzyme';
import TextItems from '../TextItems';

describe('TextItems component', () => {
  it('renders correctly', () => {
    const props = {
      textItems: [
        {
          style: 'test',
          text: 'test',
        },
        {
          style: 'test1',
          text: 'test2',
        },
      ],
    };
    const component = shallow(<TextItems {...props} />);
    expect(component).toMatchSnapshot();
  });
});
