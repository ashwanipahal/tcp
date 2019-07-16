import { css } from 'styled-components';

const deleteCreditCardModalStyle = css`
  @media ${props => props.theme.mediaQuery.medium} {
    margin: 26px 100px 0;
  }
  @media ${props => props.theme.mediaQuery.large} {
    margin: 26px 90px 0;
  }

  .deleteCreditCardModal__cardInfo {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
    float: left;
    width: 60%;
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM} @media
      ${props => props.theme.mediaQuery.medium} {
      float: none;
      text-align: left;
      margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.MED}
        ${props => props.theme.spacing.LAYOUT_SPACING.XL} span {
        display: block;
      }
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: 100%;
      margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.SM}
        ${props => props.theme.spacing.LAYOUT_SPACING.XL} span {
        display: inline-block;
      }
    }
  }
  .deleteCreditCardModal__expiry {
    @media ${props => props.theme.mediaQuery.large} {
      float: right;
    }
  }

  .deleteCreditCardModal__desc {
    width: 75%;
    margin: 0 auto;
    @media ${props => props.theme.mediaQuery.medium} {
      width: 100%;
      text-align: center;
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: 100%;
      text-align: left;
    }
    .deleteCreditCardModal__img {
      width: 20%;
      float: left;
      @media ${props => props.theme.mediaQuery.medium} {
        width: auto;
        float: none;
      }
      @media ${props => props.theme.mediaQuery.large} {
        width: 25%;
        float: left;
      }
      @media ${props => props.theme.mediaQuery.smallOnly} {
        width: 30%;
        max-width: 50px;
        padding: 10px;
      }
    }
  }

  .DeleteCreditCardAddress {
    word-break: break-word;
    width: 100%;
    margin-left: 26%;
    overflow: hidden;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin-left: 85px;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      width: 100%;
      margin-left: 35%;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin: 0 115px;
    }
  }

  .deleteCreditCardModal__modalTitle {
    text-align: center;
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    @media ${props => props.theme.mediaQuery.medium} {
      margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
        ${props => props.theme.spacing.ELEM_SPACING.XL};
      padding: 0;
      text-align: center;
    }
  }
`;

export default deleteCreditCardModalStyle;
