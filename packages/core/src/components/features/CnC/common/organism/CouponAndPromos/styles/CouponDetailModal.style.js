import { css } from 'styled-components';

const CouponDetailModalStyle = css`
  @media ${props => props.theme.mediaQuery.medium} {
    margin: 0 80px;
  }

  .couponModal_btnWrapper {
    width: 170px;
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
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    font-size: ${props => props.theme.typography.fontSizes.fs42};
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0;
      text-align: center;
    }
  }
  .couponModal_modalSubTitle {
    text-align: center;
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    font-size: ${props => props.theme.typography.fontSizes.fs22};
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0;
      text-align: center;
    }
  }
  .couponModal_modalbarcode {
    color: ${props => props.theme.colors.BLACK};
    border-top: 1px solid ${props => props.theme.colors.PRIMARY.GRAY};
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0px;
    border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.GRAY};
    text-align: center;
  }
  .couponModal_print {
    text-align: center;
  }
  .couponModal_print_anchor {
    color: ${props => props.theme.colors.BRAND.PRIMARY};
  }
  .couponModal_modalLongDesc {
    text-align: left;
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    color: ${props => props.theme.colors.BLACK};
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0px;
  }
`;

export default CouponDetailModalStyle;
