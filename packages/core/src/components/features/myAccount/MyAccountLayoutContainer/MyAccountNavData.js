/**
 * The foloowing data is just for the purpose of painting the left nav in account section
 * This will change once we integrate it with cms labels
 */

const navData = [
  {
    id: 'accountOverview',
    url: '/account',
    displayName: 'Account Overview',
    component: 'account',
  },
  {
    id: 'myPlaceRewards',
    url: '/myPlaceRewards',
    displayName: 'My Place Rewards',
    component: 'myPlaceRewards',
    subSections: [
      {
        id: 'pointsHistory',
        url: '/pointsHistory',
        displayName: 'Points History',
        component: 'pointsHistoryPage',
      },
    ],
  },
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
    id: 'profileInformation',
    url: '/profileInformation',
    displayName: 'Profile Information',
    component: 'profileInformation',
  },
  {
    id: 'addressBook',
    url: '/addressBook',
    displayName: 'Address Book',
    component: 'addressBook',
  },
  {
    id: 'paymentGiftCards',
    url: '/paymentGiftCardsPage',
    displayName: 'Payment & Gift Cards',
    component: 'paymentGiftCardsPage',
  },
  {
    id: 'myPreferences',
    url: '/myPreferencePage',
    displayName: 'My Preferences',
    component: 'myPreferencePage',
  },
  {
    id: 'myPlaceRewardsCC',
    url: '/myPlaceRewardsCCPage',
    displayName: 'My Place Rewards Credit Card',
    component: 'myPlaceRewardsCCPage',
  },
];

export default navData;
