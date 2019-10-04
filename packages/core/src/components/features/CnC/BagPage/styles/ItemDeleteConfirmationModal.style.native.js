import styled from 'styled-components/native';

export const StyledViewWrapper = styled.View`
  padding: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS}
    ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  align-content: center;
  padding-bottom: 0;
  background-color: white;
  width: 80%;
`;

export const StyledHeader = styled.Text`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  justify-content: center;
  align-content: center;
`;

export const StyledText = styled.Text`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  padding-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
`;

export const ButtonWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  max-width: 225px;
  align-self: center;
`;

export const ImageWrapper = styled.View`
  width: 20%;
  align-self: flex-end;
`;

export const StyledTouchableOpacity = styled.TouchableOpacity`
  align-items: flex-end;
  padding: 0px 0px ${props => props.theme.spacing.ELEM_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const StyledCrossImage = styled.Image`
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;
