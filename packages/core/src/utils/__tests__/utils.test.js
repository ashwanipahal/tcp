import { getLabelValue } from '../utils';

describe('getLabelValue', () => {
  const labelState = {
    common: {
      account: {
        lbl_name: 'test',
      },
    },
  };

  it('should return correct label value if labelKey exists in the label state object', () => {
    const label = getLabelValue(labelState, 'common.account.lbl_name');
    expect(label).toBe(labelState.common.account.lbl_name);
  });

  it('should return correct label value if labelKey is direct child of label state passed', () => {
    const label = getLabelValue(labelState.common.account, 'lbl_name');
    expect(label).toBe(labelState.common.account.lbl_name);
  });

  it('should return label key if value against this key in the labelState is not a string', () => {
    const label = getLabelValue(labelState.common, 'account');
    expect(label).toBe('account');
  });

  it('should return correct label value if labelKey itself contain dot in its name', () => {
    const label = getLabelValue(
      {
        common: {
          errorMessage: {
            'lbl_error_.2010': 'test error message',
          },
        },
      },
      'common.errorMessage.lbl_error_.2010'
    );
    expect(label).toBe('test error message');
  });

  it("should return label key if labelKey doesn't exists in the label state object", () => {
    const lastNameKey = 'common.account.lbl_last_name';
    const label = getLabelValue(labelState, lastNameKey);
    expect(label).toBe(lastNameKey);
  });

  it('should return empty string if incorrect params type are passed', () => {
    const label = getLabelValue('', 'common.account.lbl_last_name');
    expect(label).toBe('');
  });
});
