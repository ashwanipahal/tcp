import { css } from 'styled-components';

const styles = css`
  .addressBook__separator {
    border-bottom: 3px solid ${props => props.theme.colors.BLACK};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }

  .addressBook__row--marginBottom {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
`;

export default styles;
