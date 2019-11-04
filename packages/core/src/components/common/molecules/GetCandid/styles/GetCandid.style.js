import { css } from 'styled-components';

export default css`
  .hide {
    display: none;
  }

  .no-flex {
    display: block;
  }

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

  div.get-candid-button-container {
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
    @media ${props => props.theme.mediaQuery.smallMax} {
      width: 164px;
      margin-left: 7px;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      width: 162px;
      margin-left: 6px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: 210px;
      margin-left: 6px;
    }
  }

  .gallery-button-left {
    @media ${props => props.theme.mediaQuery.smallMax} {
      width: 164px;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
    @media ${props => props.theme.mediaQuery.medium} {
      width: 162px;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: 210px;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
`;
