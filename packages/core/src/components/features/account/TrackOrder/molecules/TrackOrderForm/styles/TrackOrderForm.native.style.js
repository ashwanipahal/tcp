import styled from 'styled-components';

const AnchorView = styled.View`
  display: flex;
  align-items: flex-start;
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.XL};
  text-decoration: underline;
`;

const InputField = styled.View`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const CtaView = styled.View`
  width: 100%;
`;

export { InputField, CtaView, AnchorView };
