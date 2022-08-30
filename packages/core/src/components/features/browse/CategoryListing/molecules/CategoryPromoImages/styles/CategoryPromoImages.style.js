import { css } from 'styled-components';

export default css`
  .image-variant-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .image-title-fullBleed,
  .image-title-2-up,
  .image-title-3-up,
  .image-title-4-up {
    margin-top: 9px;
  }

  .image-link-fullBleed,
  .image-link-2-up,
  .image-link-3-up,
  .image-link-4-up {
    margin-top: 4px;
  }

  .clp-mobile-tab-view {
    display: flex;
  }
  .clp-desktop-view {
    display: none;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .clp-mobile-tab-view {
      display: flex;
    }
    .clp-desktop-view {
      display: none;
    }

    .image-title-fullBleed,
    .image-title-2-up,
    .image-title-3-up,
    .image-title-4-up {
      margin-top: 20px;
    }

    .image-link-fullBleed,
    .image-link-2-up,
    .image-link-3-up,
    .image-link-4-up {
      margin-top: 6px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .clp-mobile-tab-view {
      display: none;
    }
    .image-title-fullBleed,
    .image-title-2-up {
      margin-top: 42px;
    }
    .image-title-3-up {
      margin-top: 12px;
    }
    .image-title-4-up {
      margin-top: 9px;
    }
    .image-link-fullBleed,
    .image-link-2-up {
      margin-top: 14px;
    }
    .image-link-3-up {
      margin-top: 8px;
    }
    .clp-desktop-view {
      display: flex;
    }
  }
`;
