import styled, { css } from 'styled-components/native';

const ParentContainer = css`
  margin-bottom: 120px;
`;

const StyledHeading = styled.Text`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const UnderlineStyle = styled.View`
  height: 3px;
  background-color: ${props => props.theme.colorPalette.black};
`;

const ModalHeading = styled.Text`
  margin-top: -130px;
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const ModalViewWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const LineWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const CardDescription = styled.Text`
  text-align: center;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
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

const ConfirmButtonWrapper = styled.View`
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
`;

const CloseButtonWrapper = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export {
  ParentContainer,
  StyledHeading,
  UnderlineStyle,
  ModalHeading,
  ModalViewWrapper,
  LineWrapper,
  CardDescription,
  CardDetailWrapper,
  CardDetail,
  ImgWrapper,
  ImageStyle,
  ConfirmButtonWrapper,
  CloseButtonWrapper,
};
