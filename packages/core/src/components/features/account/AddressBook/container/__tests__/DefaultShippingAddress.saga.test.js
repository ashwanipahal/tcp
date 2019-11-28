import { put, takeLatest } from 'redux-saga/effects';
import {
  updateDefaultShippingAddress,
  SetDefaultShippingAddressSaga,
} from '../DefaultShippingAddress.saga';
import {
  setDefaultShippingAddressSuccess,
  setDefaultShippingAddressFailure,
} from '../DefaultShippingAddress.actions';
import ADDRESS_BOOK_CONSTANTS from '../../AddressBook.constants';

describe('Default shipping address saga', () => {
  let gen;
  const payload = {
    blahBlah: 'blah blah',
    fooFoo: 'foo foo',
    nickName: 'foo',
  };

  beforeEach(() => {
    gen = updateDefaultShippingAddress({ payload });
    gen.next();
    gen.next();
  });

  it('should update default shipping address', () => {
    const res = {
      body: {
        addressId: '75066941',
        nickName: 'sb_2019-06-24 02:23:29.134',
      },
    };
    gen.next(res);
    const putDescriptor = gen.next().value;
    expect(putDescriptor).toEqual(put(setDefaultShippingAddressSuccess(res.body)));
  });

  it('should fail default shipping address', () => {
    const err = {
      statusCode: 400,
      message: 'Object not found',
    };
    gen.throw(err);
    expect(gen.next().value).toEqual(put(setDefaultShippingAddressFailure(err)));
  });

  it('should test SetDefaultShippingAddressSaga', () => {
    gen = SetDefaultShippingAddressSaga();
    expect(gen.next().value).toEqual(
      takeLatest(
        ADDRESS_BOOK_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
        updateDefaultShippingAddress
      )
    );
    expect(gen.next().done).toBeTruthy();
  });
});
