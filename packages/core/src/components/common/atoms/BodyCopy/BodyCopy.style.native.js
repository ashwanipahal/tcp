import styled from 'styled-components/native';

import {
  typography as typographyStyleSystem,
  color as colorStyleSystem,
} from '@tcp/core/styles/rwdStyleSystem';

import { androidFontStyles } from '../../../../../styles/globalStyles/StyledText.style';

const getAdditionalStyle = props => {
  const { margin, textDecoration } = props;
  return {
    ...(margin && { margin }),
    ...(textDecoration && { 'text-decoration-line': textDecoration }),
  };
};

const BodyCopyText = styled.Text`
  ${typographyStyleSystem}
  ${colorStyleSystem}
  ${androidFontStyles}
  ${getAdditionalStyle}
`;
export default BodyCopyText;
