/**
 * The foloowing data is just for the purpose of painting the left nav in account section
 * This will change once we integrate it with cms labels
 */

const navData = [
  {
    id: 'accountOverview',
    url: '/account',
    displayName: 'Account Overview',
    component: 'accountOverview',
    href: '/account?id=accountOverview',
  },
  {
    id: 'myPlaceRewards',
    url: '/account/myPlaceRewards',
    displayName: 'My Place Rewards',
    component: 'myPlaceRewards',
    href: '/account?id=myPlaceRewards',
    subSections: [
      {
        id: 'pointsHistory',
        url: '/account/myPlaceRewards/pointsHistory',
        displayName: 'Points History',
        component: 'pointsHistoryPage',
        href: '/account?id=pointsHistoryPage',
      },
    ],
  },
  {
    id: 'myWallet',
    url: '/account/myWalletPage',
    displayName: 'My Wallet',
    component: 'myWalletPage',
    href: '/account?id=myWalletPage',
  },
  {
    id: 'earnExtraPoints',
    url: '/account/earnExtraPointsPage',
    displayName: 'Earn Extra Points',
    component: 'earnExtraPointsPage',
    href: '/account?id=earnExtraPointsPage',
  },
  {
    id: 'profileInformation',
    url: '/account/profileInformation',
    displayName: 'Profile Information',
    component: 'profileInformation',
    href: '/account?id=profileInformation',
  },
  {
    id: 'addressBook',
    url: '/account/addressBook',
    displayName: 'Address Book',
    component: 'addressBook',
    href: '/account?id=addressBook',
  },
  {
    id: 'paymentGiftCards',
    url: '/account/paymentGiftCardsPage',
    displayName: 'Payment & Gift Cards',
    component: 'paymentGiftCardsPage',
    href: '/account?id=paymentGiftCardsPage',
  },
  {
    id: 'myPreferences',
    url: '/account/myPreferencePage',
    displayName: 'My Preferences',
    component: 'myPreferencePage',
    href: '/account?id=myPreferencePage',
  },
  {
    id: 'myPlaceRewardsCC',
    url: '/account/myPlaceRewardsCCPage',
    displayName: 'My Place Rewards Credit Card',
    component: 'myPlaceRewardsCCPage',
    href: '/account?id=myPlaceRewardsCCPage',
  },
];

export default navData;
