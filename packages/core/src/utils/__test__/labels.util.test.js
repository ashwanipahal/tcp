import LabelsUtil from '../labels.util';

describe('Labels Util getLabel', () => {
  it('should return the same value if labelState is empty', () => {
    const labelState = null;
    const labelKey = 'ProductDetails.Heading.desc';
    expect(LabelsUtil.getLabel(labelState, labelKey)).toBe(labelKey);
  });
  it('should return the same value if no labels is empty', () => {
    const labelState = {
      common: {
        ProductDetails: {
          Heading: {
            Title: 'hi',
          },
        },
      },
    };
    const labelKey = 'ProductDetails.Heading.Title';
    expect(LabelsUtil.getLabel(labelState, labelKey)).toBe(labelKey);
  });
  it('should replace with placeholder value', () => {
    const labelState = {
      common: {
        ProductDetails: {
          Heading: {
            Title: 'hi',
          },
        },
      },
    };
    const labelKey = 'ProductDetails.Heading.Title';
    const placeholderValue = 'title';
    expect(LabelsUtil.getLabel(labelState, labelKey, placeholderValue)).toBe(labelKey);
  });
});

describe('Labels Util replacePlaceholderValues', () => {
  const labelStr = 'test';
  const placeholder = [];
  // const labelStr1 = 'test {0}';
  // const placeholder1 = ['here'];
  it('should return the same label value if we do not have placeholder space if labelState is empty', () => {
    expect(LabelsUtil.replacePlaceholderValues(labelStr, placeholder)).toBe(labelStr);
  });

  it('should return blank for black labelstr', () => {
    expect(LabelsUtil.replacePlaceholderValues('', placeholder)).toBe('');
  });
});

describe('Labels Util replacePlaceholderValues function', () => {
  const labelStr1 = 'test {0} {0}';
  const placeholder1 = ['here'];
  const labelFinal = 'test here here';
  it('should return the same label value', () => {
    expect(LabelsUtil.replacePlaceholderValues(labelStr1, placeholder1, true)).toBe(labelFinal);
  });
});
