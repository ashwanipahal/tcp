import { fromJS } from 'immutable';
import { GET_CANDID_REDUCER_KEY } from '../../../../../constants/reducer.constants';
import { getCandidData } from '../container/GetCandid.selectors';

describe('#GetCandid Selector', () => {
  const stateObject = {
    candidData: {
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
    },
    Labels: {
      modules: {
        getCandid: {
          title: 'title',
          titleDescription: 'titleDescription',
          btnSeeMore: 'btnSeeMore',
        },
      },
    },
  };
  const state = {
    [GET_CANDID_REDUCER_KEY]: fromJS(stateObject),
  };

  it('#getCandidData should return candidData', () => {
    expect(getCandidData(state)).toEqual(fromJS(stateObject.candidData));
  });
});
