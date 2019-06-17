import styled, { css } from 'styled-components';

const HeaderPromoContainer = styled.div`
  background-color: ${props => props.theme.colors.WHITE};
  border-top: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  box-sizing: border-box;
  height: 60px;
  text-align: center;
  text-transform: uppercase;
`;

const HeaderPromoItem = styled.div`
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  height: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const HeaderPromoItemIcon = css`
  .header-promo-item__contents span:first-child {
    margin-right: 5px;
  }

  .header-promo__promo-banner .header-promo-item__icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-promo__promo-banner--slot1 .header-promo-item__icon {
    background-color: ${props => props.theme.colors.BRAND.BOYS};
  }

  .header-promo__promo-banner--slot2 .header-promo-item__icon {
    background-color: ${props => props.theme.colors.PRIMARY.GREEN};
  }

  .header-promo__promo-banner--slot3 .header-promo-item__icon {
    background-color: ${props => props.theme.colors.BRAND.PRIMARY};
  }
`;

const HeaderPromoItemContents = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin: auto;
`;

const headerPromoStyles = {
  HeaderPromoContainer,
  HeaderPromoItem,
  HeaderPromoItemContents,
};

export default headerPromoStyles;
export { HeaderPromoItemIcon as headerIconStyles };
