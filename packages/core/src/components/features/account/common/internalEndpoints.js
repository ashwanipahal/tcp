const profilePath = '/account/profile';

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
};

export default internalEndpoints;
