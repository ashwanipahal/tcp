import { connect } from 'react-redux';
import { initActions } from './HomePage.actions';
import HomePageView from '../views/HomePage.view';

HomePageView.pageInfo = {
  name: 'homepage',
};
HomePageView.getInitActions = () => initActions;

const mapStateToProps = state => {
  return {
    slot_1: state.layouts.homepage.slot_1,
    slot_2: state.layouts.homepage.slot_2,
    links: state.HomePageReducer.links,
  };
};

export default connect(mapStateToProps)(HomePageView);
