import styled from 'styled-components/native';

const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const EarnedMessage = styled.Text`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const SocialMessage = styled.View`
  width: 55%;
`;

const Points = styled.Text`
  color: ${props =>
    props.isPlcc
      ? props.theme.colorPalette.userTheme.plcc
      : props.theme.colorPalette.userTheme.mpr};
  font-size: ${props => props.theme.typography.fontSizes.fs14};
  font-weight: ${props => props.theme.typography.fontWeights.black};
`;

export { Row, EarnedMessage, Points, SocialMessage };
