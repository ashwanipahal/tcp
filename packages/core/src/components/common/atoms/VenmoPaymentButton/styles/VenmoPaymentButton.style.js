import { css } from 'styled-components';

const styles = css`
  .venmo-button {
    background-color: ${props =>
      props.isVenmoBlueButton ? props.theme.colors.VENMO_BLUE : props.theme.colors.WHITE};
    width: 100%;
    height: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    border-radius: ${props =>
      props.theme.isGymboree
        ? props.theme.spacing.ELEM_SPACING.LRG
        : props.theme.spacing.ELEM_SPACING.XXS};
    border: 1px solid ${props => props.theme.colorPalette.gray[600]};
  }

  .venmo-button-image {
    width: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
    height: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  }

  .venmo-continue-text {
    text-align: center;
    margin: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
`;

export default styles;
