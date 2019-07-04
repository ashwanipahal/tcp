import { connect } from 'react-redux';
import FooterView from '../views';

const mapStateToProps = state => {
  const { footer } = state.FooterReducer;
  return {
    legalLinks: footer.legalLinks,
    navLinks: footer.navLinks,
    socialMediaLinks: {
      connectWithUsLabel: state.GlobalReducers.labels.connect_with_us,
      links: footer.socialLinks,
    },
    emailSignup: footer.emailSignupBtn,
    smsSignup: footer.smsSignupBtn,
    referAFriend: footer.referFriendBtn,
    referenceID: state.GlobalReducers.labels.reference_id,
    copyrightText: footer.copyrightText,
  };
};

export default connect(mapStateToProps)(FooterView);
