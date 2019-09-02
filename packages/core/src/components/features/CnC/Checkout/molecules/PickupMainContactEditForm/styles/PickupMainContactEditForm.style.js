import { css } from 'styled-components';

const styles = css`
  width: 100%;
  .header {
    display: flex;
    justify-content: flex-start;
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  }
  .EditAnchor {
    margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
    align-self: flex-end;
  }

  .pickupModalHeader {
    display: flex;
    justify-content: flex-start;
    font-size: 18px;
    font-weight: 800;
    color: ${props => props.theme.colors.PRIMARY.DARK};
    border-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS} solid
      ${props => props.theme.colorPalette.black};
    padding-bottom: 15px;
  }
  .saveUpdateButton {
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  }
  .PickupModal,
  .pick-up-overlay {
    z-index: 10;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
  .anchorStyle {
    color: ${props => props.theme.colors.ANCHOR.PRIMARY};
  }
`;

export default styles;
