import NAVIGATION from '../NavigationService';

describe('#Added to bag Selectors', () => {
  it('#setTopLevelNavigator', () => {
    const navigatorRef = {};
    expect(NAVIGATION.setTopLevelNavigator(navigatorRef)).toBeUndefined();
  });
});
