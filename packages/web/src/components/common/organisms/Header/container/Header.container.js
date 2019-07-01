import { connect } from 'react-redux';
import HeaderView from '../views';

const mapStateToProps = state => {
  return {
    headerTopNav: state.HeaderReducer.submodules.topNavWrapper,
  };
};

export default connect(mapStateToProps)(HeaderView);
