import { connect } from 'react-redux';
import CheckoutHeader from '../views';

const mapStateToProps = state => {
  const { Header } = state;
  return {
    brandTabs: Header.brandTabs,
  };
};

export default connect(
  mapStateToProps,
  {}
)(CheckoutHeader);
