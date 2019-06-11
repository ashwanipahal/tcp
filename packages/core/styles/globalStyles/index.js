import { createGlobalStyle } from 'styled-components';
import globalStyles from './commonStyles';
import fonts from './fonts';

// eslint-disable-next-line no-unused-expressions
export default createGlobalStyle`
  ${fonts}
  ${globalStyles}
`;
