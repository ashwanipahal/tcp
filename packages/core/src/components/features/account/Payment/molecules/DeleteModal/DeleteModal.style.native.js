import styled, { css } from 'styled-components/native';

const Style = css``;

const ModalHeading = styled.Text`
  margin-top: -120px;
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
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const CardDetailWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const CardContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const CardDetail = styled.Text`
  justify-content: flex-start;
  font-size: ${props => props.theme.typography.fontSizes.fs14};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
`;

const CardExpiry = styled.Text`
  justify-content: flex-start;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  font-size: ${props => props.theme.typography.fontSizes.fs13};
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
  Style,
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
  CardContainer,
  CardExpiry,
};
