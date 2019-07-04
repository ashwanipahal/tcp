import { connect } from 'react-redux';
import FooterView from '../views';

const mapStateToProps = state => {
  const { footer } = state.FooterReducer;
  const {
    global: {
      footerDefault: { CONNECT_WITH_US: connectWithUsLabel, REFERENCE_ID: referenceID },
    },
  } = state.labels;
  return {
    legalLinks: footer.legalLinks,
    navLinks: footer.navLinks,
    socialMediaLinks: {
      connectWithUsLabel,
      links: footer.socialLinks,
    },
    emailSignup: footer.emailSignupBtn,
    smsSignup: footer.smsSignupBtn,
    referAFriend: footer.referFriendBtn,
    copyrightText: footer.copyrightText,
    referenceID,
  };
};

export default connect(mapStateToProps)(FooterView);
