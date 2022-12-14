import styled, { css } from 'styled-components/native';

const ParentContainerStyle = css``;

const HeadingTextStyle = styled.Text`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  font-size: ${props => props.theme.typography.fontSizes.fs16};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
`;

export { ParentContainerStyle, HeadingTextStyle };
