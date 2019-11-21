import constants from '../Wallet.constants';

export const getAccountOverviewLabels = labels => {
  return (labels && labels.accountOverview) || {};
};

export const getWalletFooterLinks = state => state.SubNavigation[constants.WALLET_FOOTER_LINKS];

export default getAccountOverviewLabels;
