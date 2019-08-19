import styled, { css } from 'styled-components/native';

const ParentContainerStyle = css``;

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

const ModalHeading = styled.Text`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

const ModalViewWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
`;

const LineWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
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
  ModalHeading,
  ModalViewWrapper,
  LineWrapper,
};
