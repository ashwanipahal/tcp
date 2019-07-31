import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
import { GooglePlacesInput } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggestAddress/GoogleAutoSuggestAddress';
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

const element = text => (
  <InputField>
    <TextInput placeholder={text} />
    <UnderlineStyleLight />
  </InputField>
);

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

    default:
      return (
        <InputFieldHalf>
          <TextInput placeholder={text} />
          <UnderlineStyleLight />
        </InputFieldHalf>
      );
  }
};

const loadAddressInfo = labels => {
  return labels.map(labelElement => {
    // if()
    return inputBox(labelElement);
  });
};

const constructLabelsObject = (labels, labelsToLoad) => {
  return labelsToLoad.map(e => labels[e]);
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
  const loadedLabels = constructLabelsObject(labels, labelsToLoad);
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
        <GooglePlacesInput />
        {inputBox('test', 2)}
        {loadAddressInfo(loadedLabels)}
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
