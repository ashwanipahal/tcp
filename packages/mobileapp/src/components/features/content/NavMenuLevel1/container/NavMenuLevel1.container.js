import { connect } from 'react-redux';
import NavMenuLevel1View from '../views';
import navObject from '../mock';

const mapStateToProps = () => {
  return {
    navigationMenuObj: navObject,
  };
};

export default connect(mapStateToProps)(NavMenuLevel1View);
