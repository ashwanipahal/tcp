import styled from 'styled-components/native';

const RecaptchaContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  height: 77px;
`;

const SaveButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const CancelButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const MessageWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  background-color: ${props => props.theme.colorPalette.gray[500]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const MessageTitle = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.fs14};
  font-weight: ${props => props.theme.typography.fontWeights.extrabold};
`;

const MessageTextWrapper = styled.Text`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const ErrorWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export {
  RecaptchaContainer,
  ErrorWrapper,
  SaveButtonWrapper,
  CancelButtonWrapper,
  MessageWrapper,
  MessageTitle,
  MessageTextWrapper,
};
