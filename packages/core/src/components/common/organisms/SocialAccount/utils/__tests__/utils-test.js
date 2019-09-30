import getLinkedSocialAccountLabel from '../utils';

const labelState = {
  account: {
    preferences: {
      lbl_prefrence_social_points_text_2: 'Facebook linked',
      lbl_prefrence_social_points_text_2_instagram: 'Instagram linked',
      lbl_prefrence_social_points_text_2_twitter: 'Twitter linked',
    },
  },
};
const titleFacebook = 'lbl_prefrence_social_points_text_2';
const titleInstagram = 'lbl_prefrence_social_points_text_2_instagram';
const titleTwitter = 'lbl_prefrence_social_points_text_2_twitter';

describe('Reward points success message label', () => {
  it('should show correct label if facebbok is linked', () => {
    const title = getLinkedSocialAccountLabel('AddFacebookAcct', labelState);
    expect(title).toBe(titleFacebook);
  });
  it('should show correct label if instagram is linked', () => {
    const title = getLinkedSocialAccountLabel('AddInstagramAcct', labelState);
    expect(title).toBe(titleInstagram);
  });
  it('should show correct label if twitter is linked', () => {
    const title = getLinkedSocialAccountLabel('AddTwitterAcct', labelState);
    expect(title).toBe(titleTwitter);
  });
});
