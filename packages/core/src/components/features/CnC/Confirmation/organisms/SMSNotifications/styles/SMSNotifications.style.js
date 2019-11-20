import { css } from 'styled-components';

const styles = css`
  background-color: ${props => props.theme.colorPalette.gray[300]};
  width: 100%;
  input {
    background-color: ${props => props.theme.colorPalette.gray[300]};
  }
  .brandWrapper {
    display: inline-flex;
    width: 100%;
    margin: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .CheckBox__text {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
  .childrenPlace {
    flex: 1;
    @media ${props => props.theme.mediaQuery.small} {
      flex: 1.3;
    }
  }
  .gymboree {
    flex: 1;
  }
  .notification-width {
    width: 100%;
  }
  .successWrapper {
    display: inline-flex;
    width: 100%;
  }
  .notification-error {
    justify-content: center;
    span {
      font-size: ${props => props.theme.typography.fontSizes.fs14};
      font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    }
  }
  && .warning-icon {
    height: ${props => props.theme.spacing.ELEM_SPACING.MED};
    width: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
`;

export default styles;
