import styled, { css } from 'styled-components/native';

const ParentContainerStyle = css``;

const HeadingTextStyle = styled.Text`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  font-size: ${props => props.theme.typography.fontSizes.fs16};
  font-weight: 600;
  font-family: ${props => props.theme.typography.fonts.secondary};
`;

const WrapperStyle = styled.View`
  display: flex;
  flex-direction: row;
`;

const EmptyCCLabelStyle = styled.Text`
  flex-basis: 80%;
  font-size: ${props => props.theme.typography.fontSizes.fs14};
  font-weight: bold;
  top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  font-family: ${props => props.theme.typography.fonts.secondary};
`;

const DescriptionEmptyCCStyle = styled.Text`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  font-family: ${props => props.theme.typography.fonts.secondary};
`;

const ButtonWrapperStyle = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

export {
  ParentContainerStyle,
  HeadingTextStyle,
  WrapperStyle,
  EmptyCCLabelStyle,
  DescriptionEmptyCCStyle,
  ButtonWrapperStyle,
};
