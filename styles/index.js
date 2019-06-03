import { createGlobalStyle } from 'styled-components';
import globalStyles from './globalStyles';
import fonts from './fonts';
import typography from './typography';
import animations from './animations';

// eslint-disable-next-line no-unused-expressions
const GlobalCss = createGlobalStyle`
  ${fonts}
  ${typography}
  ${animations}
  ${globalStyles}
`;

export default GlobalCss;
