import styled from 'styled-components/native';

const ModalHeading = styled.Text`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const ModalViewWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  height: 600px;
`;

const LineWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const CardDescription = styled.Text`
  text-align: center;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const CardDetailWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const CardDetail = styled.Text`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const ImgWrapper = styled.View`
  flex-basis: 20%;
  height: 55px;
`;

const ImageStyle = styled.Image`
  max-width: 100%;
  max-height: 100%;
`;

const CenterAlign = styled.View`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ConfirmButtonWrapper = styled.View`
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
`;

const CloseButtonWrapper = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export {
  ModalHeading,
  ModalViewWrapper,
  LineWrapper,
  CardDescription,
  CardDetailWrapper,
  CardDetail,
  ImgWrapper,
  ImageStyle,
  CenterAlign,
  ConfirmButtonWrapper,
  CloseButtonWrapper,
};
