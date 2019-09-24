/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import { getAddressFromPlace } from '@tcp/core/src/utils';
import { Field, reduxForm, change } from 'redux-form';
import ModalNative from '../../../../common/molecules/Modal';
import { RichText, Button } from '../../../../common/atoms';
import TextBox from '../../../../common/atoms/TextBox';
import InputCheckbox from '../../../../common/atoms/InputCheckbox/views/InputCheckbox.native';
import DropDown from '../../../../common/atoms/DropDown/views/DropDown.native';
import { calendarDaysMap, calendarYearsMap } from '../utils/DateOfBirthHelper';
import { MONTH_OPTIONS_MAP_WITH_EMPTY as months } from '../RewardsCard.constants';
import { GooglePlacesInput } from '../../../../common/atoms/GoogleAutoSuggest/AutoCompleteComponent.native';
import createValidateMethod from '../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../utils/formValidation/validatorStandardConfig';

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
} from '../styles/ApplyCardPage.style.native';
import { CAcountriesStatesTable, UScountriesStatesTable } from '../CountriesAndStates.constants';
import { getLabelValue, getSiteId } from '../../../../../utils';

const headerImage = require('../../../../../../../core/src/assets/tcp-cc.png');

const dropDownStyle = {
  height: 28,
  border: 1,
};

const itemStyle = {
  height: 41,
  paddingLeft: 6,
  color: 'black',
};

class ApplyCardLayoutView extends React.PureComponent<Props> {
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

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      country: 'US',
      // eslint-disable-next-line react/no-unused-state
      dropDownItem: props.countryState ? props.countryState : this.UScountriesStates[0].displayName,
      isPreScreen: false,
      date: null,
      month: null,
      year: null,
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
    dispatch(change('ApplyCardForm', 'city', address.city));
    dispatch(change('ApplyCardForm', 'noCountryZip', address.zip));
    dispatch(change('ApplyCardForm', 'statewocountry', address.state));
    dispatch(change('ApplyCardForm', 'addressLine1', address.street));
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
    const fullWidth = {
      width: '100%',
    };

    const { applyCard, toggleModal, plccData, labels, handleSubmit, dispatch } = this.props;
    const { dropDownItem, isPreScreen, date, month, year } = this.state;

