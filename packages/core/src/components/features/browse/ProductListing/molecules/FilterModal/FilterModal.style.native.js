import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';

const Container = styled.View`
  width: 100%;
`;

const SafeAreaViewStyle = styled.SafeAreaView`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalOutsideTouchable = styled.TouchableWithoutFeedback`
  flex: 1;
  background: #ff0000;
`;

const ModalCloseTouchable = styled.TouchableOpacity`
  position: absolute;
  right: 26;
`;

const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  background: ${props => props.theme.colorPalette.white};
  width: 100%;
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const SortContent = styled.View`
  background: ${props => props.theme.colorPalette.text.lightgray};
  width: 100%;
  padding-bottom: ${Platform.OS === 'ios' ? props => props.theme.spacing.ELEM_SPACING.LRG : '0'};
  position: absolute;
  bottom: ${Platform.OS === 'ios' ? '0' : '50%'};
`;

const ModalTitleContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20;
`;

const ModalTitle = styled.Text`
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-size: ${props => props.theme.typography.fontSizes.fs14};
  color: ${props => props.theme.colorPalette.gray[900]};
  line-height: 16.8;
  font-weight: ${props => props.theme.typography.fontWeights.black};
`;

// margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
const styles = css``;

export {
  styles,
  Container,
  ModalTitle,
  ModalTitleContainer,
  SafeAreaViewStyle,
  ModalOutsideTouchable,
  ModalOverlay,
  ModalContent,
  ModalCloseTouchable,
  SortContent,
};
