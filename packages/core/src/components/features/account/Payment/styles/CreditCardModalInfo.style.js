import { css } from 'styled-components';

const deleteCreditCardModalStyle = css`
  @media ${props => props.theme.mediaQuery.medium} {
    margin: 26px 100px 0;
  }
  @media ${props => props.theme.mediaQuery.large} {
    margin: 26px 90px 0;
  }

  .deleteCreditCardModal__cardInfo {
    float: left;
    width: 60%;
    padding-left: 0px;
    padding-top: 10px;
    margin-left: 12px;
    @media ${props => props.theme.mediaQuery.medium} {
      float: none;
      text-align: left;
      margin-bottom: 15px;
      margin-left: 35%;
      padding-top: 0px;
      span {
        display: block;
      }
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: 100%;
      margin-bottom: 12px;
      margin-left: 20%;
      padding-top: 0px;
      span {
        display: inline-block;
        margin-left: 30px;
      }
    }
  }
  .deleteCreditCardModal__expiry {
    float: none;
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
