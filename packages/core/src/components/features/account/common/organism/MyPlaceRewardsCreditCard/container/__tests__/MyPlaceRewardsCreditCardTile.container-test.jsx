import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { MyPlaceRewardsCreditCardTile } from '../MyPlaceRewardsCreditCardTile.container';
import MyPlaceRewardsCreditCardTileComponent from '../../views/MyPlaceRewardsCreditCardTile.view';

describe('PaymentOverviewTile container', () => {
  it('should render PaymentOverviewTile components', () => {
    const obj = new List();
    const component = shallow(
      <MyPlaceRewardsCreditCardTile cardList={obj} labels={{ accountOverview: {} }} />
    );
    expect(component.is(MyPlaceRewardsCreditCardTileComponent)).toBeTruthy();
  });
});
