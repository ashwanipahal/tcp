import getProductInfoById from '../productDetail';

jest.mock('../../../handler/handler');

const breadCrumb = {
  categoryId: 'home',
  displayName: 'home',
  urlPathSuffix: '/home',
};

const state = {
  ProductListing: {},
  Navigation: {
    navigationData: {},
  },
};

state.ProductListing.breadCrumbTrail = breadCrumb;

describe('product Detail', () => {
  it('should get the PDP', () => {
    return getProductInfoById('2043572', state).then(res => {
      expect(res).toEqual(undefined);
    });
  });
});
