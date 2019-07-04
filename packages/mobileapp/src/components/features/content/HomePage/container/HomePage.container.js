import { connect } from 'react-redux';
import HomePageView from '../views';

HomePageView.pageInfo = {
  name: 'homepage',
};

export default connect()(HomePageView);
