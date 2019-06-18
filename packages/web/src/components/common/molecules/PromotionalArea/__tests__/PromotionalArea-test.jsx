import React from 'react';
import { shallow } from 'enzyme';
import PromotionalArea from '../view';
import mockData from '../mock';

describe('PromotionalArea component', () => {
  it('renders correctly', () => {
    const props = {
      data: mockData.promo_message_wrapper,
    };
    const component = shallow(<PromotionalArea {...props} />);
    expect(component).toMatchSnapshot();
  });
});
