/**
 * The following data is just for the purpose of painting the left nav in account section
 * This will change once we integrate it with cms labels
 */
// will uncomment once we have nav data story in place
const href = '/account?id=accountOverview';
const navData = [
  {
    id: 'accountOverview',
    url: '/account',
    displayName: 'Account Overview',
    component: 'accountOverview',
    href,
  },
  {
    id: 'myPlaceRewards',
    url: '/account/place-rewards',
    displayName: 'My Place Rewards',
    component: 'myPlaceRewards',
    href,
    subSections: [
      {
        id: 'pointsHistory',
        url: '/account/place-rewards/points-history',
        displayName: 'Points History',
        component: 'pointsHistoryPage',
        href,
      },
    ],
  },
  {
    id: 'myWallet',
    url: '/account/wallet',
    displayName: 'My Wallet',
    component: 'myWalletPage',
    href,
  },
  {
    id: 'earnExtraPoints',
    url: '/account/extra-points',
    displayName: 'Earn Extra Points',
    component: 'earnExtraPointsPage',
    href,
  },
  {
    id: 'profileInformation',
    url: '/account/profile',
    displayName: 'Profile Information',
    component: 'profileInformation',
    href,
  },
  {
    id: 'addressBook',
    url: '/account/address-book',
    displayName: 'Address Book',
    component: 'addressBook',
    href: '/account?id=addressBook',
  },
  {
    id: 'paymentGiftCards',
    url: '/account/payment',
    displayName: 'Payment & Gift Cards',
    component: 'payment',
    href: '/account?id=payment',
  },
  {
    id: 'myPreferences',
    url: '/account/my-preference',
    displayName: 'My Preferences',
    component: 'myPreferencePage',
    href,
  },
  {
    id: 'myPlaceRewardsCC',
    url: '/account/rewardsCreditCard',
    displayName: 'My Place Rewards Credit Card',
    component: 'myPlaceRewardsCCPage',
    href,
  },
];

export default navData;
