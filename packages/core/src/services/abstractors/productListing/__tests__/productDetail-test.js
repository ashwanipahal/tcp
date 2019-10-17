import { fromJS } from 'immutable';
import getProductInfoById from '../productDetail';
import { formattedPdpRes } from './formattedData';

jest.mock('../../../handler/handler');

const breadCrumb = {
  categoryId: 'home',
  displayName: 'home',
  urlPathSuffix: '/home',
};

const state = {
  ProductListing: fromJS({}),
  Navigation: {
    navigationData: {},
  },
};

state.ProductListing.breadCrumbTrail = breadCrumb;

describe('product Detail', () => {
  it('should get the PDP', () => {
    return getProductInfoById('2043572', state).then(res => {
      expect(res).toEqual(formattedPdpRes);
    });
  });
});
