import { getBillingLabels, getCVVCodeInfoContentId } from '../container/BillingPage.selectors';

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
});
