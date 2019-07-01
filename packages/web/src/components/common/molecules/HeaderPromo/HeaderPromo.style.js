import { css } from 'styled-components';

const ICON_SIZE = '60px';

const HeaderPromoStyles = css`
  background: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  @media ${props => props.theme.mediaQuery.large} {
    background: ${props => props.theme.colors.WHITE};
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
      height: ${ICON_SIZE};
      justify-content: center;
    }
  }

  .styled-text {
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .header-promo-item__content {
    font-size: 12px;
    width: 100%;
    text-align: center;
    @media ${props => props.theme.mediaQuery.medium} {
      width: auto;
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: calc(100% - ${ICON_SIZE});
    }
  }

  .header-promo-item__icon {
    height: ${ICON_SIZE};
    width: ${ICON_SIZE};
    align-items: center;
    justify-content: center;
    display: none;
    @media ${props => props.theme.mediaQuery.medium} {
      display: flex;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
    &[class*='orange-'] {
      background-color: ${props => props.theme.colors.BRAND.BOYS};
    }
    &[class*='green-'] {
      background-color: ${props => props.theme.colors.PRIMARY.GREEN};
    }
    &[class*='blue-'] {
      background-color: ${props => props.theme.colors.BRAND.PRIMARY};
    }
  }
`;

export default HeaderPromoStyles;
