import {
  parseBoolean,
  getDateInformation,
  getCartProductAttributes,
  attributeListMaker,
  extractAttributeValue,
  checkMatchingFamily,
  extractPrioritizedBadge,
} from '../badge.util';

describe('badge util test', () => {
  describe('#mapDispatchToProps', () => {
    const LABELS = 'itemTCPProductIndUSStore:1;itemTCPGlowInDarkUSStore:d';
    it('should return true', () => {
      expect(parseBoolean('1')).toEqual(true);
    });
    it('should return date object with caps', () => {
      const dateObj = {
        date: 12,
        day: 'THU',
        month: 'DEC',
      };
      expect(getDateInformation(new Date('12/12/2019'), true)).toEqual(dateObj);
    });
    it('should return date object in lower case', () => {
      const dateObj = {
        date: 12,
        day: 'Thu',
        month: 'Dec',
      };
      expect(getDateInformation(new Date('12/12/2019'), false)).toEqual(dateObj);
    });

    it('should return product attributes', () => {
      const attributes = {
        clearance: 'itemTCPProductIndUSStore',
        glowInTheDark: 'itemTCPGlowInDarkUSStore',
        limitedQuantity: 'inventoryMessageUSStore',
        onlineOnly: 'webOnlyFlagUSStore',
      };
      expect(getCartProductAttributes()).toEqual(attributes);
    });

    it('should return product attributes', () => {
      const attributes = LABELS;
      const expectedOutput = [
        { identifier: 'itemTCPProductIndUSStore', value: '1' },
        { identifier: 'itemTCPGlowInDarkUSStore', value: 'd' },
      ];
      expect(attributeListMaker(attributes)).toEqual(expectedOutput);
    });

    it('should return true in extractAttributeValue', () => {
      const item = {
        list_of_attributes: LABELS,
      };
      const attributes = 'itemTCPProductIndUSStore';
      // const expectedOutput = [{"identifier": "itemTCPProductIndUSStore", "value": "1"}, {"identifier": "itemTCPGlowInDarkUSStore", "value": "d"}]
      expect(extractAttributeValue(item, attributes)).toEqual('1');
    });

    it('should return true in checkMatchingFamily', () => {
      const siteAttributes = {
        matchingFamily: 'itemTCPProductIndUSStore',
      };
      const excludeBadge = 'itemTCPGlowInDarkUSStore';
      expect(checkMatchingFamily('online exclusive', excludeBadge, siteAttributes)).toEqual(
        'online exclusive'
      );
    });

    it('should return true in checkMatchingFamily', () => {
      const product = {
        list_of_attributes: LABELS,
      };

      const siteAttributes = {
        onlineOnly: 'webOnlyFlagUSStore',
        clearance: 'itemTCPProductIndUSStore',
        glowInTheDark: 'itemTCPGlowInDarkUSStore',
        limitedQuantity: 'inventoryMessageUSStore',
      };
      expect(extractPrioritizedBadge(product, siteAttributes)).toEqual({
        defaultBadge: '',
        matchBadge: false,
      });
    });
  });
});
