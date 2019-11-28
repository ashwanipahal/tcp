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
      color: ${props => props.theme.colors.PRIMARY.GRAY['900']};
      margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.MED};

      a {
        color: ${props => props.theme.colors.PRIMARY.GRAY['900']};
      }
    }

    li {
      padding-left: 15px;

      ul {
        padding-left: 20px;
      }
    }
  }
`;
