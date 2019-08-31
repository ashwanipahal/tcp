import styled from 'styled-components/native';

const StyledCheckBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledImage = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const StyledText = styled.Text`
  ${props => (props.variation === 'textbelow' ? 'width :90%' : '')};
`;

const StyledErrorIcon = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  display: flex;
`;

export { StyledCheckBox, StyledImage, StyledText, StyledErrorIcon };
