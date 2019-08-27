import { css } from 'styled-components/native';

import {
  typography as typographyStyleSystem,
  color as colorStyleSystem,
} from '@tcp/core/styles/rwdStyleSystem';

import { androidFontStyles } from '@tcp/core/styles/globalStyles/StyledText';

const BodyCopyStyles = css`
  ${typographyStyleSystem}
  ${colorStyleSystem}
  ${androidFontStyles}
`;

export default BodyCopyStyles;
