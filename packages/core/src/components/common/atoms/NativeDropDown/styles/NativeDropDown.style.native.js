import styled from 'styled-components';

const PickerView = styled.View`
  background: ${props => props.theme.colorPalette.text.lightgray};
  width: 100%;
  position: absolute;
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  bottom: 0;
`;

const AndroidPickerView = styled.View`
  background: ${props => props.theme.colorPalette.text.lightgray};
  width: ${props => props.width || '35%'};
`;

const SafeAreaViewStyle = styled.SafeAreaView`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalOutsideTouchable = styled.TouchableWithoutFeedback`
  flex: 1;
  background: #ff0000;
`;

const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
`;

const NativeButtonStyledView = styled.View`
  align-items: flex-end;
  background: ${props => props.theme.colorPalette.white};
  padding-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
`;

const iOSPickerButtonStyle = {
  fontSize: 16,
  lineHeight: 0,
};

export {
  Container,
  PickerView,
  SafeAreaViewStyle,
  ModalOutsideTouchable,
  ModalOverlay,
  AndroidPickerView,
  iOSPickerButtonStyle,
  NativeButtonStyledView,
};
