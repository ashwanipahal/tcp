import styled from 'styled-components/native';
import {
  typography as typographyStyleSystem,
  color as colorStyleSystem,
} from '@tcp/core/styles/rwdStyleSystem';

import { androidFontStyles } from '../../../../../../../../styles/globalStyles/StyledText.style';

const storeAddressText = styled.Text`
   ${typographyStyleSystem}
  ${colorStyleSystem}
  ${androidFontStyles}
  text-transform: capitalize;
`;
export default storeAddressText;
