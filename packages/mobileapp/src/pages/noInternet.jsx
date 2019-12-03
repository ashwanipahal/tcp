import { createStackNavigator } from 'react-navigation';
import NoInternetPage from '../components/common/molecules/NoInternetPage';

const NoInternet = createStackNavigator(
  {
    NoInternetPage: {
      screen: NoInternetPage,
    },
  },
  {
    headerMode: 'none',
  }
);

export default NoInternet;
