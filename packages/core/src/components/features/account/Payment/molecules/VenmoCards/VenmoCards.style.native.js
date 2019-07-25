import styled, { css } from 'styled-components/native';

const ParentContainerStyle = css``;

const HeadingTextStyle = styled.Text`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  font-size: ${props => props.theme.typography.fontSizes.fs16};
  font-weight: 600;
`;

export { ParentContainerStyle, HeadingTextStyle };
