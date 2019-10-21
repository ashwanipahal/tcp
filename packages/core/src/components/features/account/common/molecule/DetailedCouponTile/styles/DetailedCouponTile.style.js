import { css } from 'styled-components';

const styles = css`
  border: 1px solid
    ${props =>
      props.coupon.error ? props.theme.colorPalette.red[500] : props.theme.colorPalette.gray[500]};
  position: relative;
  width: 100%;
  .notification {
    background-color: ${props => props.theme.colorPalette.gray[800]};
    color: ${props => props.theme.colorPalette.white};
    position: absolute;
    top: 0;
    width: 100%;
  }

  .content {
    display: grid;
    min-height: 320px;
    box-sizing: border-box;
  }

  .coupon {
    margin: 0 auto 8px;
  }
  .overlap {
    z-index: 9;
  }

  .overlay {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    color: ${props => props.theme.colorPalette.white};
    background-color: ${props => props.theme.colors.REWARDS_OVERLAY};
    z-index: 1;
    justify-content: center;
  }
  .overlay__content {
    flex: none;
    width: 100%;
    text-align: center;
  }
  .overlap-text {
    color: ${props => props.theme.colorPalette.white};
  }

  .couponDetailsFont {
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
  }

  .top-content {
    align-self: flex-start;
  }

  .bottom-content {
    align-self: flex-end;
  }

  .coupon-desc {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .barcode-content {
    width: 100%;

    svg {
      width: 100%;
    }
  }
`;

export default styles;
