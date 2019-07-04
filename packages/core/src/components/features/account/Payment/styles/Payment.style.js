import { css } from 'styled-components';

const styles = css`
  .payment__separator {
    border-bottom: 3px solid ${props => props.theme.colorPalette.black};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
`;

export default styles;
