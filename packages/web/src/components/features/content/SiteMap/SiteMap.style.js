import { css } from 'styled-components';

export default css`
  .siteMap_heading-container {
    margin: 0 auto ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  }
  .siteMap_heading {
    text-transform: uppercase;
  }

  .categories_container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  ol {
    margin: 0;
    padding: 0;
    width: 33%;

    h4 {
      margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
      text-transform: uppercase;

      a {
        color: ${props => props.theme.colors.PRIMARY.GRAY['900']};
      }
    }

    h5 {
      margin: 0;
    }
  }

  ul {
    margin: 0 0 10px 15px;
    padding: 0;
    list-style-type: none;
  }

  ul > li {
    color: ${props => props.theme.colors.PRIMARY.GRAY['400']};
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    line-height: 1.36;
    margin: 5px 0 0 10px;
  }
`;
