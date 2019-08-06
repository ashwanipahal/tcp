import { css } from 'styled-components';

const styles = css`
  display: flex;
  flex-direction: column;

  .couponList__title {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .couponList__iconContainer {
    display: flex;
    flex-direction: row;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .couponList__helpIcon {
    text-align: center;
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    background: ${props => props.theme.colors.PRIMARY.GREEN};
    color: ${props => props.theme.colors.WHITE};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.MED};
    width: ${props => props.theme.spacing.ELEM_SPACING.MED};
    height: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
`;

export default styles;
