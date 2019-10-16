import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import Button from '../../../../../../common/atoms/Button';
import {
  SaveButtonWrapper,
  CancelButtonWrapper,
  BillingAddressWrapper,
  CardDetailsWrapper,
  AddAddressWrapper,
  ErrorMessageWrapper,
} from '../styles/CardEditForm.style.native';
import ErrorMessage from '../../../../../../common/atoms/ErrorDisplay';
import { withCardEditReduxForm } from './CardEditReduxForm';

class CardEditFormView extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { toastMessage, error } = this.props;
    if (error !== prevProps.error) {
      toastMessage(error.message);
    }
  }

  render() {
    const { getAddNewCCForm, unsetFormEditState, AddressForm, onEditCardFocus } = this.props;
    const { errorMessageRef, getDefaultPayment, selectedCard, handleSubmit } = this.props;
    const {
      labels: {
        saveButtonText,
        cancelButtonText,
        ariaLabelSaveButtonText,
        ariaLabelCancelButtonText,
      },
      labels,
      editModeSubmissionError,
    } = this.props;
    return (
      <View>
        <ScrollView ref={errorMessageRef}>
          <View>
            <AddAddressWrapper>
              <CardDetailsWrapper>
                {getAddNewCCForm({
                  onCardFocus: () => onEditCardFocus(this),
                  editMode: true,
                })}
              </CardDetailsWrapper>
              <BillingAddressWrapper>
                <AddressForm editMode />
              </BillingAddressWrapper>
            </AddAddressWrapper>
            {getDefaultPayment(selectedCard, labels, true)}
            {editModeSubmissionError ? (
              <ErrorMessageWrapper>
                <ErrorMessage error={editModeSubmissionError} />
              </ErrorMessageWrapper>
            ) : null}
          </View>
          <View>
            <SaveButtonWrapper>
              <Button
                aria-label={ariaLabelSaveButtonText}
                onPress={handleSubmit}
                fontSize="fs14"
                fontWeight="extrabold"
                buttonVariation="variable-width"
                fill="BLUE"
                text={saveButtonText}
              />
            </SaveButtonWrapper>
            <CancelButtonWrapper>
              <Button
                aria-label={ariaLabelCancelButtonText}
                type="button"
                className="card-edit-button card-edit-cancel"
                onPress={e => unsetFormEditState(e)}
                text={cancelButtonText}
              />
            </CancelButtonWrapper>
          </View>
        </ScrollView>
      </View>
    );
  }
}

CardEditFormView.propTypes = {
  labels: PropTypes.shape({
    saveButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    ariaLabelCancelButtonText: PropTypes.string,
    ariaLabelSaveButtonText: PropTypes.string,
  }).isRequired,
  getAddNewCCForm: PropTypes.func.isRequired,
  unsetFormEditState: PropTypes.func.isRequired,
  AddressForm: PropTypes.shape({}).isRequired,
  onEditCardFocus: PropTypes.func.isRequired,
  toastMessage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({}).isRequired,
  editModeSubmissionError: PropTypes.string.isRequired,
  errorMessageRef: PropTypes.shape({}).isRequired,
  getDefaultPayment: PropTypes.func.isRequired,
  selectedCard: PropTypes.shape({
    accountNo: PropTypes.string,
    expMonth: PropTypes.string,
    expYear: PropTypes.string,
    addressDetails: PropTypes.shape({}),
  }).isRequired,
};

export default withCardEditReduxForm(CardEditFormView);

export { CardEditFormView as CardEditFormViewVanilla };
