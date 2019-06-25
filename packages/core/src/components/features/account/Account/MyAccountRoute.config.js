/**
 * The following data is just for the purpose of painting the left nav in account section
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
  {
    id: 'myWallet',
    url: '/account/wallet',
    displayName: 'My Wallet',
    component: 'myWalletPage',
    href: '/account?id=myWalletPage',
  },
  {
    id: 'earnExtraPoints',
    url: '/account/extra-points',
    displayName: 'Earn Extra Points',
    component: 'earnExtraPointsPage',
    href: '/account?id=earnExtraPointsPage',
  },
  {
    id: 'profileInformation',
    url: '/account/profile',
    displayName: 'Profile Information',
    component: 'profileInformation',
    href: '/account?id=profileInformation',
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
    component: 'paymentGiftCardsPage',
    href: '/account?id=paymentGiftCardsPage',
  },
  {
    id: 'myPreferences',
    url: '/account/my-preference',
    displayName: 'My Preferences',
    component: 'myPreferencePage',
    href: '/account?id=myPreferencePage',
  },
  {
    id: 'myPlaceRewardsCC',
    url: '/account/rewardsCreditCard',
    displayName: 'My Place Rewards Credit Card',
    component: 'myPlaceRewardsCCPage',
    href: '/account?id=myPlaceRewardsCCPage',
  },
];

export default navData;
