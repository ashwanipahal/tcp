import { connect } from 'react-redux';
import NavMenuLevel1View from '../molecules/NavMenuLevel1';

const mapStateToProps = state => {
  return {
    navigationMenuObj: (state.Navigation && state.Navigation.navigationData) || [],
    accessibilityLabels: state.Labels.global.accessibility,
  };
};

export default connect(mapStateToProps)(NavMenuLevel1View);
