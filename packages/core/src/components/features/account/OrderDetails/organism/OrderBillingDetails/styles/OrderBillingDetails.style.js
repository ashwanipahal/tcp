import { css } from 'styled-components';

const styles = css`
  .card-details {
    display: flex;
    align-items: center;
    margin: ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
  }
  .card-border {
    border: 1px solid ${props => props.theme.colorPalette.gray[500]};
    object-fit: contain;
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
`;

export default styles;
