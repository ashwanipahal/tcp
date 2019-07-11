import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../../core/styles/themes/colors/common';

const { paleWhite } = colors;

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: -20,
    position: 'absolute',
  },
  crossIconFinalState: {
    alignItems: 'center',
    backgroundColor: paleWhite,
    borderRadius: 35,
    display: 'flex',
    height: 66,
    justifyContent: 'center',
    width: 66,
  },
  firstIconFinalState: {
    bottom: 66,
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
    bottom: 66,
    position: 'absolute',
    right: -Dimensions.get('window').width / 6,
  },
});

export default styles;
