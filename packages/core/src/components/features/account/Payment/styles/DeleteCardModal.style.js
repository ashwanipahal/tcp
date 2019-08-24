import { css } from 'styled-components';

const deleteCardModalStyle = css`
  @media ${props => props.theme.mediaQuery.medium} {
    margin: 0 ${props => props.theme.spacing.ELEM_SPACING.XXL};
  }
  @media ${props => props.theme.mediaQuery.smallOnly} {
    .deleteCardModal__card {
      display: block;
    }
  }
  .deleteCardModal__venmoDesc {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .deleteCardModal__card {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.mediaQuery};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
  .deleteCardModal__cardInfo {
    width: 85%;
    padding-left: 0px;
    @media ${props => props.theme.mediaQuery.medium} {
      width: 55%;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      width: 100%;
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
  .deleteCardModal__expiry {
    float: right;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      float: none;
    }
  }
  .deleteCardModal__btnWrapper {
    padding-top: 20px;
    clear: both;
    text-align: center;
  }
  .deleteCardModal__btn {
    display: inline-block;
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    float: none;
    width: 60%;
    letter-spacing: ${props => props.theme.fonts.letterSpacing.medium};
    @media ${props => props.theme.mediaQuery.medium} {
      float: right;
      width: 40%;
    }
  }
  .deleteCardModal__deleteCancel {
    float: none;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      padding: 12px 24px;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      min-height: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }
  }
  .deleteCardModal__desc {
    text-align: center;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin: 0 auto;
      width: 100%;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      min-height: 120px;
    }
  }
  .deleteCardModal__venmo_desc {
    display: flex;
    justify-content: center;
  }
  .deleteCardModal__img {
    width: 90px;
    height: 56px;
    float: left;
    margin-left: 42px;
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      width: 98px;
      height: 61px;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      width: 61px;
      height: 38px;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      float: none;
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
    @media ${props => props.theme.mediaQuery.medium} {
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      padding: 12px 24px;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      min-height: 51px;
    }
  }
  .deleteCardModal__modalTitle {
    text-align: center;
    font-size: ${props => props.theme.typography.fontSizes.fs18};
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXL};
      margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
        ${props => props.theme.spacing.ELEM_SPACING.XL};
      text-align: center;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin: ${props => props.theme.spacing.ELEM_SPACING.MED} auto;
      width: 50%;
    }
  }
  .deleteCreditModal__card__icon {
    height: 56px;
    border: 1px solid ${props => props.theme.colorPalette.gray[500]};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
`;

export default deleteCardModalStyle;
