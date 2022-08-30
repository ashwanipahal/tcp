import React from 'react';
import { shallow } from 'enzyme';
import { ProductReviewsVanilla } from '../views/ProductReviews.view.native';

describe('ProductReviews component as guest', () => {
  let component;
  const props = {
    ratingsProductId: '2323',
    isGuest: true,
    expanded: true,
    userId: '',
    mprId: '',
    reviewsCount: 231,
    ratingsAndReviewsLabel: {
      lbl_ratings_and_reviews: 'RATINGS & REVIEWS',
      lbl_login_modal_title: 'Login',
      lbl_rating_form_title: 'Write A Review',
    },
    getSecurityToken: () => {},
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
    ratingsProductId: '42323',
    isGuest: false,
    expanded: true,
    userId: 'sdsd',
    mprId: '312321',
    reviewsCount: 231,
    ratingsAndReviewsLabel: {
      lbl_ratings_and_reviews: 'RATINGS & REVIEWS',
      lbl_login_modal_title: 'Login',
      lbl_rating_form_title: 'Write A Review',
    },
    getSecurityToken: () => {},
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
