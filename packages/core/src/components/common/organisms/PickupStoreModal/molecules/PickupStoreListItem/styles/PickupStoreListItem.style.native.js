import styled, { css } from 'styled-components/native';

export const FavStoreLabel = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const StoreListItemWrapper = styled.View`
  min-height: 138px;
  display: flex;
  flex-direction: row;
  border: 1px solid ${props => props.theme.colorPalette.gray['800']};
  padding: 0 15px 12px 10px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const FavStoreIcon = styled.View`
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  width: 17px;
  height: 17px;
`;

export const StoreInfoWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 44%;
`;

export const PickupButtonsWrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  width: 56%;
`;

export const StoreUnavailable = styled.View`
  margin: 0 auto;
  width: 109px;
`;

export const PickupCTAWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const PickupRadioBtnWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  font-size: ${props => props.theme.typography.fontSizes.fs14};
  font-family: ${props => props.theme.typography.fonts.secondary};
`;

export const StoreDetailsAnchorWrapper = css`
  text-decoration: underline;
`;

export const addToCartErrorStyle = css`
  padding-left: 35px;
`;

export const TooltipContentWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TooltipWrapper = styled.View`
  width: 73px;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export default {
  FavStoreIcon,
  FavStoreLabel,
  StoreListItemWrapper,
  StoreInfoWrapper,
  PickupButtonsWrapper,
  StoreUnavailable,
  PickupCTAWrapper,
  PickupRadioBtnWrapper,
  StoreDetailsAnchorWrapper,
  TooltipWrapper,
  addToCartErrorStyle,
};
