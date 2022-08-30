import { getOrderHistory, getTranslatedDate, getOrderStatus } from '../ordersList';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('getOrderHistory abstractor', () => {
  it('should return response on success', () => {
    const response = {
      body: {
        domOrderBeans: [],
      },
    };
    executeStatefulAPICall.mockResolvedValue(response);
    getOrderHistory().then(res => expect(res).toBe(response));
  });

  it('#getTranslatedDate should return correct date string', () => {
    const phone = getTranslatedDate('September 27, 2019');
    expect(phone).toBe('Sep 27, 2019');
  });

  it('#getOrderStatus should return modified status if status is mapped in mapper', () => {
    const phone = getOrderStatus('Order In Process');
    expect(phone).toBe('lbl_orders_statusOrderReceived');
  });

  it('#getOrderStatus should return status without modification if status is not mapped in mapper', () => {
    const statusStr = 'No status';
    const phone = getOrderStatus(statusStr);
    expect(phone).toBe(statusStr);
  });

  it('#getOrderStatus should return status without modification if status is USBOSS', () => {
    const statusStr = 'USBOSS';
    const phone = getOrderStatus(statusStr);
    expect(phone).toBe(statusStr);
  });
});
