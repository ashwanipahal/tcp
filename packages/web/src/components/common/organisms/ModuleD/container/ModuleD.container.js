import { connect } from 'react-redux';
import { initActions } from './ModuleD.actions';
import ModuleDView from '../views';

ModuleDView.getInitActions = () => initActions;

const mapStateToProps = state => {
  return {
    data: state.ModuleDReducer,
  };
};

export default connect(mapStateToProps)(ModuleDView);
