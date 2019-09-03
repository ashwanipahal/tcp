import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  .address-form {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }
  }
  .email-signup-container {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .emailSignupText {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  }

  .shipment-methods-form {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
`;

export default styles;
