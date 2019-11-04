/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import { getAddressFromPlace } from '@tcp/core/src/utils';
import { Field, reduxForm, change } from 'redux-form';
import { RichText, Button } from '../../../../../../common/atoms';
import TextBox from '../../../../../../common/atoms/TextBox';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox/views/InputCheckbox.native';
import DropDown from '../../../../../../common/atoms/DropDown/views/DropDown.native';
import { calendarDaysMap, calendarYearsMap } from '../../../utils/DateOfBirthHelper';
import { MONTH_OPTIONS_MAP_WITH_EMPTY as months } from '../../../RewardsCard.constants';
import { GooglePlacesInput } from '../../../../../../common/atoms/GoogleAutoSuggest/AutoCompleteComponent.native';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';

import {
  ImageContainer,
  Container,
  TextBoxContainer,
  StyledBodyCopy,
  NameFieldContainer,
  ContainerView,
  StateContainerView,
  ZipContainerView,
  MessageViewContainer,
  PersonalInformationContainerView,
  DateContainerView,
  ScrollViewContainer,
  CheckBoxContainerView,
  CheckBoxImage,
  CheckMessageView,
  ButtonWrapper,
  StyledImage,
  RichTextContainer,
  StyledAnchor,
  PreScreenCodeContainer,
  ParentMessageContainer,
  FirstNameContainer,
  MiddleNameContainer,
  FieldContainer,
  SSNContainer,
  AddressLine1Container,
  DropDownContainer,
} from './style/PLCCForm.style.native';
import {
  CAcountriesStatesTable,
  UScountriesStatesTable,
} from '../../../../../../common/organisms/AddressForm/CountriesAndStates.constants';
import { getLabelValue, getSiteId } from '../../../../../../../utils';

const headerImage = require('../../../../../../../../src/assets/tcp-cc.png');

const dropDownStyle = {
  height: 28,
  border: 1,
};

const itemStyle = {
  height: 41,
  paddingLeft: 6,
  color: 'black',
};

class PLCCForm extends React.PureComponent<Props> {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.siteId = getSiteId();

    const selectArray = [
      {
        id: ``,
        fullName: '',
        displayName: 'Select',
      },
    ];

    this.CAcountriesStates = [...selectArray, ...CAcountriesStatesTable];
    this.UScountriesStates = [...selectArray, ...UScountriesStatesTable];

