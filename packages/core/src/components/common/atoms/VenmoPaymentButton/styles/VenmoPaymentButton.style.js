import { css } from 'styled-components';

const styles = css`
  .venmo-button {
    background-color: ${props => props.theme.colors.VENMO};
    width: 100%;
    height: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    margin: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    border: 0;
  }
`;

export default styles;
