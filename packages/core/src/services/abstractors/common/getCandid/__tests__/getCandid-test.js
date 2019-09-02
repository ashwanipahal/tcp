import GetCandidAbstractor from '../getCandid';
import * as handler from '../../../../handler/handler';

jest.mock('../../../../../service/API');
jest.mock('../../../../handler/handler');

handler.executeExternalAPICall = jest.fn();
handler.executeExternalAPICall.mockImplementation(() => {
  return Promise.resolve({
    body: {
      Views: [
        {
          Media: {
            Images: {
              Thumbnail: {
                Width: 0,
                Height: 0,
                Url:
                  'https://api.getcandid.com/image/s/candid.azureedge.net%2fstream-media%2f070167ca-8287-4d41-a9bb-6b3850cae9b1_17900969359357824_thumbnail.jpg',
              },
            },
            Likes: 4,
            Comments: 2,
            Retweets: 0,
            ShadowType: 2,
            ViewCount: 468,
            LikesDisplay: '4',
          },
        },
        {
          Media: {
            Images: {
              Thumbnail: {
                Width: 0,
                Height: 0,
                Url:
                  'https://api.getcandid.com/image/s/candid.azureedge.net%2fstream-media%2f070167ca-8287-4d41-a9bb-6b3850cae9b1_17882020951396721_thumbnail.jpg',
              },
            },
            Likes: 41,
            Comments: 2,
            Retweets: 0,
            ShadowType: 2,
            ViewCount: 884,
            LikesDisplay: '41',
          },
        },
      ],
    },
  });
});

describe('GetCandidAbstractor', () => {
  test('Fetch candid data', () => {
    const payload = {
      CANDID_API_KEY: 'e50ab0a9-ac0b-436b-9932-2a74b9486436',
      CANDID_API_URL: 'api.getcandid.com',
    };
    return GetCandidAbstractor.getData(payload).then(data => {
      expect(data.Views.length).toBeGreaterThan(1);
    });
  });
});
