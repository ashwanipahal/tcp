import styled, { css } from 'styled-components';

const plccMpr = props =>
  props.isPlcc ? props.theme.colorPalette.userTheme.plcc : props.theme.colorPalette.userTheme.mpr;

const Styles = css`
  padding: 2px;
`;

const LoyaltyBannerContainer = styled.View`
  padding: 12px 14px;
  background: ${props => props.theme.colors.WHITE};
`;

const LineStyle = styled.View`
  border-width: 2px;
  border-color: ${plccMpr};
`;

const FooterLinksSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 12px 0;
`;

export { Styles, LoyaltyBannerContainer, LineStyle, FooterLinksSection };
