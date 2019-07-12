import { css } from 'styled-components';

const deleteCardModalStyle = css`
  @media ${props => props.theme.mediaQuery.medium} {
    margin: 0 80px;
  }
  @media ${props => props.theme.mediaQuery.smallOnly} {
    .deleteCardModal_card {
      display: block;
    }
  }
  .deleteCardModal__cardInfo {
    float: left;
    width: 80%;
    padding-left: 20px;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      width: 75%;
    }
  }
  .deleteCardModal__expiry {
    float: right;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      float: none;
    }
  }
  .deleteCardModal__btnWrapper {
    text-align: center;
    padding-top: 80px;
    clear: both;
    button.deleteCardModal__btn {
      display: inline-block;
      font-weight: ${props => props.theme.fonts.fontWeight.normal};
      float: none;
      width: 60%;
      @media ${props => props.theme.mediaQuery.medium} {
        float: right;
        width: 40%;
      }
    }
    button.deleteCardModal__deleteCancel {
      float: none;
      @media ${props => props.theme.mediaQuery.medium} {
        float: left;
      }
    }
  }
  .deleteCardModal__desc {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin: 0 auto;
      width: 75%;
    }
    .deleteCardModal__img {
      width: 15%;
      float: left;
    }
  }
  .deleteCardModal__addressToDelete {
    margin: 0 ${props => props.theme.spacing.LAYOUT_SPACING.XL}
      ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    display: block;
    word-break: break-word;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: 0;
      margin-right: 0;
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }
  .deleteCardModal__deleteConfirm {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .deleteCardModal__modalTitle {
    text-align: center;
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    @media ${props => props.theme.mediaQuery.medium} {
      margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
        ${props => props.theme.spacing.ELEM_SPACING.XL};
      padding: 0;
      text-align: initial;
    }
  }
`;

export default deleteCardModalStyle;
