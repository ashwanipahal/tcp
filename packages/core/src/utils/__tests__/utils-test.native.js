import { PixelRatio } from 'react-native';

import { getPixelRatio } from '../utils.app';

PixelRatio.get = jest.fn();

describe('Utils.native ', () => {
  describe('getPixelRatio', () => {
    it('should return correct device in mdpi', () => {
      PixelRatio.get.mockReturnValue(1);
      expect(getPixelRatio()).toBe('mdpi');
    });

    it('should return correct device in hdpi', () => {
      PixelRatio.get.mockReturnValue(1.5);
      expect(getPixelRatio()).toBe('hdpi');
    });

    it('should return correct device in xhdpi', () => {
      PixelRatio.get.mockReturnValue(2);
      expect(getPixelRatio()).toBe('xhdpi');
    });

    it('should return correct device in xxhdpi', () => {
      PixelRatio.get.mockReturnValue(3);
      expect(getPixelRatio()).toBe('xxhdpi');
    });

    it('should return correct device in xxxhdpi', () => {
      PixelRatio.get.mockReturnValue(3.6);
      expect(getPixelRatio()).toBe('xxxhdpi');
    });
  });
});
