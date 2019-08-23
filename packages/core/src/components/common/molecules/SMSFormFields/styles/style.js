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
  }
  input {
    background-color: ${props =>
      props.variation === 'secondary' ? props.theme.colorPalette.gray[300] : ''};
  }
  .phone-field-wrapper {
    position: relative;
  }
  .phone-prefix {
    position: absolute;
    top: 23px;
    z-index: 1;
  }
  .phone-field {
    left: 30px;
  }
`;

export default styles;
