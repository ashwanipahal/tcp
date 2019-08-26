import { css } from 'styled-components';

const styles = css`
  width: 100%;
  .header {
    display: flex;
    justify-content: flex-start;
    margin-top: 42px;
    margin-bottom: 28px;
  }
  .EditAnchor {
    margin-left: 26px;
    align-self: flex-end;
  }

  .pickupModalHeader {
    display: flex;
    justify-content: flex-start;
    font-size: 18px;
    font-weight: 800;
    color: #1a1a1a;
    border-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS} solid
      ${props => props.theme.colorPalette.black};
    padding-bottom: 15px;
  }
  .saveUpdateButton {
    margin-top: 42px;
  }
`;

export default styles;
