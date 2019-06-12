import { connect } from 'react-redux';
import FooterView from '../views';

const mapStateToProps = state => {
  return {
    copyrightText: state.FooterReducer.footer_bottom.copyrights.text,
    legalLinks: state.FooterReducer.footer_bottom.legal_links,
    socialMediaLinks: {
      connectWithUsLabel: state.GlobalReducers.labels.connect_with_us,
      links: state.FooterReducer.footer_top.social_media_links,
    },
  };
};

export default connect(mapStateToProps)(FooterView);
