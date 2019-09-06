import styled, { css } from 'styled-components/native';

const Container = styled.View`
  flex: 1;
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

const ModalContent = styled.View`
  background: #ffffff;
  width: 100%;
  padding-top: 100;
  height: 66%;
  border: 1px solid #ff0000;
`;

// margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
const styles = css``;

export { styles, Container, SafeAreaViewStyle, ModalOutsideTouchable, ModalOverlay, ModalContent };
