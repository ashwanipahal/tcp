import { css } from 'styled-components';

const styles = css`
  ${props =>
    props.borderBottom
      ? `@media ${props.theme.mediaQuery.medium}{
          border-bottom: 1px solid ${props.theme.colorPalette.gray[500]};
          padding-bottom: ${props.theme.spacing.ELEM_SPACING.XL}};

        }
          margin-bottom: ${props.theme.spacing.ELEM_SPACING.XL}`
      : `margin-bottom: ${props.theme.spacing.ELEM_SPACING.XL}`};
  input {
    background-color: ${props =>
      props.variation === 'secondary' ? props.theme.colorPalette.gray[300] : ''};
  }
  .phone-field-wrapper {
    position: relative;
  }
  .phone-prefix {
    position: absolute;
    top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    z-index: 0;
  }
  .phone-field {
    left: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  }
  .send-order-update {
    display: flex;
  }
`;

export default styles;
