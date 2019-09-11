import handler from '../../../handler/handler';
import { getChildren, deleteChild } from '../UpdateProfileInfo';

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
            childName: 'test',
            childBirthdayYear: '2010',
            childBirthdayMonth: 10,
            childGender: '01',
          },
        ],
      },
    };
    // eslint-disable-next-line import/no-named-as-default-member
    handler.executeStatefulAPICall.mockResolvedValue(response);
    getChildren().then(res => {
      expect(res[0].childId).toBe('12345');
    });
  });
});

describe('deleteChild abstractor', () => {
  it('should return response on success', () => {
    const response = {
      body: {
        childBirthdayInfo: [
          {
            childId: '12345',
            childName: 'test',
            childBirthdayYear: '2010',
            childBirthdayMonth: 10,
            childGender: '01',
          },
        ],
      },
    };
    // eslint-disable-next-line import/no-named-as-default-member
    handler.executeStatefulAPICall.mockResolvedValue(response);
    deleteChild({
      childId: '1234',
      childName: 'test',
      birthMonth: '10',
      birthYear: '2010',
      gender: '01',
    }).then(res => {
      expect(res).toBe(response.body);
    });
  });
});
