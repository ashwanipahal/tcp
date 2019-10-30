const profilePath = '/account/profile';
const placeRewardsPath = '/account/place-rewards';

const internalEndpoints = {
  myWalletPage: {
    link: '/account?id=wallet',
    path: '/account/wallet',
  },
  shopNowPage: {
    link: '/home',
    path: '/home',
  },
  changePassowrdPage: {
    link: '/account?id=profile&subSection=change-password',
    path: profilePath,
  },
  editProfileInformationPage: {
    link: '/account?id=profile&subSection=edit-personal-info',
    path: profilePath,
  },
  editAboutYouInfoPage: {
    link: '/account?id=profile&subSection=edit-aboutyou-info',
    path: profilePath,
  },
  profilePage: {
    link: '/account?id=profile',
    path: profilePath,
  },
  paymentPage: {
    link: '/account?id=payment',
    path: '/account/payment',
  },
  mailingAddressPage: {
    link: '/account?id=profile&subSection=edit-mailing-address',
    path: profilePath,
  },
  birthdaySavingsPage: {
    link: '/account?id=profile&subSection=birthday-savings',
    path: `${profilePath}/birthday-savings`,
  },
  placeRewardsPage: {
    link: '/account?id=place-rewards',
    path: placeRewardsPath,
  },
  pointsHistoryPage: {
    link: '/account?id=place-rewards&subSection=points-history',
    path: `${placeRewardsPath}/points-history`,
  },
  pointsClaimPage: {
    link: '/account?id=place-rewards&subSection=points-claim',
    path: `${placeRewardsPath}/points-claim`,
  },
  extraPointsPage: {
    link: '/account?id=extra-points',
    path: '/account/extra-points',
  },
  orderPage: {
    link: '/account?id=orders&subSection=order-details',
    path: '/account/orders/order-details',
  },
  myPreferencesPage: {
    link: '/account?id=my-preference',
    path: '/account/my-preference',
  },
  myOrderPage: {
    link: '/account?id=orders',
    path: '/account/orders',
  },
  trackOrder: {
    link: '/track-order?id=orders&subSection=order-details',
    path: '/track-order',
  },
};

export default internalEndpoints;
