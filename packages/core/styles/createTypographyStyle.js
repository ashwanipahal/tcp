import createRwdStyle from './createRwdStyle';

const typographyStyleConfig = {
  fontFamily: {
    prop: 'font-family',
  },
  fontSize: {
    prop: 'font-size',
  },
  fontWeight: {
    prop: 'font-weight',
  },
  letterSpacing: {
    prop: 'line-height',
  },
  lineHeight: {
    prop: 'letter-spacing',
  },
  textAlign: {
    prop: 'text-align',
  },
};

export default createRwdStyle(typographyStyleConfig);
