import styled, { css } from 'styled-components';
import Col from '../../../atoms/Col';

export const ImageGrid = styled(Col)`
  margin-bottom: 32px;
  border-radius: ${props => (props.round ? '100%' : 0)};

  img {
    height: 100%;
    width: 100%;
  }
`;

export const ImageRoundFlex = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;

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
  background: ${props => props.theme.colorPalette.blue[700]};
  font-family: ${props => props.theme.typography.fonts.primary};
  font-size: ${props => props.theme.typography.fontSizes.fs36};
  font-weight: ${props => props.theme.fonts.fontWeight.black};
  letter-spacing: ${props => props.theme.typography.letterSpacings.ls222};
  color: ${props => props.theme.colors.WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;

  @media ${props => props.theme.mediaQuery.mediumOnly} {
    font-size: ${props => props.theme.typography.fontSizes.fs26};
  }

  @media ${props => props.theme.mediaQuery.smallOnly} {
    font-size: ${props => props.theme.typography.fontSizes.fs20};
  }

  .moduleM__shopAllBtn {
    padding: 48px 61px;
    text-align: center;
    display: flex;
    justify-content: center;
  }
`;

export default css`
  .image-items-container {
    justify-content: center;
    margin: 24px auto 0;
  }
  .moduleM__productName {
    display: flex;
    justify-content: center;
  }

  .promoBanner {
    background: ${props => props.theme.colorPalette.blue[700]};
    color: ${props => props.theme.colors.WHITE};
    margin-top: 16px;

    .medium_text_semibold {
      font-weight: ${props => props.theme.fonts.fontWeight.medium};

      @media ${props => props.theme.mediaQuery.mediumOnly} {
        display: block;
        font-size: ${props => props.theme.typography.fontSizes.fs20};
      }
      @media ${props => props.theme.mediaQuery.smallOnly} {
        display: block;
        font-size: ${props => props.theme.typography.fontSizes.fs20};
      }
    }

    .fixed_medium_text_black {
      @media ${props => props.theme.mediaQuery.mediumOnly} {
        display: block;
        font-size: ${props => props.theme.typography.fontSizes.fs48};
      }
      @media ${props => props.theme.mediaQuery.smallOnly} {
        display: block;
        font-size: ${props => props.theme.typography.fontSizes.fs20};
      }
    }
  }
  .promo-header {
    .medium_text_subpromo {
      font-size: ${props => props.theme.typography.fontSizes.fs20};
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
  }
  .image-items-container__flex--item {
    margin-bottom: 32px;
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
    background: ${props => props.theme.colorPalette.blue[700]};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-size: ${props => props.theme.typography.fontSizes.fs36};
    font-weight: ${props => props.theme.fonts.fontWeight.black};
    letter-spacing: ${props => props.theme.typography.letterSpacings.ls222};
    color: ${props => props.theme.colors.WHITE};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 142px;
    margin-bottom: 32px;
    width: 142px;

    .moduleM__shopAllBtn {
      padding: 48px 61px;
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
    margin-top: 12px;

    > :not(:last-child) {
      border-right: 1px solid #c3c3c3;
    }

    .product-tab-list__item {
      padding: 0px 10px;
    }
  }
  .promo-header .link-text {
    margin-bottom: 0;
  }
  .moduleM__productImage {
    height: 100%;
    width: 100%;
  }
`;
