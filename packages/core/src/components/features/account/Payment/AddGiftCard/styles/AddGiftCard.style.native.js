import styled from 'styled-components/native';

const RecaptchaContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  height: 90px;
`;

const ErrorWrapper = styled.View`
  display: flex;
  justify-content: ${'center'};
  align-items: center;
  padding: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export { RecaptchaContainer, ErrorWrapper };
