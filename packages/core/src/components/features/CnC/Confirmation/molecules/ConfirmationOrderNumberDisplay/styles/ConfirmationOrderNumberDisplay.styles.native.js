import styled from 'styled-components/native';

export const OrderWrapper = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[800]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const AnchorWrapper = styled.View`
  left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const ConfirmationItemCount = styled.View`
  color: ${props => props.theme.colorPalette.gray[900]};
  width: 100px;
  line-height: 2.4;
  background: ${props => props.theme.colorPalette.white};
  left: 45%;
  top: -10;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  position: absolute;
`;
export const ConfirmationType = styled.View`
  justify-content: center;
  align-items: center;
`;
export const ConfirmationOrderDetailsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  justify-content: space-between;
`;

export default {
  OrderWrapper,
  AnchorWrapper,
  ConfirmationItemCount,
  ConfirmationType,
  ConfirmationOrderDetailsWrapper,
};
