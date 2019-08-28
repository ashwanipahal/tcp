import ApplyCardReducer from '../ApplyCard.reducer';
import constants from '../../RewardsCard.constants';

const mockModuleXData = {
  header_content: '<h1>Header Content</h1>',
  footer_content: '<h1>Footer Content</h1>',
};

describe('ApplyCardReducer', () => {
  it('should trigger SET_MODULEX_CONTENT action', () => {
    const setModuleXContent = {
      type: constants.SET_MODULEX_CONTENT,
      payload: mockModuleXData,
    };

    const mockResponse = {
      plccData: {
        footer_content: '<h1>Footer Content</h1>',
        header_content: '<h1>Header Content</h1>',
      },
    };
    expect(ApplyCardReducer({}, setModuleXContent)).toEqual(mockResponse);
  });

  it('should trigger RESPONSE_INSTANT_CARD_APPLICATION action', () => {
    const submitPLCCApplication = {
      type: constants.RESPONSE_INSTANT_CARD_APPLICATION,
      payload: { status: 'PENDING' },
    };

    const mockResponse = {
      applicationStatus: 'PENDING',
    };
    expect(ApplyCardReducer({}, submitPLCCApplication)).toEqual(mockResponse);
  });

  it('should return the initial state', () => {
    expect(ApplyCardReducer(mockModuleXData, {})).toEqual(mockModuleXData);
  });

  it('should return the initial when no state provided', () => {
    expect(ApplyCardReducer(undefined, {})).toEqual({
      contact_information_disclaimer: '',
      pre_screen_code: '',
    });
  });
});
