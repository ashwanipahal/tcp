import styled from 'styled-components/native';

import { BodyCopy, Image, Anchor } from '../../../../../../../common/atoms';

export const ImageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  align-items: center;
`;

export const StyledImage = styled(Image)`
  /* stylelint-disable-next-line */
  resize-mode: stretch;
`;

export const Container = styled.View`
  width: 100%;
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  align-items: center;
`;

export const TextBoxContainer = styled.View`
  width: 100%;

  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const StyledBodyCopy = styled(BodyCopy)`
  padding-top: ${props => props.paddingTop || '0px'};
  padding-left: ${props => props.paddingLeft || '0px'};
  padding-right: ${props => props.paddingRight || '0px'};
  padding-bottom: ${props => props.paddingBottom || '0px'};
`;

export const NameFieldContainer = styled.View`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const ContainerView = styled.View`
  width: 100%;
  flex-direction: row;
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const StateContainerView = styled.View`
  width: 50%;
  padding-right: 20px;
`;

export const ZipContainerView = styled.View`
  width: 50%;
`;

export const MessageViewContainer = styled.View`
  height: ${props => props.height};
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const PersonalInformationContainerView = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  height: 40px;
`;

export const DateContainerView = styled.View`
  width: 32%;
  padding-right: 15px;
`;

export const DropDownContainer = styled.View`
  width: 85px;
  height: 70px;
  margin-top: -5px;
`;

export const ScrollViewContainer = styled.ScrollView`
  margin-bottom: 40px;
`;

export const CheckBoxContainerView = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const CheckBoxImage = styled.View`
  width: 40px;
  height: 40px;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const CheckMessageView = styled.View`
  width: 80%;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

export const RichTextContainer = styled.View`
  width: 100%;
  height: 560px;
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const StyledAnchor = styled(Anchor)`
  padding-top: ${props => props.paddingTop || '0px'};
  padding-left: ${props => props.paddingLeft || '0px'};
  padding-right: ${props => props.paddingRight || '0px'};
  padding-bottom: ${props => props.paddingBottom || '0px'};
  align-items: center;
  justify-content: center;
`;

export const PreScreenCodeContainer = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: -20px;
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const ParentMessageContainer = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const FirstNameContainer = styled.View`
  width: 70%;
`;

export const MiddleNameContainer = styled.View`
  width: 30%;
  padding-left: 19px;
`;

export const FieldContainer = styled.View`
  margin-top: 12px;
`;

export const SSNContainer = styled.View`
  padding-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const AddressLine1Container = styled.View`
  margin-top: -23px;
  margin-bottom: 20px;
`;

export default {
  ImageContainer,
  StyledBodyCopy,
  NameFieldContainer,
  TextBoxContainer,
  ContainerView,
  StateContainerView,
  ZipContainerView,
  MessageViewContainer,
  DateContainerView,
  ScrollViewContainer,
  CheckBoxContainerView,
  CheckBoxImage,
  CheckMessageView,
  ButtonWrapper,
  RichTextContainer,
  StyledAnchor,
  PreScreenCodeContainer,
  ParentMessageContainer,
  FirstNameContainer,
  MiddleNameContainer,
  FieldContainer,
  SSNContainer,
  AddressLine1Container,
  DropDownContainer,
};
