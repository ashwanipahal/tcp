import { shallow } from 'enzyme';
import React from 'react';
import { MyAccountLeftNavVanilla } from '../views/MyAccountLeftNav.view';

describe('My Account Left Nav', () => {
  it('should not render any links if navData is empty', () => {
    const tree = shallow(<MyAccountLeftNavVanilla navData={[]} />);
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
    const tree = shallow(<MyAccountLeftNavVanilla navData={data} active="myWalletPage" />);
    expect(tree.find('li')).toHaveLength(data.length);
    tree.find('li a').map((node, index) => expect(node.text()).toEqual(data[index].displayName));
    expect(tree).toMatchSnapshot();
  });
  it('should render links with sub section ', () => {
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
      {
        id: 'myPlaceRewards',
        url: '/account/place-rewards',
        displayName: 'My Place Rewards',
        component: 'myPlaceRewards',
        href: '/account?id=myPlaceRewards',
        subSections: [
          {
            id: 'pointsHistory',
            url: '/account/place-rewards/points-history',
            displayName: 'Points History',
            component: 'pointsHistoryPage',
            href: '/account?id=pointsHistoryPage',
          },
        ],
      },
    ];
    const tree = shallow(<MyAccountLeftNavVanilla navData={data} active="myWalletPage" />);
    expect(tree.find('li')).toHaveLength(4);
    tree.find('li a').map((node, index) => expect(node.text()).toEqual(data[index].displayName));
    expect(tree).toMatchSnapshot();
  });
});
