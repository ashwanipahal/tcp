import { css } from 'styled-components';
import { getIconPath } from '@tcp/core/src/utils';

export default css`
  .siteMap_heading-container {
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED} auto
      ${props => props.theme.spacing.ELEM_SPACING.MED};

    @media ${props => props.theme.mediaQuery.medium} {
      margin: ${props => props.theme.spacing.ELEM_SPACING.MED} auto
        ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin: 0 auto ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }
  }

  .siteMap_heading {
    text-transform: uppercase;
  }

  .categories_container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  .level-one-container {
    margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.LRG} 0;
    padding: 0;
    width: 100%;

    @media ${props => props.theme.mediaQuery.medium} {
      width: 50%;
    }

    @media ${props => props.theme.mediaQuery.large} {
      width: 33%;
    }

    .level-one-title {
      margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
      text-transform: uppercase;

      a {
        color: ${props => props.theme.colors.PRIMARY.GRAY['900']};
      }
    }

    .level-two-title {
      margin: 0;
      background: url(${getIconPath('down-arrow-sitemap')}) no-repeat left 7px;
      background-size: 8px;
      padding-left: 15px;
    }
  }

  .level-two-container {
    margin: 0 0 10px 0;
    padding: 0 0 0 10px;
    list-style-type: none;

    .level-three-container {
      color: ${props => props.theme.colors.PRIMARY.GRAY['400']};
      font-size: ${props => props.theme.typography.fontSizes.fs12};
      line-height: 1.36;
      margin: 5px 0 0 15px;
    }
  }
`;
