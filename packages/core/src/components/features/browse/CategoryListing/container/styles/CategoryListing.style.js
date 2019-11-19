import { css } from 'styled-components';

export default css`
  .promo-area-1 {
    background: #d8d8d8;
    padding: 24px 0;
    margin-bottom: 14px;
    margin-top: 25px;
    text-align: center;
  }
  .bread-crumb-container {
    display: flex;
    justify-content: center;
  }

  .image-tile-desktop {
    padding: 12px 10px;
    text-align: center;
    a {
      display: inline-flex;
    }
  }
  .image-tile-desktop-4-up,
  .image-tile-desktop-3-up,
  .image-tile-desktop-2-up,
  .image-tile-full-bleed {
    width: calc(50% - 20px);
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .image-tile-desktop {
      padding: 22px 14px;
    }
    .image-tile-desktop-4-up,
    .image-tile-desktop-3-up,
    .image-tile-desktop-2-up,
    .image-tile-full-bleed {
      width: calc(50% - 28px);
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .image-tile-desktop {
      padding: 22px 16px;
    }
    .image-tile-desktop-4-up {
      width: calc(25% - 32px);
    }
    .image-tile-desktop-3-up {
      width: calc(33% - 32px);
    }
    .image-tile-desktop-2-up {
      width: calc(50% - 32px);
    }
    .image-tile-full-bleed {
      width: calc(100% - 32px);
    }
  }
`;

export const customBreadCrumbStyle = css`
  .breadcrum-last-item {
    font-size: ${props => props.theme.typography.fontSizes.fs24};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .breadcrum-last-item {
      font-size: ${props => props.theme.typography.fontSizes.fs28};
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .breadcrum-last-item {
      font-size: ${props => props.theme.typography.fontSizes.fs28};
    }
  }
`;
