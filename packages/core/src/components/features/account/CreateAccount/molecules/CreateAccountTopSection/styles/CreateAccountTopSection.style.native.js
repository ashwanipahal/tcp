import styled, { css } from 'styled-components/native';

const getPageStyle = props => {
  const { theme } = props;
  return `
   margin: auto  ${theme.spacing.APP_LAYOUT_SPACING.SM};
  justify-content: ${'center'};

  `;
};
const SectionStyle = css`
  ${getPageStyle}
`;

const CenterAlignWrapper = styled.View`
  display: flex;
  justify-content: ${'center'};
  align-items: center;
`;

const LabelsWrapper = styled.View`
  display: flex;
  justify-content: ${'center'};
  align-items: center;
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const TextAlignCenter = styled.Text`
  text-align: center;
`;

const ViewAlignCenter = styled.View`
  text-align: center;
`;

const TopSectionWrapper = styled.View`
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

const PointsWrapper = styled.View`
  padding-top: 10px;
`;

const ResetWrapper = styled.View`
  padding-top: 10px;
`;

export {
  SectionStyle,
  CenterAlignWrapper,
  LabelsWrapper,
  TextAlignCenter,
  TopSectionWrapper,
  PointsWrapper,
  ResetWrapper,
  ViewAlignCenter,
};
