import SmsSignupReducer from '../container/SmsSignupModal.reducer';
import { smsSignupStatus, clearForm } from '../container/SmsSignupModal.actions';

describe('EmailSignup reducer', () => {
  it('should return empty object as default state', () => {
    expect(SmsSignupReducer(undefined, {})).toEqual({});
  });

  it('should return the subscription status object state', () => {
    expect(SmsSignupReducer({}, smsSignupStatus({ signupSuccess: true }))).toEqual({
      signupSuccess: true,
    });
  });

  it('should return empty object even though the state existed', () => {
    expect(SmsSignupReducer({ validEmail: 'valid' }, clearForm({}))).toEqual({});
  });
});
