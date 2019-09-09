import styled from 'styled-components';

const AnchorView = styled.View`
  display: flex;
  align-items: flex-start;
  margin: ${props => props.theme.spacing.ELEM_SPACING.SM} 0
    ${props => props.theme.spacing.ELEM_SPACING.XXL};
  text-decoration: underline;
`;

const InputField = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const CtaView = styled.View`
  width: 100%;
`;

export { InputField, CtaView, AnchorView };
