import { css } from 'styled-components';

const styles = css`
  .field {
    height: ${props => props.theme.spacing.FORM_FIELD_HEIGHT};
  }
  .accountDrawer_coupons {
    border-top: 1px solid ${props => props.theme.colorPalette.gray[600]};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[600]};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    .slick-dots {
      position: static;
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    }
  }
  .couponCard__col {
    position: relative;
  }
  .cartDetailsLink {
    left: 0;
  }
`;

export default styles;
