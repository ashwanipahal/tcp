import { connect } from 'react-redux';
import LoaderView from '../views';

const mapStateToProps = state => {
  const { PageLoader } = state;
  return {
    loaderState: PageLoader && PageLoader.loaderState,
    miniBagLoaderState: PageLoader && PageLoader.miniBagLoaderState,
    addedToBagLoaderState: PageLoader && PageLoader.addedToBagLoaderState,
  };
};

export default connect(
  mapStateToProps,
  {}
)(LoaderView);
