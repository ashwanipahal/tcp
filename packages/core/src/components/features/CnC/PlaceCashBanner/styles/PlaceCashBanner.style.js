import { css } from 'styled-components';

const styles = css`
  .place-cash {
    &__container {
      position: relative;
    }
    &__img {
      height: 70px;
      @media ${props => props.theme.mediaQuery.medium} {
        height: 80px;
      }
      @media ${props => props.theme.mediaQuery.large} {
        height: 100px;
      }
    }
    &__text-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &__title {
      letter-spacing: 0.64px;
      color: ${props => props.theme.colors.BLACK};
      margin: 0;
    }
    &__subTitle {
      letter-spacing: 0.55px;
      color: ${props => props.theme.colors.BLACK};
      margin: 0 0 8px 0;
    }
    &__tnc-text {
      font-size: 6px;
      color: ${props => props.theme.colors.PRIMARY.DARK};
      @media ${props => props.theme.mediaQuery.large} {
        font-size: 8px;
      }
    }
    &__tnc-container {
      width: 55%;
      margin: 0 auto;
      line-height: 0.8;
    }
    &__modalLink {
      font-size: 6px;
      padding: 0 2px;
      color: ${props => props.theme.colors.PRIMARY.DARK};
      @media ${props => props.theme.mediaQuery.large} {
        font-size: 8px;
      }
    }
  }
`;

export default styles;
