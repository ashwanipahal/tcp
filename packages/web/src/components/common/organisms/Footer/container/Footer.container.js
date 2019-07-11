import { connect } from 'react-redux';
import FooterView from '../views';

const mapStateToProps = state => {
  const { Footer } = state;
  const {
    global: {
      footerDefault: { CONNECT_WITH_US: connectWithUsLabel, REFERENCE_ID: referenceID },
    },
  } = state.Labels;
  return {
    legalLinks: Footer.legalLinks,
    navLinks: Footer.navLinks,
    socialMediaLinks: {
      connectWithUsLabel,
      links: Footer.socialLinks,
    },
    emailSignup: Footer.emailSignupBtn,
    smsSignup: Footer.smsSignupBtn,
    referAFriend: Footer.referFriendBtn,
    copyrightText: Footer.copyrightText,
    referenceID,
  };
};

export default connect(mapStateToProps)(FooterView);
