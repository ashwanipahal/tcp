import { Map } from 'immutable';
import {
  getBillingLabels,
  getCVVCodeInfoContentId,
  getCVVCodeRichTextSelector,
} from '../container/BillingPage.selectors';

describe('Credit Card selectors', () => {
  const cid = '66b73859-0893-4abe-9d0d-dc3d58fa2782';
  it('#getLabels should return Labels', () => {
    const state = {
      Labels: {
        checkout: { billing: {} },
      },
    };
    expect(getBillingLabels(state)).toMatchObject({});
  });

  it('#getCVVCodeInfoContentId should return content ID', () => {
    const state = {
      Labels: {
        checkout: {
          billing: {
            referred: [
              {
                name: 'cvv_info',
                contentId: cid,
              },
            ],
          },
        },
      },
    };
    expect(getCVVCodeInfoContentId(state)).toEqual(cid);
  });

  it('#getCVVCodeRichTextSelector should return content ID', () => {
    const state = {
      Labels: {
        checkout: {
          billing: {
            referred: [
              {
                name: 'cvv_info',
                contentId: cid,
              },
            ],
          },
        },
      },
      CartPageReducer: Map({
        moduleXContent: [{ name: cid, richText: '<p>Hello</p>' }],
      }),
    };
    expect(getCVVCodeRichTextSelector(state)).toEqual('<p>Hello</p>');
  });
});
