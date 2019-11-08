import NAVIGATION from '../NavigationService';

describe('#Added to bag Selectors', () => {
  const navigator = {};
  it('#setTopLevelNavigator', () => {
    const navigatorRef = {};
    expect(NAVIGATION.setTopLevelNavigator(navigatorRef)).toEqual(navigator);
  });
});
