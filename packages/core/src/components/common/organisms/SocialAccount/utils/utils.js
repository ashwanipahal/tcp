import { getLabelValue } from '../../../../../utils';

/**
 * @function getLinkedSocialAccountLabel
 * @param {string} socialAccount - social account which is being linked.
 * @param {object} labels - label of linked social account
 * @returns {string} Label - Added social account reward points label
 */
const getLinkedSocialAccountLabel = (socialAccount, labels) => {
  switch (socialAccount) {
    case 'AddFacebookAcct':
      return getLabelValue(labels, 'lbl_prefrence_social_points_text_2');
    case 'AddInstagramAcct':
      return getLabelValue(labels, 'lbl_prefrence_social_points_text_2_instagram');
    case 'AddTwitterAcct':
      return getLabelValue(labels, 'lbl_prefrence_social_points_text_2_twitter');
    default:
      return getLabelValue(labels, 'lbl_prefrence_social_points_text_2');
  }
};

export default getLinkedSocialAccountLabel;
