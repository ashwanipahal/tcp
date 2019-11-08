import React from 'react';
import { shallow } from 'enzyme';
import { MyPlaceRewardsCreditCardContainerVanilla } from '../MyPlaceRewardsCreditCard.container';
import MyPlaceRewardsCreditCard from '../../views';

describe('MyPlaceRewardsCreditCardContainer component', () => {
  it('should renders correctly', () => {
    const component = shallow(
      <MyPlaceRewardsCreditCardContainerVanilla
        labels={{}}
        isPLCCModalOpen={false}
        openPLCCModal={jest.fn()}
        openApplyNowModal={jest.fn()}
      />
    );
    expect(component.is(MyPlaceRewardsCreditCard)).toBeTruthy();
  });
});
