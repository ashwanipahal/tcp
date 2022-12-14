import { css } from 'styled-components';

const styles = css`
  .place-cash {
    &__container {
      position: relative;
      margin: 0 0 10px 0;
      width: 100%;
    }
    &__text-wrapper {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &__title {
      letter-spacing: 0.64px;
      color: ${props => props.theme.colors.BLACK};
      margin: 0;
      padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
      padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    }
    &__subTitle {
      letter-spacing: 0.55px;
      color: ${props => props.theme.colors.BLACK};
      margin: ${props => `0 0 ${props.theme.spacing.LAYOUT_SPACING.XXS} 0`};
      padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
      padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    }
    &__tnc-text {
      font-size: ${props => props.theme.typography.fontSizes.fs8};
      color: ${props => props.theme.colors.PRIMARY.DARK};
      @media ${props => props.theme.mediaQuery.large} {
        font-size: ${props => props.theme.typography.fontSizes.fs14};
      }
    }
    &__tnc-container {
      margin: 0 auto;
      line-height: 0.8;
      text-align: center;
      padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
      padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    }
    &__modalLink {
      font-size: ${props => props.theme.typography.fontSizes.fs8};
      padding: 0 2px;
      color: ${props => props.theme.colors.PRIMARY.DARK};
      @media ${props => props.theme.mediaQuery.large} {
        font-size: ${props => props.theme.typography.fontSizes.fs12};
      }
    }
  }
`;

export default styles;
