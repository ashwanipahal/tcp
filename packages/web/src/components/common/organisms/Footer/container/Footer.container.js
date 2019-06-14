import { connect } from 'react-redux';
import FooterView from '../views';

const processFooterMiddle = footerMiddleObj => {
  const formattedFooterMiddleObj = [];
  formattedFooterMiddleObj.push(
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
    formattedFooterMiddleObj.push({
      header: footerMiddleObj.nav_links[i].items[0],
      links: footerMiddleObj.nav_links[i].items[0].links,
    });
  }
  return formattedFooterMiddleObj;
};

const mapStateToProps = state => {
  return {
    copyrightText: state.FooterReducer.footer_bottom.copyrights.text,
    legalLinks: state.FooterReducer.footer_bottom.legal_links,
    navLinks: processFooterMiddle(state.FooterReducer.footer_middle),
    socialMediaLinks: {
      connectWithUsLabel: state.GlobalReducers.labels.connect_with_us,
      links: state.FooterReducer.footer_top.social_media_links,
    },
  };
};

export default connect(mapStateToProps)(FooterView);
