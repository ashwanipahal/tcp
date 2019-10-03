import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import CustomIcon from '@tcp/core/src/components/common/atoms/Icon';
import { ICON_NAME } from '@tcp/core/src/components/common/atoms/Icon/Icon.constants';
import { getAddressLocationInfo } from '../../../../../atoms/GoogleAutoSuggest/AutoCompleteComponent.native';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import { Button } from '../../../../../atoms';
import withStyles from '../../../../../hoc/withStyles';
import styles, {
  PickUpHeaderText,
  PickUpModalView,
  Row,
  AddressCol,
  DistanceCol,
  dropDownStyle,
  itemStyle,
  ModalTitleContainer,
  ModalTitle,
  ModalCloseTouchable,
} from '../styles/PickupStoreSelectionForm.style.native';

class PickupStoreSelectionForm extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '25',
    };
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(formData) {
    const { colorFitsSizesMap, onSubmit } = this.props;

    const locationPromise = this.place
      ? Promise.resolve(this.place.geometry.location)
      : getAddressLocationInfo(formData.addressLocation);
    onSubmit(locationPromise, colorFitsSizesMap, formData);
  }

  render() {
    const { selectedValue } = this.state;
    const { handleSubmit, distancesMap, pristine, onCloseClick } = this.props;
    return (
      <Modal animationType="slide" transparent={false}>
        <PickUpModalView>
          <ModalTitleContainer>
            <ModalTitle>Pick Up In Store</ModalTitle>
            <ModalCloseTouchable onPress={onCloseClick} accessibilityRole="button">
              <CustomIcon name={ICON_NAME.close} size="fs20" color="gray.900" />
            </ModalCloseTouchable>
          </ModalTitleContainer>
          <PickUpHeaderText>find a store near you</PickUpHeaderText>
          <Row>
            <AddressCol>
              <Field
                name="addressLocation"
                id="addressLocation"
                component={TextBox}
                label="Zip, City or State"
              />
            </AddressCol>
            <DistanceCol>
              <Field
                bounces={false}
                name="distance"
                component={DropDown}
                heading="Distance"
                data={distancesMap}
                label="Distance"
                className="distance-input"
                dropDownStyle={{ ...dropDownStyle }}
                itemStyle={{ ...itemStyle }}
                variation="secondary"
                selectedValue={selectedValue}
                onValueChange={itemValue => {
                  this.setState({ selectedValue: itemValue });
                }}
              />
            </DistanceCol>
          </Row>
          <Button
            margin="16px 0 0 0"
            color="white"
            fill="BLUE"
            buttonVariation="variable-width"
            text="Search"
            fontSize="fs10"
            fontWeight="extrabold"
            fontFamily="secondary"
            onPress={handleSubmit(this.onSearch)}
            locator="pdp_color_swatch"
            accessibilityLabel="Search"
            disabled={pristine}
          />
        </PickUpModalView>
      </Modal>
    );
  }
}

const defaultValidation = getStandardConfig(
  [{ addressLocation: 'addressLine1' }, { distance: 'distance' }],
  { stopOnFirstError: true }
);

const validateMethod = createValidateMethod(defaultValidation);

export default connect()(
  reduxForm({
    form: 'pickupSearchStoresForm',
    ...validateMethod,
    keepDirtyOnReinitialize: true, // [https://github.com/erikras/redux-form/issues/3690] redux-forms 7.2.0 causes bug that forms will reInit after mount setting changed values back to init values
    touchOnChange: true, // to show validation error messageas even if user did not touch the fields
    touchOnBlur: false, // to avoid hidding the search results on blur of any field without changes
  })(withStyles(PickupStoreSelectionForm, styles))
);

export { PickupStoreSelectionForm as PickupStoreSelectionFormVanilla };
