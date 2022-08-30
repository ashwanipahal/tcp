import React from 'react';
import { shallow } from 'enzyme';
import { ProductReviewsVanilla } from '../views/ProductReviews.view';

describe('ProductReviews component as guest', () => {
  let component;
  const props = {
    isClient: true,
    userId: '',
    mprId: '',
    expanded: true,
    className: '',
    reviewsCount: 32,
    bazaarvoiceApiUrl: '',
    ratingsProductId: '234234',
    isGuest: true,
    ratingsAndReviewsLabel: {
      lbl_ratings_and_reviews: 'RATINGS & REVIEWS',
      lbl_login_modal_title: 'Login',
      lbl_rating_form_title: 'Write A Review',
    },
    getSecurityToken: () => {},
    onLoginClick: () => {},
  };
  beforeEach(() => {
    component = shallow(<ProductReviewsVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('ProductReviews component as logged in user', () => {
  let component;
  const props = {
    isClient: true,
    userId: '243434',
    mprId: '234234',
    expanded: true,
    className: '',
    reviewsCount: 32,
    bazaarvoiceApiUrl: '',
    ratingsProductId: '34545',
    isGuest: true,
    ratingsAndReviewsLabel: {
      lbl_ratings_and_reviews: 'RATINGS & REVIEWS',
      lbl_login_modal_title: 'Login',
      lbl_rating_form_title: 'Write A Review',
    },
    getSecurityToken: () => {},
    onLoginClick: () => {},
  };
  beforeEach(() => {
    component = shallow(<ProductReviewsVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
