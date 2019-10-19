import styled from 'styled-components/native';

const plccMpr = props =>
  props.isPlcc ? props.theme.colorPalette.userTheme.plcc : props.theme.colorPalette.userTheme.mpr;

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

const LearnMoreWrapper = styled.View`
  padding-left: 30px;
`;

export { LineStyle, FooterLinksSection, LearnMoreWrapper };
