import React from 'react';
import PropTypes from 'prop-types';
import { Field, change } from 'redux-form';
import AddressDropdown from '../../../../../account/AddEditCreditCard/molecule/AddressDropdown';
import Card from '../../../../../../common/molecules/Card/views/Card.native';
import withStyles from '../../../../../../common/hoc/withStyles';

const dropDownStyle = {
  height: 30,
  borderBottomWidth: 1,
  marginTop: 25,
};
const itemStyle = {
  height: 90,
};

class CreditCardDropDown extends React.Component {
  getCardOptions = () => {
    const { creditCardList, labels, onFileCardKey } = this.props;
    let cardOptions =
      (creditCardList &&
        creditCardList.size > 0 &&
        creditCardList.map(card => ({
          id: card.creditCardId,
          label: `${labels.lbl_billing_creditCardEnd}${card.accountNo.slice(-4)} ${
            card.defaultInd ? `(${labels.lbl_billing_default})` : ''
          }`,
          content: (
            <Card
              card={card}
              isDefault={card.defaultInd}
              cardNumber={`${labels.lbl_billing_creditCardEnd}${card.accountNo.slice(-4)}`}
              labels={labels}
              selectedValue={+onFileCardKey}
            />
          ),
          useCustomContent: true,
          primary: card.defaultInd === 'true',
        }))) ||
      [];

    cardOptions = cardOptions.push({
      id: '',
      label: labels.lbl_billing_addCreditHeading,
      content: '',
      primary: false,
    });

    return cardOptions && cardOptions.toArray();
  };

  onCardDropDownChange = itemValue => {
    const { dispatch, formName, addNewCC } = this.props;
    dispatch(change(formName, 'onFileCardKey', itemValue));
    if (!itemValue) {
      addNewCC();
    }
  };

  getCreditCardDropDown = () => {
    const { selectedOnFileCardKey } = this.props;
    return (
      <Field
        selectListTitle="Add a New Credit Card"
        name="onFileCardKey"
        id="onFileCardKey"
        component={AddressDropdown}
        data={this.getCardOptions()}
        dropDownStyle={{ ...dropDownStyle }}
        itemStyle={{ ...itemStyle }}
        toggleModal={this.toggleAddressModal}
        onValueChange={itemValue => {
          this.onCardDropDownChange(itemValue);
        }}
        variation="secondary"
        selectedValue={selectedOnFileCardKey}
        labels={{ common: { lbl_common_tapClose: 'close' } }}
      />
    );
  };

  render() {
    return this.getCreditCardDropDown();
  }
}

CreditCardDropDown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  addressLabels: PropTypes.shape({}).isRequired,
  selectedOnFileCardKey: PropTypes.string,
  creditCardList: PropTypes.shape({}).isRequired,
  onFileCardKey: PropTypes.string,
  labels: PropTypes.shape({}).isRequired,
  addNewCC: PropTypes.func.isRequired,
  formName: PropTypes.string,
};

CreditCardDropDown.defaultProps = {
  selectedOnFileCardKey: '',
  onFileCardKey: '',
  formName: '',
};
export default withStyles(CreditCardDropDown);
export { CreditCardDropDown as CreditCardDropDownVanilla };
