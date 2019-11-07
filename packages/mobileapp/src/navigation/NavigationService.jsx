import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName: 'Bag',
      params: {},
      action: NavigationActions.navigate({ routeName, params }),
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator,
};
