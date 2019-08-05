import React from 'react';
import { View, ScrollView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { GooglePlacesInput } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import Button from '@tcp/core/src/components/common/atoms/Button';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import {
  StyledHeading,
  ParentContainer,
  UnderlineStyle,
  InputField,
  InputFieldHalf,
  EmptyView,
  AddressFormView,
  AddAddressButton,
  CancelButton,
} from '@tcp/core/src/components/features/account/AddressBook/styles/AddressBook.style';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles.native';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';

const FormName = 'AddressBookForm';

// @flow
type Props = {
  labels: Object,
};

/**
 * This function renders google autosuggest component.
 * @param {string} text from cms
 */
const googleAutoSuggest = text => {
  return (
    <InputField>
      <GooglePlacesInput label={text} />
    </InputField>
  );
};

const setDefaultAddress = value => {
  return value;
};

/**
 * This function selects type of input from user and renders the corresponding
 * component.
 * @param {object} labels from cms
 * @param {array} labelsToLoad based on the screen
 */
const loadAddressInfo = (labels, labelsToLoad) => {
  return labelsToLoad.map(labelElement => {
    const text = labels[labelElement];
    if (labelElement === 'acc_lbl_city') return googleAutoSuggest(text);
    if (labelElement === 'acc_lbl_set_default')
      return (
        <Field
          name="setDefaultAddress"
          component={InputCheckbox}
          dataLocator="setDefaultAddress"
          disabled={false}
          rightText={text}
          marginTop={13}
          onClick={setDefaultAddress}
        />
      );
    if (labelElement === 'acc_lbl_state' || labelElement === 'acc_lbl_zip_code')
      return (
        <InputFieldHalf>
          <Field
            label={text}
            name={labelElement}
            id={labelElement}
            type="text"
            component={TextBox}
            maxLength={50}
            dataLocator={labelElement}
          />
        </InputFieldHalf>
      );
    return (
      <InputField>
        <Field
          label={text}
          name={labelElement}
          id={labelElement}
          type="text"
          component={TextBox}
          maxLength={50}
          dataLocator={labelElement}
        />
      </InputField>
    );
  });
};

/**
 * This function just renders loadAddressInfo along with a shell i.e. <View>...</View>
 * @param {object} labels from cms
 * @param {array} labelsToLoad based on the screen
 */
const loadAddressComponent = (labels, labelsToLoad) => {
  return <AddressFormView>{loadAddressInfo(labels, labelsToLoad)}</AddressFormView>;
};

const AddressBook = (props: Props) => {
  const { labels, handleSubmit, submitAddressFormAction } = props;

  const labelsToLoad = [
    'acc_lbl_first_name',
    'acc_lbl_last_name',
    'acc_lbl_address_line1',
    'acc_lbl_address_line2',
    'acc_lbl_city',
    'acc_lbl_state',
    'acc_lbl_zip_code',
    'acc_lbl_country',
    'acc_lbl_phone_number',
    'acc_lbl_set_default',
  ];
  return (
    <View {...props}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StyledHeading>
          <BodyCopy
            fontSize="fs16"
            fontWeight="extrabold"
            text={labels.acc_lbl_add_address_form_heading}
          />
        </StyledHeading>
        <UnderlineStyle />
        {loadAddressComponent(labels, labelsToLoad)}

        <Button
          fill="BLUE"
          type="submit"
          onPress={handleSubmit(submitAddressFormAction)}
          buttonVariation="variable-width"
          text={labels.acc_lbl_add_address_cta}
          style={AddAddressButton}
        />
        <EmptyView />
        <Button
          fill="WHITE"
          type="submit"
          onPress={handleSubmit(submitAddressFormAction)}
          buttonVariation="variable-width"
          text={labels.acc_lbl_cancel_cta}
          style={CancelButton}
        />
      </ScrollView>
    </View>
  );
};

export default reduxForm({
  form: FormName,
  enableReinitialize: true,
})(withStyles(AddressBook, ParentContainer));

export { AddressBook as AddressBookVanilla };
