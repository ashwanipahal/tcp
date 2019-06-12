import { connect } from 'react-redux';
import ModuleDView from '../views';

const mapStateToProps = state => {
  return {
    data: state.ModuleDReducer.data,
  };
};

export default connect(mapStateToProps)(ModuleDView);
