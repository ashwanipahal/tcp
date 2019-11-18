export const getAccountOverviewLabels = labels => {
  return (labels && labels.accountOverview) || {};
};

export const getWalletFooterLinks = state => state.SubNavigation['wallet-footer-links'];

export default getAccountOverviewLabels;
