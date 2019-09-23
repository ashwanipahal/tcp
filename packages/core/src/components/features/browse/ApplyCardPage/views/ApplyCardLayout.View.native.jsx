/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import ModalNative from '../../../../common/molecules/Modal';
import { RichText, Button } from '../../../../common/atoms';
import TextBox from '../../../../common/atoms/TextBox';
import InputCheckbox from '../../../../common/atoms/InputCheckbox/views/InputCheckbox.native';
import DropDown from '../../../../common/atoms/DropDown/views/DropDown.native';
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
} from '../styles/ApplyCardPage.style.native';
import { CAcountriesStatesTable, UScountriesStatesTable } from '../CountriesAndStates.constants';
import { getLabelValue } from '../../../../../utils';

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
  constructor(props) {
    super(props);

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
    };

    this.locationRef = null;
  }

  onClose = () => {
    const { setLoginModalMountState } = this.props;
    setLoginModalMountState({ state: false });
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const fullWidth = {
      width: '100%',
    };

    const { applyCard, toggleModal, plccData, labels } = this.props;
    const { country, dropDownItem } = this.state;

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
          <TextBoxContainer>
            <Field
              name="Enter Pre-Screen Code (optional)"
              id="firstName"
              label="Enter Pre-Screen Code (optional)"
              type="text"
              component={TextBox}
              maxLength={20}
            />
          </TextBoxContainer>
          <StyledBodyCopy
            text="If you’ve received a pre-screen code, enter it here."
            fontSize="fs16"
            color="gray.700"
            paddingLeft="16px"
            paddingRight="16px"
            mobilefontFamily="secondary"
            textAlign="left"
          />
          <StyledBodyCopy
            text="CONTACT INFORMATION"
            fontSize="fs16"
            color="black"
            mobilefontFamily="secondary"
            textAlign="left"
            fontWeight="semibold"
            paddingLeft="16px"
            paddingRight="16px"
            paddingTop="26px"
            paddingBottom="12px"
          />
          <NameFieldContainer>
            <Field
              name={getLabelValue(labels, 'lbl_PLCCForm_firstName')}
              id="firstName"
              label={getLabelValue(labels, 'lbl_PLCCForm_firstName')}
              type="text"
              component={TextBox}
              maxLength={20}
            />
          </NameFieldContainer>
          <NameFieldContainer>
            <Field
              name="lastName"
              id="Last Name"
              label="lastName"
              type="text"
              component={TextBox}
              maxLength={20}
            />
          </NameFieldContainer>
          <NameFieldContainer>
            <Field
              name="firstName"
              id="firstName"
              label="Email"
              type="text"
              component={TextBox}
              maxLength={20}
            />
          </NameFieldContainer>
          <NameFieldContainer>
            <Field
              name="addressName"
              id="addressName"
              label="Address Line 1"
              type="text"
              component={TextBox}
              maxLength={20}
            />
          </NameFieldContainer>
          <NameFieldContainer>
            <Field
              name="address2Name"
              id="address2Name"
              label="Address Line 2 (optional)"
              type="text"
              component={TextBox}
              maxLength={20}
            />
          </NameFieldContainer>
          <NameFieldContainer>
            <Field
              name="cityName"
              id="cityName"
              label="City"
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
                data={country === 'CA' ? this.CAcountriesStates : this.UScountriesStates}
                variation="secondary"
                dropDownStyle={{ ...dropDownStyle }}
                itemStyle={{ ...itemStyle }}
                selectedValue={dropDownItem}
              />
            </StateContainerView>
            <ZipContainerView>
              <Field
                name="zipcode"
                id="zipCode"
                label="Zipcode"
                type="text"
                component={TextBox}
                maxLength={20}
              />
            </ZipContainerView>
          </ContainerView>
          <NameFieldContainer>
            <Field
              name="mobileName"
              id="mobileName"
              label="Phone Number*"
              type="tel"
              component={TextBox}
              maxLength={20}
            />
          </NameFieldContainer>
          <NameFieldContainer>
            <Field
              name="mobileName"
              id="mobileName"
              label="Alternate Phone Number*"
              type="tel"
              component={TextBox}
              maxLength={20}
            />
          </NameFieldContainer>
          <StyledBodyCopy
            text="At least one phone number is required."
            fontSize="fs10"
            color="gray.900"
            paddingLeft="16px"
            paddingRight="16px"
            mobilefontFamily="secondary"
            textAlign="left"
          />
          <MessageViewContainer height="100px">
            <StyledBodyCopy
              text="*By providing your contact information above, including any cellular or other phone numbers, you agree to be contacted regarding any of your Comenity Bank or Comenity Capital Bank accounts via calls to cell phones, text messages or telephone calls, including the use of artificial or pre-recorded message calls, as well as calls made via automatic telephone dialing systems, or via e-mail."
              fontSize="fs12"
              color="black"
              paddingLeft="16px"
              paddingRight="16px"
              paddingTop="16px"
              paddingBottom="16px"
              mobilefontFamily="secondary"
              textAlign="left"
            />
          </MessageViewContainer>
          <StyledBodyCopy
            text="PERSONAL INFORMATION"
            fontSize="fs16"
            color="black"
            paddingLeft="16px"
            paddingRight="16px"
            paddingTop="34px"
            mobilefontFamily="secondary"
            textAlign="left"
          />
          <PersonalInformationContainerView>
            <DateContainerView>
              <Field
                bounces={false}
                component={DropDown}
                heading="MM"
                data={country === 'CA' ? this.CAcountriesStates : this.UScountriesStates}
                variation="secondary"
                dropDownStyle={{ ...dropDownStyle }}
                itemStyle={{ ...itemStyle }}
                selectedValue={dropDownItem}
              />
            </DateContainerView>

            <DateContainerView>
              <Field
                bounces={false}
                component={DropDown}
                heading="DD"
                data={country === 'CA' ? this.CAcountriesStates : this.UScountriesStates}
                variation="secondary"
                dropDownStyle={{ ...dropDownStyle }}
                itemStyle={{ ...itemStyle }}
                selectedValue={dropDownItem}
              />
            </DateContainerView>
            <DateContainerView>
              <Field
                bounces={false}
                component={DropDown}
                heading="YYYY"
                data={country === 'CA' ? this.CAcountriesStates : this.UScountriesStates}
                variation="secondary"
                dropDownStyle={{ ...dropDownStyle }}
                itemStyle={{ ...itemStyle }}
                selectedValue={dropDownItem}
              />
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

          <MessageViewContainer height="635px">
            <StyledBodyCopy
              text="*By providing your contact information above, including any cellular or other phone numbers, you agree to be contacted regarding any of your Comenity Bank or Comenity Capital Bank accounts via calls to cell phones, text messages or telephone calls, including the use of artificial or pre-recorded message calls, as well as calls made via automatic telephone dialing systems, or via e-mail."
              fontSize="fs12"
              color="black"
              paddingLeft="16px"
              paddingRight="16px"
              paddingTop="16px"
              paddingBottom="16px"
              mobilefontFamily="secondary"
              textAlign="left"
            />
          </MessageViewContainer>

          <StyledBodyCopy
            text="Electronic Consent"
            fontSize="fs16"
            color="black"
            fontWeight="semibold"
            paddingLeft="16px"
            paddingRight="16px"
            paddingTop="34px"
            mobilefontFamily="secondary"
            textAlign="left"
          />

          <MessageViewContainer height="441px">
            <StyledBodyCopy
              text="*By providing your contact information above, including any cellular or other phone numbers, you agree to be contacted regarding any of your Comenity Bank or Comenity Capital Bank accounts via calls to cell phones, text messages or telephone calls, including the use of artificial or pre-recorded message calls, as well as calls made via automatic telephone dialing systems, or via e-mail."
              fontSize="fs12"
              color="black"
              paddingLeft="16px"
              paddingRight="16px"
              paddingTop="16px"
              paddingBottom="16px"
              mobilefontFamily="secondary"
              textAlign="left"
            />
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
            <StyledBodyCopy
              text="*By providing your contact information above, including any cellular or other phone numbers, you agree to be contacted regarding any of your Comenity Bank or Comenity Capital Bank accounts via calls to cell phones, text messages or telephone calls, including the use of artificial or pre-recorded message calls, as well as calls made via automatic telephone dialing systems, or via e-mail."
              fontSize="fs12"
              color="black"
              paddingLeft="16px"
              paddingRight="16px"
              paddingTop="16px"
              paddingBottom="16px"
              mobilefontFamily="secondary"
              textAlign="left"
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
                text="*By providing your contact information above, including any cellular or other phone numbers, you agree to be contacted regarding any of your Comenity Bank or Comenity Capital Bank accounts via calls to cell phones, text messages or telephone calls, including the use of artificial or pre-recorded message calls, as well as calls made via automatic telephone dialing systems, or via e-mail."
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
              color="white"
              buttonVariation="variable-width"
              text="SUBMIT TO OPEN AN ACCOUNT"
              width="90%"
            />
          </ButtonWrapper>
        </ScrollViewContainer>
      </ModalNative>
    );
  }
}

ApplyCardLayoutView.propTypes = {
  setLoginModalMountState: PropTypes.bool.isRequired,
  plccData: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  profileInfo: PropTypes.shape({}).isRequired,
  approvedPLCCData: PropTypes.shape({}).isRequired,
};

export default reduxForm({
  form: 'ApplyCardForm', // a unique identifier for this form
  enableReinitialize: true,
})(ApplyCardLayoutView);

export { ApplyCardLayoutView as ApplyCardLayoutViewVanilla };
