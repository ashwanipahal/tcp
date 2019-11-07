import { NavigationActions, StackActions } from 'react-navigation';

let navigator;

const setTopLevelNavigator = navigatorRef => {
  navigator = navigatorRef;
};

const navigateToProductPage = params => {
  setTimeout(() => {
    navigator.dispatch(
      StackActions.reset({
        index: 2,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({ routeName: 'Bag' }),
          NavigationActions.navigate({
            routeName: 'Bag',
            action: NavigationActions.navigate({ routeName: 'BagProductDetail', params }),
          }),
        ],
      })
    );
  }, 10000);
};

export default {
  navigateToProductPage,
  setTopLevelNavigator,
};
