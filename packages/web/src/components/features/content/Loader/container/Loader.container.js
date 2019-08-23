import { connect } from 'react-redux';
import LoaderView from '../views';

const mapStateToProps = state => {
  const { PageLoader } = state;
  return {
    loaderState: PageLoader.loaderState,
  };
};

export default connect(
  mapStateToProps,
  {}
)(LoaderView);
