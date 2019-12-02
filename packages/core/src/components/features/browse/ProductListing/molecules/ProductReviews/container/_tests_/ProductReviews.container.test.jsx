import React from 'react';
import { shallow } from 'enzyme';
import ProductReviewsContainer from '../ProductReviews.container';

describe('ProductReviewsContainer View Component', () => {
  let component;
  const Props = {
    userId: '123123',
    isGuest: false,
    mprId: '323232',
    bazaarvoiceApiUrl: 'stg.bv.com',
    ratingsAndReviewsLabel: 'Rating & Review',
  };

  it('ProductReviewsContainer should render correctly', () => {
    component = shallow(<ProductReviewsContainer {...Props} />);
    expect(component).toMatchSnapshot();
  });
});
