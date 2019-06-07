import { connect } from 'react-redux';
import { initActions } from './HomePage.actions';
import HomePageView from '../views/HomePage.view';

HomePageView.getInitActions = () => initActions;

const mapStateToProps = state => {
  return {
    links: state.HomePageReducer.links,
  };
};

export default connect(mapStateToProps)(HomePageView);
