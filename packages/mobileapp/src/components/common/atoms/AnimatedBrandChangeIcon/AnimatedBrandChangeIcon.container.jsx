import { connect } from 'react-redux';
import updateAppType from '../../hoc/ThemeWrapper.actions';
import AnimatedBrandChangeIcon from './AnimatedBrandChangeIcon';

const mapDispatchToProps = dispatch => {
  return {
    updateAppTypeHandler: appType => dispatch(updateAppType(appType)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AnimatedBrandChangeIcon);
