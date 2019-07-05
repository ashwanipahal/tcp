import { connect } from 'react-redux';
import FooterView from '../views';

const mapStateToProps = state => {
  const {
    submodules: { footerTop, footerMiddle, footerBottom },
  } = state.FooterReducer;
  const {
    global: {
      footerDefault: { CONNECT_WITH_US: connectWithUsLabel, REFERENCE_ID: referenceID },
    },
  } = state.labels;
  return {
    copyrightText:
      (footerBottom.composites.richTextGroup && footerBottom.composites.richTextGroup[0].text) ||
      '',
    legalLinks: footerBottom.composites.linkList,
    navLinks: footerMiddle,
    socialMediaLinks: {
      connectWithUsLabel,
      links: footerTop.composites.socialLinks,
    },
    emailSignup: footerTop.composites.buttonGroup[0],
    smsSignup: footerTop.composites.buttonGroup[1],
    referAFriend: footerTop.composites.buttonGroup[2],
    referenceID,
  };
};

export default connect(mapStateToProps)(FooterView);
