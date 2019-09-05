import handler from '../../../handler/handler';
import { getChildren } from '../UpdateProfileInfo';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('getChildren abstractor', () => {
  it('should return response on success', () => {
    const response = {
      body: {
        childBirthdayInfo: [
          {
            childId: '12345',
          },
        ],
      },
    };
    // eslint-disable-next-line import/no-named-as-default-member
    handler.executeStatefulAPICall.mockResolvedValue(response);
    getChildren().then(res => expect(res).toBe(response));
  });
});
