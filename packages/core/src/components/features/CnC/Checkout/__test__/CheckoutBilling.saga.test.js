import { call } from 'redux-saga/effects';
import CheckoutReview, { submitOrderProcessing } from '../container/CheckoutReview.saga';

describe('CheckoutReview saga', () => {
  it('should dispatch CheckoutReview', () => {
    const CheckoutReviewSaga = CheckoutReview();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();
    CheckoutReviewSaga.next();

    expect(CheckoutReviewSaga.next().value).toEqual(
      call(submitOrderProcessing, undefined, undefined, undefined)
    );
  });
});
