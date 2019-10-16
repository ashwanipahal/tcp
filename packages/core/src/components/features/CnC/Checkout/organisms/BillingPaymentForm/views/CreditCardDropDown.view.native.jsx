import React from 'react';
import PropTypes from 'prop-types';
import { Field, change } from 'redux-form';
import { fromJS } from 'immutable';
import AddressDropdown from '../../../../../account/AddEditCreditCard/molecule/AddressDropdown';
import Card from '../../../../../../common/molecules/Card/views/Card.native';
import withStyles from '../../../../../../common/hoc/withStyles';
import { CardListWrapper } from '../../../../../../common/molecules/Card/CardImage.style.native';

const dropDownStyle = {
  height: 30,
  borderBottomWidth: 1,
  marginTop: 25,
};
const itemStyle = {
  height: 90,
};

export class CreditCardDropDown extends React.PureComponent {
  getCardOptions = () => {
    const { creditCardList, labels, onFileCardKey } = this.props;
    let cardOptions =
      (creditCardList &&
        creditCardList.size > 0 &&
        creditCardList.map(card => ({
          id: card.creditCardId,
          label: `${labels.creditCardEnd}${card.accountNo.slice(-4)} ${
            card.defaultInd ? `(${labels.defaultBadge})` : ''
          }`,
          content: (
            <CardListWrapper dataLocator="cardDetailCardDropDown">
              <Card
                card={card}
                isDefault={card.defaultInd}
                cardNumber={`${labels.creditCardEnd}${card.accountNo.slice(-4)}`}
                labels={labels}
                selectedValue={+onFileCardKey}
              />
            </CardListWrapper>
          ),
          useCustomContent: true,
          primary: card.defaultInd === 'true',
        }))) ||
      fromJS([]);

    cardOptions = cardOptions.push({
      id: '',
      label: labels.addCreditBtn,
      content: '',
      primary: false,
      dataLocator: 'addCreditCardBtn',
    });

    return cardOptions && cardOptions.toArray();
  };

  /**
   * @function toggleAddNewMode
   */
  toggleAddNewMode = () => {
    const { dispatch, formName, addNewCC } = this.props;
    dispatch(change(formName, 'onFileCardKey', ''));
    addNewCC();
  };

  onCardDropDownChange = itemValue => {
    const { dispatch, formName, onChange } = this.props;
    dispatch(change(formName, 'onFileCardKey', itemValue));
    onChange();
  };

  getCreditCardDropDown = () => {
    const { selectedOnFileCardKey, creditCardList } = this.props;
    return (
      <Field
        selectListTitle=""
        name="onFileCardKey"
        id="onFileCardKey"
        component={AddressDropdown}
        data={this.getCardOptions()}
        dropDownStyle={{ ...dropDownStyle }}
        itemStyle={{ ...itemStyle }}
        addAddress={this.toggleAddNewMode}
        onValueChange={itemValue => {
          this.onCardDropDownChange(itemValue);
        }}
        variation="secondary"
        selectedValue={selectedOnFileCardKey}
        labels={{ common: { lbl_common_tapClose: 'close' } }}
        disableBtn={!selectedOnFileCardKey || (creditCardList && creditCardList.size === 0)}
        dataLocator="selectCardDrpDown"
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
  onChange: PropTypes.func.isRequired,
};

CreditCardDropDown.defaultProps = {
  selectedOnFileCardKey: '',
  onFileCardKey: '',
  formName: '',
};
export default withStyles(CreditCardDropDown);
export { CreditCardDropDown as CreditCardDropDownVanilla };
