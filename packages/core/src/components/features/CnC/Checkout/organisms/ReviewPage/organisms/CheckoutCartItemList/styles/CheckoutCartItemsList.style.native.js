import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${props => props.theme.colors.WHITE};
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const CartListHeading = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
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
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  border-top-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colors.BLACK};
`;
const TooltipWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  position: relative;
  bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
`;
const ContainerView = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colors.BLACK};
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
  ContainerView,
};
