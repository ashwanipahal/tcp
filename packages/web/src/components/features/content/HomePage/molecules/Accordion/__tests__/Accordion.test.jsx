import React from 'react';
import { shallow } from 'enzyme';
import Accordion from '../Accordion';

describe('Accordion component', () => {
  it('renders correctly', () => {
    const props = {
      options: {},
    };
    const component = shallow(<Accordion {...props} />);
    expect(component).toMatchSnapshot();
  });
});
