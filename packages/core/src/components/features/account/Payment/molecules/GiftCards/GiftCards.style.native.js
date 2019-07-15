import styled, { css } from 'styled-components/native';

const ParentContainerStyle = css``;

const HeadingTextStyle = styled.Text`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const WrapperStyle = styled.View`
  display: flex;
  flex-direction: row;
`;

const ImgWrapper = styled.View`
  width: 75px;
  height: 55px;
`;

const ImageStyle = styled.Image`
  max-width: 100%;
  max-height: 100%;
`;

const EmptyCCLabelStyle = styled.Text`
  width: 270px;
  height: 55px;
  top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const DescriptionEmptyCCStyle = styled.Text`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const ButtonWrapperStyle = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export {
  ParentContainerStyle,
  HeadingTextStyle,
  WrapperStyle,
  ImgWrapper,
  ImageStyle,
  EmptyCCLabelStyle,
  DescriptionEmptyCCStyle,
  ButtonWrapperStyle,
};
