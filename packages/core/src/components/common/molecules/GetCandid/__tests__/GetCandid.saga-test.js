import { put, takeLatest } from 'redux-saga/effects';
import GetCandidSaga, { fetchCandidData } from '../container/GetCandid.saga';
import { validateReduxCache } from '../../../../../utils/cache.util';
import CONSTANTS from '../container/GetCandid.constants';

import { setCandidData } from '../container/GetCandid.actions';

describe('Get Candid Saga', () => {
  describe('fetchCandidData', () => {
    let candidData;
    const payload = {
      CANDID_API_KEY: '070167ca-8287-4d41-a9bb-6b3850cae9b1',
      CANDID_API_URL: 'api.getcandid.com',
    };
    beforeEach(() => {
      candidData = fetchCandidData(payload);
      candidData.next();
    });

    it('should dispatch setCandidData action after success response', () => {
      const result = {
        Views: [
          {
            Media: {
              Images: {
                StandardResolution: {
                  Url:
                    'https://api.getcandid.com/image/s/candid.azureedge.net%2fstream-media%2f_17900969359357824_standard.jpg',
                },
              },
            },
          },
          {
            Media: {
              Images: {
                StandardResolution: {
                  Url:
                    'https://api.getcandid.com/image/s/candid.azureedge.net%2fstream-media%2f_17881783609395879_standard.jpg',
                },
              },
            },
          },
        ],
        Settings: {
          DisplaySettings: {
            PromotedHashtag: '#mystylePLACE',
            DisableContributorLinks: false,
            CloseOnBack: false,
            UseSslOrigin: false,
            ShowShareButtons: false,
            ShowPrice: true,
            ContentDistributionZones: [],
            DisableLoadTracking: false,
            EnableDynamicImages: true,
            EnableEmailCapture: false,
            EnableInstagramHandleCapture: false,
            ForceHttpForInstagramMedia: false,
            PageCacheMinutes: 0,
            ImageCacheMinutes: 0,
            GalleryCacheMinutes: 0,
            MinScaleWidth: 300,
          },
        },
        Tags: [
          {
            Id: '070167ca-8287-4d41-a9bb-6b3850cae9b100889705456486',
            TagId: '00889705456486',
            GroupId: '1124756_NJ',
            StreamId: '6b3850cae9b100889705456486',
            ImageUrl:
              'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/1124756_NJ.jpg',
          },
          {
            Id: '070167ca-8287-4d41-a9bb-6b3850cae_00889705210125',
            TagId: '00889705210125',
            GroupId: '2000049_01',
            StreamId: '6b3850cae_00889705210125',
            ImageUrl:
              'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2000049_01.jpg',
          },
        ],
      };
      const putDescriptor = candidData.next(result).value;
      expect(putDescriptor).toEqual(put(setCandidData(result)));
    });

    it('should not dispatch setCandidData action for error', () => {
      const error = new Error();
      const putDescriptor = candidData.throw(error).value;
      expect(putDescriptor).toBeNull();
    });
  });

  describe('GetCandidSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = GetCandidSaga();
      const cachedMethod = validateReduxCache(fetchCandidData);
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(CONSTANTS.FETCH_DATA, cachedMethod);
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});
