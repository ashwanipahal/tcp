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
  profilePage: {
    link: '/account?id=profile',
    path: profilePath,
  },
  mailingAddressPage: {
    link: '/account?id=profile&subSection=edit-mailing-address',
    path: profilePath,
  },
};

export default internalEndpoints;
