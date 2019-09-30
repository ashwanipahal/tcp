import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${props => props.theme.colors.WHITE};
  margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.LRG};
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colors.BLACK};
`;

const CartListHeading = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const SubHeader = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const PickupSubHeader = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  display: flex;
  flex-direction: row;
`;

const PickupProductListTitle = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  border-top-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colors.BLACK};
`;

const AtTextWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const StoreDetailsWrapper = styled.View`
  top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  display: flex;
  flex-direction: row;
`;

const CartItemTileContainer = styled.View`
  border-top-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colors.BLACK};
`;
const TooltipWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  position: relative;
  bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
`;

export {
  Container,
  CartListHeading,
  SubHeader,
  PickupSubHeader,
  PickupProductListTitle,
  AtTextWrapper,
  CartItemTileContainer,
  StoreDetailsWrapper,
  TooltipWrapper,
};
