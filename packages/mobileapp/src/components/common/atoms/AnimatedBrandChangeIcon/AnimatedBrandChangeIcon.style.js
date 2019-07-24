import { StyleSheet } from 'react-native';
import styled from 'styled-components';

const styles = StyleSheet.create({
  firstIconFinalState: {
    bottom: 90,
    left: '-90%',
    position: 'absolute',
  },
  iconInitialState: {
    bottom: 0,
    left: 0,
    position: 'absolute',
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
    position: 'absolute',
    right: '-130%',
  },
});

const Container = styled.View`
  left: -20px;
`;

export { styles, Container };