    this.date = calendarDaysMap();
    this.year = calendarYearsMap();

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      country: 'US',
      // eslint-disable-next-line react/no-unused-state
      dropDownItem: props.countryState ? props.countryState : this.UScountriesStates[0].displayName,
      isPreScreen: false,
      date: this.date[0].displayName,
      month: months[0].displayName,
      year: this.year[0].displayName,
    };

    this.locationRef = null;
  }

  onClose = () => {
    const { setLoginModalMountState } = this.props;
    setLoginModalMountState({ state: false });
  };

  togglePreScreen = () => {
    const { isPreScreen } = this.props;
    this.setState({ isPreScreen: !isPreScreen });
  };

  /**
   * @fatarrow - handlePlaceSelected
   * @params - @param - place - place picked up from google autocomplete.
   *           @param - inputValue - input value.
   *
   * @description - handles the place selected from address1 field of PLCC appliation form.
   *
   */
  handlePlaceSelected = (place, inputValue) => {
    const { dispatch } = this.props;
    const address = getAddressFromPlace(place, inputValue);
    dispatch(change('PLCCForm', 'city', address.city));
    dispatch(change('PLCCForm', 'noCountryZip', address.zip));
    dispatch(change('PLCCForm', 'statewocountry', address.state));
    dispatch(change('PLCCForm', 'addressLine1', address.street));
    this.setState({ dropDownItem: address.state });
    this.locationRef.setAddressText(address.street);
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  // eslint-disable-next-line complexity
  render() {
    const { toggleModal, plccData, labels, handleSubmit, dispatch } = this.props;
    const { dropDownItem, isPreScreen, date, month, year } = this.state;

    return (
      <ScrollViewContainer>
        <ImageContainer>
          <StyledImage source={headerImage} width="70%" height="166px" />
        </ImageContainer>
        <Container>
          <RichTextContainer>
            <RichText source={{ html: plccData && plccData.credit_card_header }} />
          </RichTextContainer>
        </Container>
        {isPreScreen && (
          <TextBoxContainer>
            <Field
              name={getLabelValue(labels, 'lbl_PLCCForm_preScreenCodeOpt')}
              id="preScreenCode"
              label={getLabelValue(labels, 'lbl_PLCCForm_preScreenCodeOpt')}
              type="text"
              component={TextBox}
              maxLength={12}
            />
          </TextBoxContainer>
        )}

        <PreScreenCodeContainer>
          <StyledBodyCopy
            text={getLabelValue(labels, 'lbl_PLCCForm_preScreenCodeText')}
            fontSize="fs15"
            color="gray.900"
            paddingLeft="16px"
            mobilefontFamily="secondary"
            textAlign="center"
            paddingTop={!isPreScreen ? '22px' : '1px'}
          />

          {!isPreScreen ? (
            <StyledAnchor
              onPress={() => this.togglePreScreen()}
              fontSizeVariation="large"
              underline
              text={getLabelValue(labels, 'lbl_PLCCForm_clickHere')}
              paddingRight="16px"
              paddingTop={!isPreScreen ? '22px' : '1px'}
            />
          ) : (
            <StyledBodyCopy
              text={getLabelValue(labels, 'lbl_PLCCForm_enterHere')}
              fontSize="fs15"
              color="gray.900"
              textAlign="center"
              paddingRight="16px"
              paddingTop={!isPreScreen ? '12px' : '1px'}
            />
          )}
        </PreScreenCodeContainer>

        <StyledBodyCopy
          text={getLabelValue(labels, 'lbl_PLCCForm_contactInfoHeader')}
          fontSize="fs16"
          color="black"
          fontFamily="secondary"
          textAlign="left"
          fontWeight="semibold"
          paddingLeft="16px"
          paddingRight="16px"
          paddingTop="26px"
          paddingBottom="12px"
        />

        <NameFieldContainer>
          <ParentMessageContainer>
            <FirstNameContainer>
              <Field
                name="firstName"
                id="firstName"
                label={getLabelValue(labels, 'lbl_PLCCForm_firstName')}
                type="text"
                component={TextBox}
                maxLength={20}
              />
            </FirstNameContainer>

            <MiddleNameContainer>
              <Field
                name="middleName"
                id="middleName"
                label={getLabelValue(labels, 'lbl_PLCCForm_middleNameInitial')}
                type="text"
                component={TextBox}
                maxLength={5}
              />
            </MiddleNameContainer>
          </ParentMessageContainer>
        </NameFieldContainer>
        <NameFieldContainer>
          <Field
            label={getLabelValue(labels, 'lbl_PLCCForm_lastName')}
            type="text"
            component={TextBox}
            maxLength={15}
            name="lastName"
            id="lastName"
          />
        </NameFieldContainer>
        <NameFieldContainer>
          <Field
            name="emailAddress"
            id="emailAddress"
            label={getLabelValue(labels, 'lbl_PLCCForm_email')}
            type="text"
            component={TextBox}
          />
        </NameFieldContainer>
        <NameFieldContainer>
          <Field
            id="addressLine1"
            name="addressLine1"
            headerTitle={getLabelValue(labels, 'lbl_PLCCForm_addressLine1')}
            component={GooglePlacesInput}
            onPlaceSelected={this.handlePlaceSelected}
            componentRestrictions={Object.assign({}, { country: [this.siteId] })}
            onValueChange={(data, inputValue) => {
              this.handlePlaceSelected(data, inputValue);
            }}
            onChangeText={text => {
              setTimeout(() => {
                dispatch(change('AddressForm', 'addressLine1', text));
              });
            }}
            refs={instance => {
              this.locationRef = instance;
            }}
          />
          <AddressLine1Container>
            <Field label="" component={TextBox} title="" type="hidden" id="addressLine1" />
          </AddressLine1Container>
        </NameFieldContainer>

        <NameFieldContainer>
          <Field
            name="addressLine2"
            id="addressLine2"
            label={getLabelValue(labels, 'lbl_PLCCForm_addressLine2')}
            type="text"
            component={TextBox}
            maxLength={20}
          />
        </NameFieldContainer>
        <NameFieldContainer>
          <Field
            name="city"
            id="city"
            label={getLabelValue(labels, 'lbl_PLCCForm_city')}
            type="text"
            component={TextBox}
            maxLength={20}
          />
        </NameFieldContainer>
        <ContainerView>
          <StateContainerView>
            <Field
              id="statewocountry"
              name="statewocountry"
              bounces={false}
              component={DropDown}
              heading="State"
              data={this.siteId === 'us' ? this.UScountriesStates : this.CAcountriesStates}
              variation="secondary"
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
              selectedValue={dropDownItem}
              onValueChange={itemValue => {
                dispatch(change('PLCCForm', 'statewocountry', itemValue));
                this.setState({ dropDownItem: itemValue });
              }}
            />
            <FieldContainer>
              <Field
                label=""
                component={TextBox}
                title=""
                type="hidden"
                id="statewocountry"
                name="statewocountry"
              />
            </FieldContainer>
          </StateContainerView>
          <ZipContainerView>
            <Field
              name="noCountryZip"
              id="noCountryZip"
              label={getLabelValue(labels, 'lbl_PLCCForm_zipCode')}
              type="text"
              component={TextBox}
              maxLength={5}
              keyboardType="numeric"
            />
          </ZipContainerView>
        </ContainerView>
        <NameFieldContainer>
          <Field
            name="phoneNumberWithAlt"
            id="phoneNumberWithAlt"
            label={getLabelValue(labels, 'lbl_PLCCForm_mobilePhoneNumber')}
            type="tel"
            component={TextBox}
            maxLength={10}
            keyboardType="numeric"
          />
        </NameFieldContainer>
        <NameFieldContainer>
          <Field
            name="altPhoneNumber"
            id="altPhoneNumber"
            label={getLabelValue(labels, 'lbl_PLCCForm_alternatePhone')}
            type="tel"
            component={TextBox}
            maxLength={10}
            keyboardType="numeric"
          />
        </NameFieldContainer>
        <StyledBodyCopy
          text={getLabelValue(labels, 'lbl_PLCCForm_minPhone')}
          fontSize="fs10"
          color="gray.900"
          paddingLeft="16px"
          paddingRight="16px"
          mobilefontFamily="secondary"
          textAlign="left"
        />
        <MessageViewContainer height="300px">
          <RichText source={{ html: plccData && plccData.contact_information_disclaimer }} />
        </MessageViewContainer>
        <StyledBodyCopy
          text="PERSONAL INFORMATION"
          fontSize="fs16"
          color="black"
          paddingLeft="16px"
          paddingRight="16px"
          paddingTop="34px"
          fontFamily="secondary"
          textAlign="left"
        />

        <StyledBodyCopy
          text={getLabelValue(labels, 'lbl_PLCCForm_dob')}
          mobilefontSize="fs10"
          color="gray.900"
          paddingLeft="16px"
          paddingTop="10px"
          fontFamily="secondary"
          textAlign="left"
          fontWeight="extrabold"
        />
        <PersonalInformationContainerView>
          <DateContainerView>
            <Field
              id="month"
              name="month"
              bounces={false}
              component={DropDown}
              data={months}
              variation="secondary"
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
              onValueChange={itemValue => {
                dispatch(change('PLCCForm', 'month', itemValue));
                this.setState({ month: itemValue });
              }}
              selectedValue={month}
            />
            <DropDownContainer>
              <Field label="" component={TextBox} title="" type="hidden" id="month" name="month" />
            </DropDownContainer>
          </DateContainerView>

          <DateContainerView>
            <Field
              id="date"
              name="date"
              bounces={false}
              component={DropDown}
              data={this.date}
              variation="secondary"
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
              selectedValue={date}
              onValueChange={itemValue => {
                dispatch(change('PLCCForm', 'date', itemValue));
                this.setState({ date: itemValue });
              }}
            />
            <DropDownContainer>
              <Field label="" component={TextBox} title="" type="hidden" id="date" name="date" />
            </DropDownContainer>
          </DateContainerView>
          <DateContainerView>
            <Field
              id="year"
              name="year"
              bounces={false}
              component={DropDown}
              data={this.year}
              variation="secondary"
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
              onValueChange={itemValue => {
                dispatch(change('PLCCForm', 'year', itemValue));
                this.setState({ year: itemValue });
              }}
              selectedValue={year}
            />
            <DropDownContainer>
              <Field label="" component={TextBox} title="" type="hidden" id="year" name="year" />
            </DropDownContainer>
          </DateContainerView>
        </PersonalInformationContainerView>

        <SSNContainer>
          <Field
            name="ssNumber"
            id="ssNumber"
            label={getLabelValue(labels, 'lbl_PLCCForm_ssn')}
            type="tel"
            component={TextBox}
            maxLength={4}
            keyboardType="numeric"
          />
        </SSNContainer>

        <MessageViewContainer height="635px">
          <RichText source={{ html: plccData && plccData.account_classified_disclaimer }} />
        </MessageViewContainer>

        <MessageViewContainer height="300px">
          <RichText source={{ html: plccData && plccData.electronic_consent }} />
        </MessageViewContainer>

        <StyledBodyCopy
          text={getLabelValue(labels, 'lbl_PLCCForm_financialTermsHeading')}
          fontSize="fs16"
          color="black"
          fontWeight="semibold"
          paddingLeft="16px"
          paddingRight="16px"
          paddingTop="34px"
          fontFamily="secondary"
          textAlign="left"
        />

        <MessageViewContainer height="900px">
          <RichText
            source={{ uri: 'https://comenity.net/childrensplace/common/Legal/disclosures.xhtml' }}
          />
        </MessageViewContainer>

        <CheckBoxContainerView>
          <CheckBoxImage>
            <Field id="iAgree" name="iAgree" component={InputCheckbox} enableSuccessCheck={false} />
          </CheckBoxImage>
          <CheckMessageView>
            <StyledBodyCopy
              text={getLabelValue(labels, 'lbl_PLCCForm_iAgreeCheckboxText')}
              fontSize="fs12"
              color="black"
              fontFamily="secondary"
              textAlign="left"
            />
            <FieldContainer>
              <Field
                label=""
                component={TextBox}
                title=""
                type="hidden"
                id="iAgree"
                name="iAgree"
              />
            </FieldContainer>
          </CheckMessageView>
        </CheckBoxContainerView>

        <ButtonWrapper>
          <Button
            fill="BLUE"
            type="submit"
            onPress={handleSubmit}
            color="white"
            text={getLabelValue(labels, 'lbl_PLCCForm_submitButton')}
            width="90%"
          />

          <StyledAnchor
            fontSizeVariation="large"
            underline
            text={getLabelValue(labels, 'lbl_PLCCForm_noThanks')}
            paddingTop="40px"
            paddingBottom="60px"
            onPress={toggleModal}
            url=""
          />
        </ButtonWrapper>
      </ScrollViewContainer>
    );
  }
}

const validateMethod = createValidateMethod(
  getStandardConfig([
    'firstName',
    'lastName',
    'addressLine1',
    'city',
    'statewocountry',
    'date',
    'month',
    'year',
    'ssNumber',
    'preScreenCode',
    'noCountryZip',
    'emailAddress',
    'iAgree',
    'phoneNumberWithAlt',
  ])
);

PLCCForm.propTypes = {
  setLoginModalMountState: PropTypes.bool.isRequired,
  plccData: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  profileInfo: PropTypes.shape({}).isRequired,
  approvedPLCCData: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.shape({}).isRequired,
};

export default reduxForm({
  form: 'PLCCForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(PLCCForm);
