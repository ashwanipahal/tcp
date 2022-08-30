import EmailSignupReducer from '../container/EmailSignupModal.reducer';
import { toggleEmailSignupModal } from '../container/EmailSignupModal.actions';

describe('EmailSignup reducer', () => {
  it('should return empty object as default state', () => {
    expect(EmailSignupReducer(undefined, {})).toEqual({});
  });

  it('should return the modal status object state', () => {
    expect(EmailSignupReducer({}, toggleEmailSignupModal({ isModalOpen: true }))).toEqual({
      isModalOpen: true,
    });
  });
});
