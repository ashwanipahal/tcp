import { css } from 'styled-components';

const styles = css`
  .cvv-field {
    position: relative;
  }

  .cvv-icon {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    position: absolute;
    right: 0;
    top: ${props => (props.cvvError ? '20%' : '27%')};
  }

  input {
    background-color: ${props =>
      props.variation === 'secondary' ? props.theme.colorPalette.gray[300] : ''};
  }

  .exp-year-field {
    margin-right: auto;
  }
`;

export default styles;
