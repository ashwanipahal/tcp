import { connect } from 'react-redux';
import FooterView from '../views';

const processFooterMiddle = footerMiddleObj => {
  const formattedFooterMiddleArray = [];
  formattedFooterMiddleArray.push(
    {
      header: footerMiddleObj.mpr.link,
      links: footerMiddleObj.mpr.sub_links,
    },
    {
      header: footerMiddleObj.mpr_cc.link,
      links: footerMiddleObj.mpr_cc.sub_links,
    }
  );

  // eslint-disable-next-line
  for (let i = 0; i < footerMiddleObj.nav_links.length; i++) {
    formattedFooterMiddleArray.push({
      header: footerMiddleObj.nav_links[i].items[0],
      links: footerMiddleObj.nav_links[i].items[0].links,
      isSubHeader: footerMiddleObj.nav_links[i].items[0].isSubHeader,
    });
  }
  return formattedFooterMiddleArray;
};

const mapStateToProps = state => {
  const {
    submodules: { footer_top: footerTop, footer_middle: footerMiddle, footer_bottom: footerBottom },
  } = state.FooterReducer;
  return {
    footer_top: footerTop,
    footer_middle: footerMiddle,
    footer_bottom: footerBottom,
    // copyrightText: state.FooterReducer.footer_bottom.copyrights.text,
    // legalLinks: state.FooterReducer.footer_bottom.legal_links,
    // navLinks: processFooterMiddle(footerMiddle),
    // socialMediaLinks: {
    //   connectWithUsLabel: state.GlobalReducers.labels.connect_with_us,
    //   links: state.FooterReducer.footer_top.social_media_links,
    // },
    // emailSignup: state.FooterReducer.footer_top.email_signup,
    // smsSignup: state.FooterReducer.footer_top.sms_signup,
    // referAFriend: state.FooterReducer.footer_top.refer_a_friend,
    // referenceID: state.GlobalReducers.labels.reference_id,
  };
};

export default connect(mapStateToProps)(FooterView);
