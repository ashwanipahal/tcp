import PropTypes from 'prop-types';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  cardList: PropTypes.shape({}).isRequired,
  onFileCardKey: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  cvvCodeRichText: PropTypes.string,
  paymentMethodId: PropTypes.string.isRequired,
  orderHasShipping: PropTypes.bool,
  backLinkPickup: PropTypes.string.isRequired,
  backLinkShipping: PropTypes.string.isRequired,
  nextSubmitText: PropTypes.string.isRequired,
  isPaymentDisabled: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  cardType: PropTypes.string,
  syncErrorsObj: PropTypes.shape({}),
  isGuest: PropTypes.bool,
  isSaveToAccountChecked: PropTypes.bool,
  selectedOnFileAddressId: PropTypes.string,
  userAddresses: PropTypes.shape({}),
  addressLabels: PropTypes.shape({}).isRequired,
  shippingAddress: PropTypes.shape({}),
  isSameAsShippingChecked: PropTypes.bool,
  billingData: PropTypes.shape({}),
}

const defaultProps = {
  className: '',
  onFileCardKey: '',
  cvvCodeRichText: null,
  orderHasShipping: false,
  isPaymentDisabled: false,
  cardType: null,
  syncErrorsObj: null,
  isGuest: true,
  isSaveToAccountChecked: false,
  selectedOnFileAddressId: null,
  userAddresses: null,
  shippingAddress: null,
  isSameAsShippingChecked: false,
  billingData: null,
}


export { propTypes, defaultProps };
