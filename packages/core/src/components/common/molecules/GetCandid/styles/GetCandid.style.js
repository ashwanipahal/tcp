import { css } from 'styled-components';

export default css`
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

    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }

  .get-candid-button-container {
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    margin: 17px auto;

    @media ${props => props.theme.mediaQuery.large} {
      margin: 17px auto;
    }
  }

  .gellary-button-right {
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    width: 164px;
    @media ${props => props.theme.mediaQuery.medium} {
      width: 162px;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: 210px;
    }
  }
`;
