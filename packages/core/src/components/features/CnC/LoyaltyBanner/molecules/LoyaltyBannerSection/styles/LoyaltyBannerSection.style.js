import { css } from 'styled-components';

const plccMpr = props =>
  props.isPlcc ? props.theme.colorPalette.userTheme.plcc : props.theme.colorPalette.userTheme.mpr;

const Styles = css`
  .alignCenter {
    text-align: center;
  }
  .backgroundWhite {
    background: ${props => props.theme.colors.WHITE};
  }
  .colorOrangeBlue {
    color: ${plccMpr};
  }
  .spaceBetween {
    display: flex;
    place-content: space-between;
  }
  .loyaltyBannerSectionWrapper {
    border-top: 5px solid ${plccMpr};
    border-bottom: 5px solid ${plccMpr};
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
