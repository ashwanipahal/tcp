import { put, takeLatest } from 'redux-saga/effects';
import HomePageSaga, { fetchTaxonomy, fetchEspot } from '../container/HomePage.saga';
import { HOMEPAGE_CONSTANTS } from '../HomePage.constants';

describe('HomePageSaga', () => {
  describe('fetchTaxonomy', () => {
    it('should return correct takeLatest effect for fetchTaxonomy', () => {
      const generator = HomePageSaga();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(HOMEPAGE_CONSTANTS.FETCH_HEADER_LINKS, fetchTaxonomy);
      expect(takeLatestDescriptor).toEqual(expected);
    });
  });
  describe('fetchEspot', () => {
    it('should return correct takeLatest effect for fetchEspot', () => {
      const generator = HomePageSaga();
      generator.next();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(HOMEPAGE_CONSTANTS.FETCH_ESPOT, fetchEspot);
      expect(takeLatestDescriptor).toEqual(expected);
    });
  });
});
