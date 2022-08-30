import { css } from 'styled-components';

const styles = css`
  width: 100%;
  .header {
    display: flex;
    justify-content: flex-start;
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  }
  .EditAnchor {
    margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
    align-self: flex-end;
  }
  .contactBody {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  }
`;

export default styles;
