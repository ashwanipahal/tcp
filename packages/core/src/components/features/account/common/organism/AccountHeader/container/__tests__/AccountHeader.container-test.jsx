import React from 'react';
import { shallow } from 'enzyme';
import { AccountHeaderContainer } from '../AccountHeader.container';
import AccountHeaderComponent from '../../views/AccountHeader.view';

const labels = {
  accountOverview: {
    referred: [
      {
        name: 'overviewRewardsPointsBannerPLCC',
        contentId: '12345',
      },
    ],
  },
};
describe('AccountHeader container', () => {
  it('should render AddressOverviewTile component', () => {
    const fetchRewardsPointsBannerContentSpy = jest.fn();
    const component = shallow(
      <AccountHeaderContainer
        labels={labels}
        fetchRewardsPointsBannerContent={fetchRewardsPointsBannerContentSpy}
      />
    );
    expect(component.is(AccountHeaderComponent)).toBeTruthy();
  });
});
