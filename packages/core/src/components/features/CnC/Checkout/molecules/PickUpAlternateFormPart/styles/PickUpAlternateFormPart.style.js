import { css } from 'styled-components';

const styles = css`
  width: 100%;
  .alterSubText {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .alterNativeSubText {
    margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
  }
`;

export default styles;
