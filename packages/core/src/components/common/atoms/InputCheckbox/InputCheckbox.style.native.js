import styled from 'styled-components/native';
import { androidFontStyles } from '../../../../../styles/globalStyles/StyledText.style';

const getAdditionalStyle = props => {
  const { margins } = props;
  return {
    ...(margins && { margin: margins }),
  };
};

const StyledCheckBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${getAdditionalStyle}
`;

const StyledImage = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const StyledText = styled.Text`
  ${androidFontStyles}
  ${props => (props.inputVariation === 'inputVariation-1' ? ' width:90%' : '')};
`;

const StyledErrorIcon = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  display: flex;
`;

export { StyledCheckBox, StyledImage, StyledText, StyledErrorIcon };
