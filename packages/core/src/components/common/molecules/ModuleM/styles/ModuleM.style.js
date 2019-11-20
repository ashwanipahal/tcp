import styled, { css } from 'styled-components';
import Col from '../../../atoms/Col';

export const ImageGrid = styled(Col)`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  border-radius: ${props => (props.round ? '100%' : 0)};

  img {
    height: 100%;
    width: 100%;
  }
`;

export const ImageRoundFlex = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};

  img {
    height: 143px;
    width: 143px;
    border-radius: 100%;

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      height: 137px;
      width: 137px;
    }

    @media ${props => props.theme.mediaQuery.smallOnly} {
      height: 115px;
      width: 103px;
    }
  }
`;

export const CtaButtonWrapper = styled(Col)`
  background: ${props => props.theme.colorPalette.blue[500]};
  font-family: ${props => props.theme.typography.fonts.primary};
  font-size: ${props => props.theme.typography.fontSizes.fs36};
  font-weight: ${props => props.theme.fonts.fontWeight.black};
  letter-spacing: ${props => props.theme.typography.letterSpacings.ls222};
  color: ${props => props.theme.colors.WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};

  @media ${props => props.theme.mediaQuery.mediumOnly} {
    font-size: ${props => props.theme.typography.fontSizes.fs26};
  }

  @media ${props => props.theme.mediaQuery.smallOnly} {
    font-size: ${props => props.theme.typography.fontSizes.fs20};
  }

  .moduleM__shopAllBtn {
    font-family: ${props => props.theme.typography.fonts.primary};
    padding: ${props => props.theme.spacing.ELEM_SPACING.XXXL} 61px;
    text-align: center;
    display: flex;
    justify-content: center;
  }
`;

export default css`
  .image-items-container {
    justify-content: center;
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} auto 0;
  }
  .moduleM__productName {
    display: flex;
    justify-content: center;
  }

  .promoBanner {
    background: ${props => props.theme.colorPalette.blue[500]};
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;

    @media ${props => props.theme.mediaQuery.large} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XXS} 0;
    }

    .promo-text {
      display: block;

      @media ${props => props.theme.mediaQuery.large} {
        display: inline;
      }
    }
  }

  .image-items-container-category {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    > :not(:last-child) {
      margin-right: 14px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin: 25px 214px;
    }
  }
  .image-items-container__flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .image-items-container__flex--item {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    margin-right: 14px;
    img {
      width: 142px;
      height: 142px;

      @media ${props => props.theme.mediaQuery.mediumOnly} {
        height: 137px;
        width: 137px;
      }

      @media ${props => props.theme.mediaQuery.smallOnly} {
        height: 115px;
        width: 103px;
      }
    }
  }
  .moduleM__shopAllBtnWrapper {
    background: ${props => props.theme.colorPalette.blue[500]};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-size: ${props => props.theme.typography.fontSizes.fs36};
    font-weight: ${props => props.theme.fonts.fontWeight.black};
    letter-spacing: ${props => props.theme.typography.letterSpacings.ls222};
    color: ${props => props.theme.colors.WHITE};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 142px;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    width: 142px;

    .moduleM__shopAllBtn {
      font-family: ${props => props.theme.typography.fonts.primary};
      padding: ${props => props.theme.spacing.ELEM_SPACING.XXXL} 61px;
      text-align: center;
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      font-size: ${props => props.theme.typography.fontSizes.fs26};
      height: 137px;
      width: 137px;
    }

    @media ${props => props.theme.mediaQuery.smallOnly} {
      font-size: ${props => props.theme.typography.fontSizes.fs20};
      height: 115px;
      width: 103px;
    }
  }

  .product-tab-list {
    display: flex;
    justify-content: center;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};

    > :not(:last-child) {
      border-right: 1px solid #c3c3c3;
    }

    .product-tab-list__item {
      padding: 0px ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
  }
  .promo-header .link-text {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .moduleM__productImage {
    height: 100%;
    width: 100%;
  }

  .header-container {
    margin-right: 0;
  }

  .moduleM__productContainer {
    height: 100%;
  }
`;
