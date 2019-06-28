import { call, put, takeLatest } from 'redux-saga/effects';
import {
  updateDefaultShippingAddress,
  SetDefaultShippingAddressSaga,
} from '../DefaultShippingAddress.saga';
import endpoints from '../../../../../../service/endpoint';
import {
  setDefaultShippingAddressSuccess,
  setDefaultShippingAddressFailure,
} from '../DefaultShippingAddress.actions';
import fetchData from '../../../../../../service/API';
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
  });

  it('should update default shipping address', () => {
    const res = {
      body: {
        addressId: '75066941',
        nickName: 'sb_2019-06-24 02:23:29.134',
      },
    };

    const { relURI, method } = endpoints.setDefaultShippingAddress;
    const baseURI = endpoints.setDefaultShippingAddress.baseURI || endpoints.global.baseURI;

    const langId = -1;
    const catalogId = 10551;
    const storeId = 10151;
    const nickName = 'foo';

    expect(gen.next().value).toEqual(
      call(fetchData, baseURI, relURI, { payload, langId, catalogId, storeId, nickName }, method)
    );
    expect(gen.next(res).value).toEqual(put(setDefaultShippingAddressSuccess(res.body)));
    expect(gen.next().done).toBeTruthy();
  });

  it('should fail default shipping address', () => {
    const err = {
      statusCode: 400,
      message: 'Object not found',
    };
    gen.next();
    expect(gen.throw(err).value).toEqual(put(setDefaultShippingAddressFailure(err)));
    expect(gen.next().done).toBeTruthy();
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
