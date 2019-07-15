import { connect } from 'react-redux';
import {
  getUserInfoPOC,
  getOrderDetail,
} from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.actions';
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

const mapDispatchToProps = dispatch => {
  return {
    getUserInfoAction: () => {
      dispatch(getUserInfoPOC());
    },
    getOrderDetailAction: () => {
      dispatch(getOrderDetail());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterView);
