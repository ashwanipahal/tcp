import React from 'react';
import PropTypes from 'prop-types';
import GiftServices from '../views/GiftServices.view';

class GiftServicesContainer extends React.PureComponent {
  render() {
    const { isGiftServicesChecked, formName, formSection, dispatch } = this.props;

    return (
      <GiftServices
        formName={formName}
        dispatch={dispatch}
        isGiftServicesChecked={isGiftServicesChecked}
        formSection={formSection}
      />
    );
  }
}
GiftServicesContainer.propTypes = {
  isGiftServicesChecked: PropTypes.bool,
  labels: PropTypes.shape({}),
  formName: PropTypes.string,
  formSection: PropTypes.string,
  dispatch: PropTypes.func,
};

GiftServicesContainer.defaultProps = {
  isGiftServicesChecked: false,
  dispatch: () => {},
  formName: '',
  formSection: '',
  labels: {},
};
export default GiftServicesContainer;
