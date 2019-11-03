import React from 'react';
import { shallow } from 'enzyme';
import { MyPlaceRewardsCreditCardTile } from '../MyPlaceRewardsCreditCardTile.view';

describe('MyPlaceRewardsCreditCardTile component', () => {
  it('should render correctly', () => {
    const component = shallow(<MyPlaceRewardsCreditCardTile />);
    expect(component).toMatchSnapshot();
  });
});
