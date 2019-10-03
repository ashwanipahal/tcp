import { css } from 'styled-components';

const Styles = css`
  .alignCenter {
    text-align: center;
  }
  .backgroundWhite {
    background: ${props => props.theme.colors.WHITE};
  }
  .colorOrange {
    color: ${props => props.theme.colorPalette.orange[800]};
  }
  .spaceBetween {
    display: flex;
    place-content: space-between;
  }
  .loyaltyBannerSectionWrapper {
    border-top: 5px solid ${props => props.theme.colorPalette.orange[800]};
    border-bottom: 5px solid ${props => props.theme.colorPalette.orange[800]};
  }
  .subtotalPointsSection {
    border-top: 1px solid ${props => props.theme.colorPalette.gray[300]};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[300]};
  }
  .currentSubtotalText,
  .estimatedSubtotalText {
    color: ${props => props.theme.colorPalette.gray[800]};
  }
  .currentSubtotalValCol,
  .estimatedSubtotalValCol {
    text-align: right;
  }
`;

export default Styles;