    return (
      <ModalNative
        onRequestClose={toggleModal}
        horizontalBar={false}
        headingAlign="center"
        headingFontFamily="secondary"
        fontSize="fs22"
        headerStyle={fullWidth}
        isOpen={applyCard}
      >
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
              fontSize="fs16"
              color="gray.700"
              paddingLeft="16px"
              mobilefontFamily="secondary"
              textAlign="center"
            />

            {!isPreScreen ? (
              <StyledAnchor
                onPress={() => this.togglePreScreen()}
                fontSizeVariation="large"
                underline
                text={getLabelValue(labels, 'lbl_PLCCForm_clickHere')}
                paddingRight="16px"
              />
            ) : (
              <StyledBodyCopy
                text={getLabelValue(labels, 'lbl_PLCCForm_enterHere')}
                fontSize="fs16"
                color="gray.700"
                textAlign="center"
              />
            )}
          </PreScreenCodeContainer>

          <StyledBodyCopy
            text="CONTACT INFORMATION"
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
              dataLocator="addnewaddress-addressl1"
            />
            <Field
              label=""
              component={TextBox}
              title=""
              type="hidden"
              id="addressLine1"
              name="addressLine1"
            />
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
                bounces={false}
                component={DropDown}
                heading="State"
                data={this.siteId === 'us' ? this.UScountriesStates : this.CAcountriesStates}
                variation="secondary"
                dropDownStyle={{ ...dropDownStyle }}
                itemStyle={{ ...itemStyle }}
                selectedValue={dropDownItem}
                onValueChange={itemValue => {
                  dispatch(change('ApplyCardForm', 'statewocountry', itemValue));
                  this.setState({ dropDownItem: itemValue });
                }}
              />
              <Field
                label=""
                component={TextBox}
                title=""
                type="hidden"
                id="statewocountry"
                name="statewocountry"
              />
            </StateContainerView>
            <ZipContainerView>
              <Field
                name="noCountryZip"
                id="noCountryZip"
                label={getLabelValue(labels, 'lbl_PLCCForm_zipCode')}
                type="text"
                component={TextBox}
                maxLength={5}
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
              maxLength={20}
            />
          </NameFieldContainer>
          <NameFieldContainer>
            <Field
              name="altPhoneNumber"
              id="altPhoneNumber"
              label={getLabelValue(labels, 'lbl_PLCCForm_alternatePhone')}
              type="tel"
              component={TextBox}
              maxLength={20}
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
          <MessageViewContainer height="70px">
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
            fontSize="fs10"
            color="gray.900"
            paddingLeft="16px"
            paddingTop="10px"
            paddingBottom="-15px"
            fontFamily="secondary"
            textAlign="left"
            fontWeight="extrabold"
          />
          <PersonalInformationContainerView>
            <DateContainerView>
              <Field
                bounces={false}
                component={DropDown}
                heading="YY"
                data={months}
                variation="secondary"
                dropDownStyle={{ ...dropDownStyle }}
                itemStyle={{ ...itemStyle }}
                onValueChange={itemValue => {
                  dispatch(change('ApplyCardForm', 'month', itemValue));
                  this.setState({ month: itemValue });
                }}
                selectedValue={month}
              />
              <Field label="" component={TextBox} title="" type="hidden" id="month" name="month" />
            </DateContainerView>

            <DateContainerView>
              <Field
                heading="DD"
                bounces={false}
                component={DropDown}
                data={calendarDaysMap()}
                variation="secondary"
                dropDownStyle={{ ...dropDownStyle }}
                itemStyle={{ ...itemStyle }}
                selectedValue={date}
                onValueChange={itemValue => {
                  dispatch(change('ApplyCardForm', 'date', itemValue));
                  this.setState({ date: itemValue });
                }}
              />
              <Field label="" component={TextBox} title="" type="hidden" id="date" name="date" />
            </DateContainerView>
            <DateContainerView>
              <Field
                heading="YYYY"
                bounces={false}
                component={DropDown}
                data={calendarYearsMap()}
                variation="secondary"
                dropDownStyle={{ ...dropDownStyle }}
                itemStyle={{ ...itemStyle }}
                onValueChange={itemValue => {
                  dispatch(change('ApplyCardForm', 'year', itemValue));
                  this.setState({ year: itemValue });
                }}
                selectedValue={year}
              />
              <Field label="" component={TextBox} title="" type="hidden" id="year" name="year" />
            </DateContainerView>
          </PersonalInformationContainerView>

          <NameFieldContainer>
            <Field
              name="ssnName"
              id="ssnName"
              label="Last 4 Digits of SSN"
              type="tel"
              component={TextBox}
              maxLength={20}
            />
          </NameFieldContainer>

          <MessageViewContainer height="430px">
            <RichText source={{ html: plccData && plccData.account_classified_disclaimer }} />
          </MessageViewContainer>

          <MessageViewContainer height="300px">
            <RichText source={{ html: plccData && plccData.electronic_consent }} />
          </MessageViewContainer>

          <StyledBodyCopy
            text="Financial Terms of Your Account"
            fontSize="fs16"
            color="black"
            fontWeight="semibold"
            paddingLeft="16px"
            paddingRight="16px"
            paddingTop="34px"
            mobilefontFamily="secondary"
            textAlign="left"
          />

          <MessageViewContainer height="900px">
            <RichText
              source={{ uri: 'https://comenity.net/childrensplace/common/Legal/disclosures.xhtml' }}
            />
          </MessageViewContainer>

          <CheckBoxContainerView>
            <CheckBoxImage>
              <Field
                name="checkUpdate"
                component={InputCheckbox}
                enableSuccessCheck={false}
                // onChange={() => this.handleChange()}
              />
            </CheckBoxImage>
            <CheckMessageView>
              <StyledBodyCopy
                text={getLabelValue(labels, 'lbl_PLCCForm_iAgreeCheckboxText')}
                fontSize="fs10"
                color="black"
                mobilefontFamily="secondary"
                textAlign="left"
                lineHeight="15px"
              />
            </CheckMessageView>
          </CheckBoxContainerView>

          <ButtonWrapper>
            <Button
              fill="BLUE"
              type="submit"
              onPress={handleSubmit}
              color="white"
              buttonVariation="variable-width"
              text={getLabelValue(labels, 'lbl_PLCCForm_submitButton')}
              width="90%"
            />

            <StyledAnchor
              fontSizeVariation="large"
              underline
              text={getLabelValue(labels, 'lbl_PLCCForm_noThanks')}
              paddingTop="40px"
              onPress={toggleModal}
            />
          </ButtonWrapper>
        </ScrollViewContainer>
      </ModalNative>
    );
  }
}

const validateMethod = createValidateMethod(
  getStandardConfig([
    'firstName',
    'lastName',
    'addressLine1',
    'addressLine2',
    'city',
    'statewocountry',
    'date',
    'month',
    'year',
    'ssNumber',
    'preScreenCode',
    'noCountryZip',
    'emailAddress',
    'confirmEmailAddress',
    'password',
    'confirmPassword',
    'iAgree',
    'phoneNumberWithAlt',
    'altPhoneNumber',
  ])
);

ApplyCardLayoutView.propTypes = {
  setLoginModalMountState: PropTypes.bool.isRequired,
  plccData: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  profileInfo: PropTypes.shape({}).isRequired,
  approvedPLCCData: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.shape({}).isRequired,
};

export default reduxForm({
  form: 'ApplyCardForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(ApplyCardLayoutView);

export { ApplyCardLayoutView as ApplyCardLayoutViewVanilla };
