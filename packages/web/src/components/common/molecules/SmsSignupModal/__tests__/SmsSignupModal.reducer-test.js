import SmsSignupReducer from '../container/SmsSignupModal.reducer';
import { smsSignupStatus, clearSmsSignupForm } from '../container/SmsSignupModal.actions';

describe('SmsSignupReducer reducer', () => {
  it('should return empty object as default state', () => {
    expect(SmsSignupReducer(undefined, {})).toEqual({});
  });

  it('should return the subscription status object state', () => {
    expect(SmsSignupReducer({}, smsSignupStatus({ subscription: { success: true } }))).toEqual({
      subscription: { success: true },
    });
  });

  it('should return empty object even though the state existed', () => {
    expect(SmsSignupReducer({ subscription: { success: true } }, clearSmsSignupForm({}))).toEqual({
      subscription: {},
    });
  });
});
