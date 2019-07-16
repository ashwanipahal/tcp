import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    left: -20,
  },
  firstIconFinalState: {
    bottom: 90,
    left: -Dimensions.get('window').width / 6,
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
    right: -Dimensions.get('window').width / 5,
  },
});

export default styles;
