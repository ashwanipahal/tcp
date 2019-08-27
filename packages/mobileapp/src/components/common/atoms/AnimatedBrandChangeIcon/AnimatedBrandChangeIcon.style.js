import { StyleSheet } from 'react-native';
import styled from 'styled-components';

const styles = StyleSheet.create({
  firstIconFinalState: {
    bottom: 90,
    right: 20,
  },
  logo: {
    borderRadius: 35,
    height: 66,
    width: 66,
  },
  logoHidden: {
    borderRadius: 35,
    height: 0,
    width: 0,
  },
  secondIconFinalState: {
    bottom: 90,
    left: 20,
  },
});

const Container = styled.TouchableOpacity`
  align-items: flex-end;
  background: transparent;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export { styles, Container };
