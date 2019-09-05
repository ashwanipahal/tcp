import { css } from 'styled-components';

const styles = css`
  border: 1px solid ${props => props.theme.colorPalette.gray[500]};
  height: 100%;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    box-sizing: border-box;
  }

  .overlap {
    z-index: 9;
  }

  @media ${props => props.theme.mediaQuery.smallOnly} {
    .overlay {
      display: flex;
      align-items: center;
      color: #fff;
      background-color: #000;
      opacity: 0.8;
      z-index: 1;
      justify-content: center;
    }
  }

  .couponDetailsFont {
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
  }

  .top-content {
    display: flex;
    flex-direction: column;
    align-items: center;
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
