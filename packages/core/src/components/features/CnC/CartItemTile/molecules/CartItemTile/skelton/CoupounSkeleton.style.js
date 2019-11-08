import { css } from 'styled-components';

export default css`
  border-bottom: 2px solid ${props => props.theme.colorPalette.gray[300]};
  background: ${props => props.theme.colors.WHITE};

  .skeletonStyle {
    margin-top: 16px;
    width: 258px;
    height: 96px;
    margin-bottom: 20px;
  }
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
    line-height: ${props => props.theme.spacing.ELEM_SPACING.MED};
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    background: ${props => props.theme.colors.PRIMARY.GREEN};
    color: ${props => props.theme.colors.WHITE};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.MED};
    width: ${props => props.theme.spacing.ELEM_SPACING.MED};
    height: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
