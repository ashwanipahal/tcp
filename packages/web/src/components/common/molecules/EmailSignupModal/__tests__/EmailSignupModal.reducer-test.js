import EmailSignupReducer from '../container/EmailSignupModal.reducer';
import {
  setEmailValidationStatus,
  emailSignupStatus,
  clearEmailSignupForm,
} from '../container/EmailSignupModal.actions';

describe('EmailSignup reducer', () => {
  it('should return empty object as default state', () => {
    expect(EmailSignupReducer(undefined, {})).toEqual({});
  });

  it('should return the subscription status object state', () => {
    expect(EmailSignupReducer({}, emailSignupStatus({ signupSuccess: true }))).toEqual({
      signupSuccess: true,
    });
  });

  it('should return the email validation status object state', () => {
    expect(EmailSignupReducer({}, setEmailValidationStatus({ validEmail: 'valid' }))).toEqual({
      validEmail: 'valid',
    });
  });

  it('should return empty object even though the state existed', () => {
    expect(EmailSignupReducer({ validEmail: 'valid' }, clearEmailSignupForm({}))).toEqual({});
  });
});
