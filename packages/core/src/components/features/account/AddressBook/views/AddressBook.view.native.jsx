import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
import { GooglePlacesInput } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggestAddress/GoogleAutoSuggestAddress';
import Button from '@tcp/core/src/components/common/atoms/Button';
import {
  // eslint-disable-next-line import/named
  StyledHeading,
  // eslint-disable-next-line import/named
  ParentContainer,
  // eslint-disable-next-line import/named
  UnderlineStyle,
  // eslint-disable-next-line import/named
  UnderlineStyleLight,
  // eslint-disable-next-line import/named
  InputField,
  // eslint-disable-next-line import/named
  InputFieldHalf,
} from '../styles/AddressBook.style';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import withStyles from '../../../../common/hoc/withStyles.native';

const FormName = 'AddressBookForm';

// @flow
type Props = {
  labels: Object,
};

/**
 * This function renders simple input field.
 * @param {string} text as label
 */
const element = text => (
  <InputField>
    <TextInput placeholder={text} />
    <UnderlineStyleLight />
  </InputField>
);

/**
 * This function renders dropdown.
 */
const dropdown = () => {
  return (
    <DropDown
      data={[{ value: 'text1' }, { value: 'text2' }, { value: 'text3' }]}
      dropDownStyle={{ height: 50, border: 3 }}
      selectedValue="text2"
      handleComponentChange={null}
    />
  );
};

/**
 * This function renders google autosuggest component.
 * @param {string} text from cms
 */
const googleAutoSuggest = text => {
  return (
    <InputField>
      <GooglePlacesInput text={text} />
      <UnderlineStyleLight />
    </InputField>
  );
};

/**
 * This function returns input components to render in the ui based on the
 * type parameter
 * @param {string} text as label
 * @param {integer} type based on the screen
 */

const inputBox = (text, type = 1) => {
  switch (type) {
    case 1:
      return (
        <Field
          name="signup"
          id="signup"
          type="text"
          component={() => element(text)}
          maxLength={50}
          dataLocator="email_address_field"
        />
      );

    case 2:
      return (
        <Field
          name="signup"
          id="signup"
          type="text"
          component={() => dropdown()}
          maxLength={50}
          dataLocator="email_address_field"
        />
      );

    case 3:
      return googleAutoSuggest(text);

    default:
      return (
        <InputFieldHalf>
          <TextInput placeholder={text} />
          <UnderlineStyleLight />
        </InputFieldHalf>
      );
  }
};

/**
 * This function selects type of input from user and renders the corresponding
 * component.
 * @param {object} labels from cms
 * @param {array} labelsToLoad based on the screen
 */
const loadAddressInfo = (labels, labelsToLoad) => {
  return labelsToLoad.map(labelElement => {
    let type = 1;
    if (labelElement == 'acc_lbl_city') type = 3;
    if (labelElement == 'acc_lbl_state' || labelElement == 'acc_lbl_zip_code') type = 0;
    return inputBox(labels[labelElement], type);
  });
};

/**
 * This function just renders loadAddressInfo along with a shell i.e. <View>...</View>
 * @param {object} labels from cms
 * @param {array} labelsToLoad based on the screen
 */
const loadAddressComponent = (labels, labelsToLoad) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {loadAddressInfo(labels, labelsToLoad)}
    </View>
  );
};

const AddressBook = (props: Props) => {
  const { labels } = props;
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
          buttonVariation="variable-width"
          text={labels.acc_lbl_add_address_cta}
          style={{ color: 'white', fontWeight: 'normal', opacity: 0.5 }}
        />
        <View style={{ height: 20 }} />
        <Button
          fill="WHITE"
          type="submit"
          buttonVariation="variable-width"
          text={labels.acc_lbl_cancel_cta}
          style={{ fontWeight: 'normal', opacity: 0.5 }}
        />
      </ScrollView>
    </View>
  );
};

export default withStyles(
  reduxForm({
    form: FormName, // a unique identifier for this form
    initialValues: {
      signup: '',
    },
    asyncBlurFields: ['signup'],
  })(AddressBook),
  ParentContainer
);

export { AddressBook as AddressBookVanilla };
