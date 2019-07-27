import { connect } from 'react-redux';
import NavMenuLevel1View from '../views';

const mapStateToProps = state => {
  return {
    navigationMenuObj: (state.Navigation && state.Navigation.navigationData) || [],
  };
};

export default connect(mapStateToProps)(NavMenuLevel1View);
