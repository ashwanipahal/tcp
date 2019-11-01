import { css, keyframes } from 'styled-components';

const progress = keyframes`0% {
  left: -500px;
}
100% {
  left: 500px;
}`;

const style = css`
  .product-tile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 10px;
    margin: 0 0 6px 0;
    width: calc(50% - ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS});
    background-clip: content-box;

    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.LRG} 0;
      padding: 12px ${props => props.theme.spacing.LAYOUT_SPACING.SM};
      width: calc(33.33% - ${props => props.theme.spacing.LAYOUT_SPACING.LRG});
    }
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 0 19px 0;
      padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 21px;
      width: calc(25% - 42px);
    }
  }

  &.skeleton-row {
    position: relative;
  }
  .skeleton-col {
    background-color: rgb(239, 241, 246);
    overflow: hidden;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: -500px;
      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0)
      );
      animation: ${progress} 0.5s ease-in-out infinite;
    }
  }
  .skeleton-img {
    height: 200px;
  }
  .skeleton-badge {
    margin-top: 22px;
    height: 18px;
    width: 40px;
  }
  .skeleton-title {
    margin-top: 20px;
    height: 16px;
  }
  .skeleton-swatches {
    margin-top: 24px;
    height: 15px;
  }
  .skeleton-add-to-bag {
    margin-top: 35px;
    height: 32px;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .skeleton-img {
      height: 257px;
    }
    .skeleton-badge {
      margin-top: 32px;
      height: 24px;
      width: 50px;
    }

    .skeleton-title {
      margin-top: 27px;
      height: 18px;
    }
    .skeleton-swatches {
      margin-top: 31px;
      height: 15px;
    }
    .skeleton-add-to-bag {
      margin-top: 40px;
      height: 42px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .skeleton-img {
      height: 344px;
    }
    .skeleton-badge {
      margin-top: 19px;
      height: 27px;
      width: 53px;
    }
    .skeleton-title {
      margin-top: 26px;
      height: 19px;
    }
    .skeleton-swatches {
      margin-top: 27px;
      height: 20px;
    }
    .skeleton-add-to-bag {
      margin-top: 42px;
      height: 52px;
    }
  }
`;
export default style;
