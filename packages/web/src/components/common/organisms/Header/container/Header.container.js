import { connect } from 'react-redux';
import HeaderView from '../views';

const mapStateToProps = state => {
  return {
    headerTopNav: state.HeaderReducer.header_top_nav,
  };
};

export default connect(mapStateToProps)(HeaderView);
