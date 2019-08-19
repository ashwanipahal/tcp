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

const WebViewWrapper = styled.View`
  height: 90px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const ErrorWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export { RecaptchaContainer, ErrorWrapper, SaveButtonWrapper, CancelButtonWrapper, WebViewWrapper };
