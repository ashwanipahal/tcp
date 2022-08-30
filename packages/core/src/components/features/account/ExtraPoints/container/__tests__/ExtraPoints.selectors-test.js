import { getExtraPointsTilesContentId } from '../ExtraPoints.selectors';

describe('#ExtraPoints Selectors', () => {
  it('#getExtraPointsTilesContentId should return content ID', () => {
    const state = {
      Labels: {
        account: {
          earnExtraPoints: {
            referred: [
              {
                contentId: '66b73859-0893-4abe-9d0d-dc3d58fa2782',
              },
            ],
          },
        },
      },
    };
    expect(getExtraPointsTilesContentId(state)).toEqual('66b73859-0893-4abe-9d0d-dc3d58fa2782');
  });
});
