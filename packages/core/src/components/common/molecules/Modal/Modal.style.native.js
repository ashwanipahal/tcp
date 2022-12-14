import styled from 'styled-components/native';
import { Platform } from 'react-native';

const getAdditionalStyle = props => {
  const { margins, paddings, modalHeadingMargin, childrenMargins } = props;
  return {
    ...(margins && { margin: margins }),
    ...(paddings && { padding: paddings }),
    ...(modalHeadingMargin && { margin: modalHeadingMargin }),
    ...(childrenMargins && { margin: childrenMargins }),
  };
};

const StyledCrossImage = styled.Image`
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
  ${props =>
    !props.rightAlignCrossIcon ? `margin-right: ${props.theme.spacing.ELEM_SPACING.XS}` : ''};
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  align-items: flex-end;
  padding: 0px 0px ${props => props.theme.spacing.ELEM_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.SM};
  ${props =>
    props.isOverlay
      ? `
    width: 40px;
`
      : ``}
`;

const ModalCustomWrapper = styled.SafeAreaView`
  ${props =>
    props.transparentModal === 'transparent-captcha'
      ? `
      background-color: rgba(0,0,0,.5);
`
      : ``}
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

const ModalHeading = styled.View`
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  width: ${props => (props.fullWidth ? '100%' : '80%')};
  ${props =>
    props.stickyCloseIcon
      ? `
      position: relative;
  `
      : ``};
  ${getAdditionalStyle};
`;

const LineWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

const RowWrapper = styled.View`
  margin: ${Platform.OS === 'ios' ? '0' : props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.LRG} 0
    ${props => props.theme.spacing.ELEM_SPACING.LRG};
  flex-direction: row;
  ${props =>
    props.isOverlay
      ? `
    position: absolute;
    z-index: 1;
  `
      : ``}
  ${props =>
    props.stickyCloseIcon
      ? `
      margin: 14px 14px 0 14px
      `
      : ``}
  ${props =>
    props.customHeaderMargin
      ? `
      margin: ${props.customHeaderMargin}
      `
      : ``}
`;

const ImageWrapper = styled.View`
  width: 20%;
  ${props =>
    props.stickyCloseIcon
      ? `
      position: absolute;
      right: 0;
  `
      : ``}
`;

const Heading = styled.View`
  background-color: ${props => props.theme.colors.WHITE};
`;

const ViewContainer = styled.View`
  ${getAdditionalStyle};
`;
const ScrollView = styled.ScrollView`
  ${getAdditionalStyle};
`;

const ChildrenContainer = styled.View`
  ${getAdditionalStyle};
`;

export {
  StyledCrossImage,
  ImageWrapper,
  StyledTouchableOpacity,
  ModalHeading,
  LineWrapper,
  RowWrapper,
  ModalCustomWrapper,
  Heading,
  ViewContainer,
  ScrollView,
  ChildrenContainer,
};
