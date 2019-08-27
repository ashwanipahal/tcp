import { put } from 'redux-saga/effects';
import { trackOrder } from '../TrackOrder.saga';
import { setOrderDetailInfo } from '../TrackOrder.actions';

describe('Track Order saga', () => {
  let takeOrderGen;
  const payloadArgs = {
    orderNumber: '3000306507',
    emailAddress: 'GYM20081901@YOPMAIL.COM',
  };
  beforeEach(() => {
    takeOrderGen = trackOrder(payloadArgs);
  });
  it('should return correct takeLatest effect', () => {
    const received = takeOrderGen.next().value;
    expect(takeOrderGen.next(received).value).toEqual(put(setOrderDetailInfo(received)));
  });
});
