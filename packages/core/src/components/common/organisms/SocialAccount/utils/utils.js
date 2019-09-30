import { getLabelValue } from '../../../../../utils';

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
