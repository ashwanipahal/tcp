import React from 'react';
import { shallow } from 'enzyme';
import { GiftWrappingDisplayanilla } from '../views/GiftWrappingDisplay';

describe('GiftWrappingDisplay component', () => {
  it('should renders correctly props not present', () => {
    const props = { labels: {}, displayName: '', className: '' };
    const component = shallow(<GiftWrappingDisplayanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly props are present', () => {
    const props = {
      labels: {
        lbl_review_sectionShippingGiftServiceTitle: 'title',
      },
      displayName: 'Free',
      className: '',
    };
    const component = shallow(<GiftWrappingDisplayanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
