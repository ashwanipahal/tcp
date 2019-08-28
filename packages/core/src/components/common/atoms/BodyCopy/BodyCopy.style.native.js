import { css } from 'styled-components/native';

import {
  typography as typographyStyleSystem,
  color as colorStyleSystem,
} from '@tcp/core/styles/rwdStyleSystem';

import { androidFontStyles } from '../../../../../styles/globalStyles/StyledText.style';

const BodyCopyStyles = css`
  ${typographyStyleSystem}
  ${colorStyleSystem}
  ${androidFontStyles}
`;

export default BodyCopyStyles;
