import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  StyledText,
  StyledHeading,
  ParentContainer,
  UnderlineStyle,
  UnderlineStyleLight,
  InputField,
} from '../styles/AddressBook.style';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import withStyles from '../../../../common/hoc/withStyles.native';
import { TEXT_ALIGNS } from '../../../../../../styles/themes/typography.constants';
import colors from '../../../../../../styles/themes/TCP/colors';
import { TextInput } from 'react-native-gesture-handler';

// @flow
type Props = {
  labels: Object,
};

const inputBox = text => {
  return (
    <InputField>
      <TextInput placeholder={text} />
      <UnderlineStyleLight />
    </InputField>
  );
};

const loadAddressInfo = labels => {
  return labels.map(labelElement => {
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
        {loadAddressInfo(loadedLabels)}
      </ScrollView>
    </View>
  );
};

export default withStyles(AddressBook, ParentContainer);
export { AddressBook as AddressBookVanilla };
