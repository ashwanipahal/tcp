import { fromJS } from 'immutable';
import { STORES_INTL_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { getContent, getModuleXContentId } from '../StoresInternational.selectors';

describe('StoresInternational selectors', () => {
  const testState = {
    [STORES_INTL_REDUCER_KEY]: fromJS({
      moduleXContent: 'test',
    }),
    Labels: {
      StoreLocator: {
        StoreList: {
          referred: [
            {
              name: 'StoreInternationalHtml',
              contentId: 'testId',
            },
          ],
        },
      },
    },
  };
  describe('getContent', () => {
    it('should get modulex content from state', () => {
      expect(getContent(testState)).toEqual('test');
    });
  });
  describe('getModuleXContentId', () => {
    it('should get referred content from labels for StoreList', () => {
      expect(getModuleXContentId(testState)).toEqual('testId');
    });
    it('should return false for empty StoreLocator data', () => {
      expect(
        getModuleXContentId({
          Labels: {},
        })
      ).not.toBeTruthy();
    });
    it('should return false for empty StoreList data', () => {
      expect(
        getModuleXContentId({
          Labels: {
            StoreLocator: {
              StoreList: {},
            },
          },
        })
      ).not.toBeTruthy();
    });
  });
});
