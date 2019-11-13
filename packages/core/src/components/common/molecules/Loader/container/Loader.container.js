import { connect } from 'react-redux';
import LoaderView from '../views';

const mapStateToProps = state => {
  const { PageLoader } = state;
  return {
    loaderState: PageLoader.loaderState,
    miniBagLoaderState: PageLoader.miniBagLoaderState,
    addedToBagLoaderState: PageLoader.addedToBagLoaderState,
  };
};

export default connect(
  mapStateToProps,
  {}
)(LoaderView);
