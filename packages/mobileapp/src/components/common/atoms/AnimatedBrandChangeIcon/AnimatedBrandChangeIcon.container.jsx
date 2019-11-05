import { connect } from 'react-redux';
import updateAppType from '../../hoc/ThemeWrapper.actions';
import AnimatedBrandChangeIcon from './AnimatedBrandChangeIcon';

const mapDispatchToProps = dispatch => {
  return {
    updateAppTypeHandler: appType => dispatch(updateAppType(appType)),
  };
};

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.accessibility,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimatedBrandChangeIcon);
