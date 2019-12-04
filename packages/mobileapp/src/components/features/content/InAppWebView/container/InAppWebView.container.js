import { connect } from 'react-redux';
import { setLoaderState } from '@tcp/core/src/components/common/molecules/Loader/container/Loader.actions';
import InAppWebView from '../views';

const mapDispatchToProps = dispatch => {
  return {
    setAppLoaderState: payload => dispatch(setLoaderState(payload)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(InAppWebView);
