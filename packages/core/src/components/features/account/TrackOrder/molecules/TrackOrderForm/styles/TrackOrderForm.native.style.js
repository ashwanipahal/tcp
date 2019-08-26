import styled from 'styled-components';

const TrackOrderFormView = styled.View``;

const AnchorView = styled.View`
  display: flex;
  align-items: flex-start;
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.XL};
  text-decoration: underline;
`;

const InputField = styled.View`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  width: ${props => props.theme.spacing.LAYOUT_SPACING.XXXL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  z-index: 1;
`;

const CtaView = styled.View`
  width: 100%;
`;

export { InputField, CtaView, TrackOrderFormView, AnchorView };
