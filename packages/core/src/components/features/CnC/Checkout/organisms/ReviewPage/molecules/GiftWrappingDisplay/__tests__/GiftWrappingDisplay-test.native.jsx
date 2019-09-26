import React from 'react';
import { shallow } from 'enzyme';
import { GiftWrappingDisplayanilla } from '../views/GiftWrappingDisplay';

describe('GiftWrappingDisplay component', () => {
  it('should renders correctly props not present', () => {
    const props = { labels: {}, displayName: '' };
    const component = shallow(<GiftWrappingDisplayanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly props are present', () => {
    const props = {
      labels: {
        lbl_review_sectionShippingGiftServiceTitle: 'Gift Services',
      },
      displayName: 'Free',
    };
    const component = shallow(<GiftWrappingDisplayanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
