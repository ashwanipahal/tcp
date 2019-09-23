import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  giftCardList: PropTypes.shape({}),
  appliedGiftCards: PropTypes.shape({}),
  applyExistingGiftCardToOrder: PropTypes.func.isRequired,
  handleRemoveGiftCard: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  giftCardErrors: PropTypes.shape({}),
  orderBalanceTotal: PropTypes.number,
  showAddGiftCard: PropTypes.func.isRequired,
  enableAddGiftCard: PropTypes.bool,
  hideAddGiftCard: PropTypes.func.isRequired,
  onAddGiftCardClick: PropTypes.func.isRequired,
  formErrorMessage: PropTypes.shape({}),
  getAddGiftCardError: PropTypes.func.isRequired,
  isGuestUser: PropTypes.bool,
  isRecapchaEnabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClearError: PropTypes.func.isRequired,
};
const defaultProps = {
  className: '',
  giftCardList: {},
  appliedGiftCards: {},
  labels: {},
  giftCardErrors: {},
  orderBalanceTotal: 0,
  enableAddGiftCard: false,
  formErrorMessage: '',
  isGuestUser: false,
  isRecapchaEnabled: false,
  isLoading: false,
};

const renderAddGiftCardProps = {
  hideAddGiftCard: PropTypes.func.isRequired,
  onAddGiftCardClick: PropTypes.func.isRequired,
  getAddGiftCardError: PropTypes.func.isRequired,
  onClearError: PropTypes.func.isRequired,
  isGuestUser: PropTypes.bool.isRequired,
  isRecapchaEnabled: PropTypes.bool.isRequired,
  labels: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export { propTypes, defaultProps, renderAddGiftCardProps };
