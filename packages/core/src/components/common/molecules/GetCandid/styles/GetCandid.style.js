import { css } from 'styled-components';

export default css`
  .get-candid-default-heading {
    .get-candid-main-heading {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};

      @media ${props => props.theme.mediaQuery.medium} {
        margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
      }

      @media ${props => props.theme.mediaQuery.large} {
        margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
      }
    }

    .get-candid-heading-desc {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      margin-bottom: 26px;

      @media ${props => props.theme.mediaQuery.large} {
        margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
      }
    }
  }

  .get-candid-button-container {
    * {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};

    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }

    width: 100%;
  }

  .u-margin-right {
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
`;
