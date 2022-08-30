import React from 'react';
import { shallow } from 'enzyme';
import SendAnEmailGiftCard from '../views/SendAnEmailGiftCard.view.native';

describe('SendAnEmailGiftCard component', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      pdpLabels: {},
    };
    wrapper = shallow(<SendAnEmailGiftCard {...props} />);
  });

  it('should renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
