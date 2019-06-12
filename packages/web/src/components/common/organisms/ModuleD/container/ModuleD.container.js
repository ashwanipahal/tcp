import { connect } from 'react-redux';
import ModuleDView from '../views';

const mapStateToProps = state => {
  return {
    data: state.ModuleDReducer,
  };
};

export default connect(mapStateToProps)(ModuleDView);
