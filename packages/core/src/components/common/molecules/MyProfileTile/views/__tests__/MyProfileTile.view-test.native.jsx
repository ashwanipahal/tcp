import React from 'react';
import { shallow } from 'enzyme';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import { MyProfileTile } from '../MyProfileTile.view.native';

describe('MyProfileTile', () => {
  it('should render correctly when all props are present', () => {
    const wrapper = shallow(
      <MyProfileTile title="Test" ctaTitle="Test CTA" ctaLink="accountOverviewMobile" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when title and ctaTitle is not passed', () => {
    const wrapper = shallow(<MyProfileTile />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should not render Button if ctaTitle is not present', () => {
    const wrapper = shallow(<MyProfileTile title="Test" />);

    expect(wrapper.find(CustomButton).exists()).toBeFalsy();
  });
});
