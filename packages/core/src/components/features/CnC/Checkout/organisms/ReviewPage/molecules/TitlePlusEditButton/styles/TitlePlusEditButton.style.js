import { css } from 'styled-components';

const styles = css`
  .header {
    display: flex;
    flex-direction: 'row';
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .EditAnchor {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    align-self: flex-end;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  }
  .anchorStyle {
    font-size: ${props => props.theme.spacing.ELEM_SPACING.SM};
    color: ${props => props.theme.colors.ANCHOR.PRIMARY};
  }
`;

export default styles;
