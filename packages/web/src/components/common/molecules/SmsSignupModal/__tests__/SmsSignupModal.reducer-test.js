import SmsSignupReducer from '../container/SmsSignupModal.reducer';
import { toggleSmsSignupModal } from '../container/SmsSignupModal.actions';

describe('SmsSignupReducer reducer', () => {
  it('should return empty object as default state', () => {
    expect(SmsSignupReducer(undefined, {})).toEqual({});
  });

  it('should return the modal status object state', () => {
    expect(SmsSignupReducer({}, toggleSmsSignupModal({ isModalOpen: true }))).toEqual({
      isModalOpen: true,
    });
  });
});
