import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GiftServices from '../views/GiftServices.view';
import {
  getGiftServicesLabels,
  getDetailsContent,
  getGiftWrapOptions,
  getInitialGiftWrapOptions,
} from './GiftServices.selector';
import { addGiftServicesRequest } from './GiftServices.actions';

class GiftServicesContainer extends React.PureComponent {
  render() {
    const {
      labels,
      detailsRichText,
      isGiftServicesChecked,
      formName,
      formSection,
      dispatch,
      giftWrapOptions,
      giftWrap,
    } = this.props;
    const optionId = giftWrap ? giftWrap.get('optionId') : '';
    const message = giftWrap ? giftWrap.get('message') : '';
    const updateLabels = { ...labels, DETAILS_RICH_TEXT: detailsRichText };
    return (
      <GiftServices
        labels={updateLabels}
        formName={formName}
        dispatch={dispatch}
        isGiftServicesChecked={isGiftServicesChecked}
        formSection={formSection}
        giftWrapOptions={giftWrapOptions}
        initialValues={{ optionId, message }}
      />
    );
  }
}
GiftServicesContainer.propTypes = {
  isGiftServicesChecked: PropTypes.bool,
  labels: PropTypes.shape.isRequired,
  formName: PropTypes.string,
  formSection: PropTypes.string,
  dispatch: PropTypes.func,
  detailsRichText: PropTypes.shape.isRequired,
  giftWrapOptions: PropTypes.shape.isRequired,
  giftWrap: PropTypes.shape.isRequired,
};
GiftServicesContainer.defaultProps = {
  isGiftServicesChecked: false,
  dispatch: () => {},
  formName: '',
  formSection: '',
};
export const mapDispatchToProps = dispatch => {
  return {
    onAddGiftServices: () => {
      dispatch(addGiftServicesRequest());
    },
  };
};
export const mapStateToProps = state => ({
  labels: getGiftServicesLabels(state),
  detailsRichText: getDetailsContent(state),
  giftWrapOptions: getGiftWrapOptions(state),
  giftWrap: getInitialGiftWrapOptions(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftServicesContainer);
