import { css } from 'styled-components';

const HeaderPromoStyles = css`
  background: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  @media ${props => props.theme.mediaQuery.large} {
    background: white;
  }
  &.header-promo-area--mobile {
    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
  }
  &.header-promo-area--desktop {
    display: none;
    @media ${props => props.theme.mediaQuery.large} {
      display: block;
    }
  }

  .header-promo__item {
    background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
    display: flex !important;
    align-items: center;
    height: 42px;
    @media ${props => props.theme.mediaQuery.medium} {
      height: 60px;
    }
  }

  .styled-text {
    margin-right: 8px;
  }

  .header-promo-item__content {
    font-size: 12px;
    width: 100%;
    text-align: center;
    @media ${props => props.theme.mediaQuery.medium} {
      width: calc(100% - 60px);
    }
  }

  .header-promo-item__icon {
    height: 60px;
    width: 60px;
    align-items: center;
    justify-content: center;
    display: none;
    @media ${props => props.theme.mediaQuery.medium} {
      display: flex;
    }
  }

  .header-promo-item__icon--slot1 {
    background-color: ${props => props.theme.colors.BRAND.BOYS};
  }

  .header-promo-item__icon--slot2 {
    background-color: ${props => props.theme.colors.PRIMARY.GREEN};
  }

  .header-promo-item__icon--slot3 {
    background-color: ${props => props.theme.colors.BRAND.PRIMARY};
  }
`;

export default HeaderPromoStyles;
