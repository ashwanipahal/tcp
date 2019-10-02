import handler from '../../../handler/handler';
import { getChildren, deleteChild, addChildBirthday } from '../UpdateProfileInfo';

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

describe('addChild abstractor', () => {
  it('should return success response', () => {
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
        firstName: 'fdsaf',
        lastName: 'fsdf',
      },
    };
    // eslint-disable-next-line import/no-named-as-default-member
    handler.executeStatefulAPICall.mockResolvedValue(response);
    addChildBirthday({
      firstName: 'fdsaf',
      lastName: 'fsdf',
      timestamp: '2019-09-18T03:00:52.407Z',
      childDetails: [{ childName: 'fdsf', birthYear: '2019', birthMonth: '1', gender: '01' }],
    }).then(res => {
      expect(res).toBe(response.body);
    });
  });
});
