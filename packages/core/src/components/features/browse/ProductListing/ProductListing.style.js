import { css } from 'styled-components';

export default css`
  .bread-crumb,
  .filter-area {
    padding-top: 20px;
    padding-bottom: 17px;
    margin: 5px 0;
  }
  .bread-crumb,
  .product-list {
    display: flex;
  }
  @media ${props => props.theme.mediaQuery.large} {
    .show-count-web {
      display: none;
    }
  }

  .sidebar {
    display: none;
  }
  .seo-text {
    text-align: center;
    padding-bottom: 20px;
  }
  @media ${props => props.theme.mediaQuery.large} {
    .sidebar {
      display: flex;
    }
  }

  .render-desktop-view {
    display: none;

    @media ${props => props.theme.mediaQuery.large} {
      display: block;
    }
  }
  .show-count-section {
    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
  }
  .render-mobile-view {
    width: auto;
    padding: 0;

    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      .filter-row {
        width: auto;
      }
    }
  }

  .filter-section {
    margin-top: 50px;
  }

  .count-section {
    text-align: right;
    position: relative;
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
  }

  .items-count-content-number {
    font-weight: ${props => props.theme.typography.fontWeights.black};
    padding: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
`;
