import { css } from 'styled-components';

const CouponDetailModalStyle = css`
  @media ${props => props.theme.mediaQuery.medium} {
    margin: 0 60px;
  }

  .couponModal_btnWrapper {
    width: 225px;
    margin: 0 auto;
  }
  .couponModal_btn {
    display: block;
    font-weight: ${props => props.theme.fonts.fontWeight.normal};
    width: 100%;
  }
  .couponModal_addressToDelete {
    margin: 0 ${props => props.theme.spacing.LAYOUT_SPACING.XL}
      ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    display: block;
    word-break: break-word;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: 0;
      margin-right: 0;
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }
  }
  .couponModal_applyToBag {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .couponModal_modalTitle {
    text-align: center;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    font-size: ${props => props.theme.typography.fontSizes.fs40};
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0;
      text-align: center;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin-bottom: 0;
    }
  }
  .couponModal_modalSubTitle {
    text-align: center;
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    font-size: ${props => props.theme.typography.fontSizes.fs22};
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0;
      text-align: center;
    }
  }
  .couponModal_modalbarcode {
    color: ${props => props.theme.colors.BLACK};
    border-top: 1px solid ${props => props.theme.colorPalette.gray[500]};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    text-align: center;
    width: 100%;
    svg {
      width: 50%;
      height: 80px;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      svg {
        height: 64px;
      }
    }
  }
  .couponModal_print {
    text-align: center;
  }
  .couponModal_print_anchor {
    color: ${props => props.theme.colors.ANCHOR.SECONDARY};
  }

  .couponModal_print_anchortext {
    color: ${props => props.theme.colors.ANCHOR.PRIMARY};
  }
  .couponModal_modalLongDesc {
    text-align: left;
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    color: ${props => props.theme.colors.BLACK};
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0px;
  }
  .couponModal_modalShortDesc {
    text-align: left;
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    color: ${props => props.theme.colors.BLACK};
    margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0px
      ${props => props.theme.spacing.ELEM_SPACING.MED} 0px;
  }
`;

export default CouponDetailModalStyle;
