import styled from 'styled-components/native';

const HeadingTextStyle = styled.Text`
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  font-size: ${props => props.theme.typography.fontSizes.fs16};
  font-weight: 600;
`;

const WrapperStyle = styled.View`
  display: flex;
  flex-direction: row;
`;

const ImgWrapper = styled.View`
  flex-basis: 20%;
  height: 55px;
`;

const ImageStyle = styled.Image`
  max-width: 100%;
  max-height: 100%;
`;

const EmptyCCLabelStyle = styled.Text`
  flex-basis: 80%;
  font-size: ${props => props.theme.typography.fontSizes.fs14};
  font-weight: bold;
  top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const DescriptionEmptyCCStyle = styled.Text`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const ButtonWrapperStyle = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

export {
  HeadingTextStyle,
  WrapperStyle,
  ImgWrapper,
  ImageStyle,
  EmptyCCLabelStyle,
  DescriptionEmptyCCStyle,
  ButtonWrapperStyle,
};
