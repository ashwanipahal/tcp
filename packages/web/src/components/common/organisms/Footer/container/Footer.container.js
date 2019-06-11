import { connect } from 'react-redux';
import FooterView from '../views';

const mapStateToProps = state => {
  return {
    copyrightText: state.FooterReducer.footer_bottom.copyrights.text,
    legalLinks: state.FooterReducer.footer_bottom.legal_links,
  };
};

export default connect(mapStateToProps)(FooterView);
