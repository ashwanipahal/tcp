import React from 'react';
import { shallow } from 'enzyme';
import { GiftCardSkeletonVanilla } from '../../skeleton/GiftCardSkeleton.view';

describe('GiftCard Skeleton', () => {
  it('GiftCard Skeleton  should render properly', () => {
    const props = {
      className: 'sample-className',
    };
    const component = shallow(<GiftCardSkeletonVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
