import styled, { css } from 'styled-components';

const styles = css`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const Container = styled.View`
  margin-top: 45px;
`;

export const InnerContainer = styled.View`
  margin-left: 20px;
  flex-wrap: wrap;
  flex: 1;
`;

export const OfferPriceAndBadge3Container = styled.View`
  flex-direction: row;
`;

export const OfferPriceAndBadge2Container = styled.View`
  flex-direction: row;
`;

export const ModalButton = styled.View`
  align-items: flex-start;
  margin-top: 28px;
`;

export default styles;
