import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../../core/styles/themes/colors/common';

const { paleWhite } = colors;

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  crossIconFinalState: {
    alignItems: 'center',
    backgroundColor: paleWhite,
    borderRadius: 35,
    display: 'flex',
    height: 70,
    justifyContent: 'center',
    width: 70,
  },
  firstIconFinalState: {
    bottom: 70,
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
    height: 70,
    width: 70,
  },
  logoHidden: {
    height: 0,
    width: 0,
  },
  secondIconFinalState: {
    bottom: 70,
    position: 'absolute',
    right: -Dimensions.get('window').width / 6,
  },
});

export default styles;
