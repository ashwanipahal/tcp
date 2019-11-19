import {
  TRACK_PAGE_VIEW,
  TRACK_CLICK,
  SET_CLICK_PAYLOAD,
  RESET_CLICK_PAYLOAD,
  UPDATE_PAGE_DATA,
  trackPageView,
  trackClick,
  setClickAnalyticsData,
  resetClickAnalyticsData,
  updatePageData,
} from '../actions';

describe('#Analytics Action', () => {
  it('trackPageView', () => {
    const data = {
      id: 123,
    };
    expect(trackPageView(data)).toEqual({
      payload: { id: 123 },
      type: TRACK_PAGE_VIEW,
    });
  });
  it('trackClick', () => {
    const piId = '92301';
    expect(trackClick(piId)).toEqual({
      payload: '92301',
      type: TRACK_CLICK,
    });
  });
  it('setClickAnalyticsData', () => {
    const data = {
      id: 123,
    };
    expect(setClickAnalyticsData(data)).toEqual({
      payload: { id: 123 },
      type: SET_CLICK_PAYLOAD,
    });
  });
  it('resetClickAnalyticsData', () => {
    expect(resetClickAnalyticsData()).toEqual({
      type: RESET_CLICK_PAYLOAD,
    });
  });
  it('updatePageData', () => {
    const data = {
      id: 123,
    };
    expect(updatePageData(data)).toEqual({
      payload: { id: 123 },
      type: UPDATE_PAGE_DATA,
    });
  });
});
