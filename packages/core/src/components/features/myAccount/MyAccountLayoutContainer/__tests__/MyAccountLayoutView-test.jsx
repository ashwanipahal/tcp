import { shallow } from 'enzyme';
import React from 'react';
import { MyAccountLayoutView } from '../views/MyAccountLayout.view';
import navData from '../MyAccountNavData';

describe('My Account Layout View', () => {
  it('should render MyAccountLayoutView Correctly', () => {
    const mainContent = jest.fn();
    const router = {
      asPath: '/account',
    };
    const tree = shallow(
      <MyAccountLayoutView mainContent={mainContent} navData={navData} router={router} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('should not render any links if navData is empty', () => {
    const mainContent = jest.fn();
    const router = {
      asPath: '/account',
    };
    const tree = shallow(
      <MyAccountLayoutView mainContent={mainContent} navData={[]} router={router} />
    );
    expect(tree.find('li')).toHaveLength(0);
    expect(tree).toMatchSnapshot();
  });
  it('should render only 2  links if navData has 2 links', () => {
    const data = [
      {
        id: 'myWallet',
        url: '/myWalletPage',
        displayName: 'My Wallet',
        component: 'myWalletPage',
      },
      {
        id: 'earnExtraPoints',
        url: '/earnExtraPointsPage',
        displayName: 'Earn Extra Points',
        component: 'earnExtraPointsPage',
      },
    ];
    const mainContent = jest.fn();
    const router = {
      asPath: '/account',
    };
    const tree = shallow(
      <MyAccountLayoutView mainContent={mainContent} navData={data} router={router} />
    );
    expect(tree.find('li')).toHaveLength(2);
    expect(tree).toMatchSnapshot();
  });
});
