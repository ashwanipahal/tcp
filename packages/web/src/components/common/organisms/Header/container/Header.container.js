import { connect } from 'react-redux';
import HeaderView from '../views';

const mapStateToProps = state => {
  return {
    headerData: state.HeaderReducer,
  };
};

export default connect(mapStateToProps)(HeaderView);
