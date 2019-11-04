import { css } from 'styled-components';

const styles = css`
  .confirmation-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
  .placeholder {
    background: ${props => props.theme.colorPalette.white};
    padding: 20px 0;
    margin-bottom: 16px;
    text-align: center;
  }
  .loyalty-banner {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: none;
    }
  }

  .sms-sign-up {
    height: 50px;
  }
`;

export default styles;
