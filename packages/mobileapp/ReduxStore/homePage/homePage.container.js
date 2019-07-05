import { connect } from 'react-redux';
import { initActions } from './homePage.actions';
import HomePageView from '../../screens/HomeScreen';

HomePageView.pageInfo = {
  name: 'homepage',
};
HomePageView.getInitActions = () => initActions;

const mapStateToProps = state => {
  console.log(state);
  return {
    slot_1: state.layouts.homepage.slot_1,
    slot_2: state.layouts.homepage.slot_2,
    links: state.HomePageReducer.links,
  };
};

export default connect(mapStateToProps)(HomePageView);
