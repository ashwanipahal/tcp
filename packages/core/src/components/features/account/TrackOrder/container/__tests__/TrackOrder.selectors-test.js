import { fromJS } from 'immutable';
import {
  getLabels,
  getEmailId,
  getErrorMessage,
  getOrderDetail,
  getOrderId,
  getTrackOrderMountedState,
  getShowNotificationState,
} from '../TrackOrder.selectors';

describe('#Track Order Selectors', () => {
  it('#getLabels should return Labels', () => {
    const state = {
      Labels: {
        global: {},
      },
    };
    expect(getLabels(state)).toMatchObject({});
  });
  it('#getErrorMessage should return Error message', () => {
    const data = fromJS({
      showNotificationOnModal: 'Test Message',
    });
    const state = {
      TrackOrderReducer: data,
    };
    expect(getErrorMessage(state)).toEqual('Test Message');
  });

  it('#getTrackOrderMountedState should set mount state', () => {
    const data = fromJS({
      trackOrderMountedState: true,
    });
    const state = {
      TrackOrderReducer: data,
    };
    expect(getTrackOrderMountedState(state)).toBeTruthy();
  });
  it('#getEmailId should return email id', () => {
    const state = {
      form: {
        TrackOrderForm: {
          values: {
            emailAddress: 'satyavan.dash@gmail.com',
          },
        },
      },
    };
    expect(getEmailId(state)).toEqual(state.form.TrackOrderForm.values.emailAddress);
  });
  it('#getOrderId should return order id', () => {
    const state = {
      form: {
        TrackOrderForm: {
          values: {
            orderNumber: 'Test',
          },
        },
      },
    };
    expect(getOrderId(state)).toEqual(state.form.TrackOrderForm.values.orderNumber);
  });
  it('#getOrderDetail should return order detail', () => {
    const state = {
      TrackOrderReducer: fromJS({
        trackOrderInfo: {},
      }),
    };
    expect(getOrderDetail(state)).toMatchObject({});
  });
  it('#getShowNotificationState should return notification state as error', () => {
    const state = {
      TrackOrderReducer: fromJS({
        trackOrderInfo: {
          success: false,
        },
      }),
    };
    expect(getShowNotificationState(state)).toEqual('error');
  });
});
