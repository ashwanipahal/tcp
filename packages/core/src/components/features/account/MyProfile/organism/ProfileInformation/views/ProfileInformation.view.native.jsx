import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { fromJS } from 'immutable';
import { UrlHandler } from '../../../../../../../utils/utils.app';
import ProfileInfoActions from '../../ProfileInfoActions';
import PersonalInformation from '../../PersonalInformation';
import ChangePasswordInfo from '../../ChangePasswordInfo';
import BirthdaySaving from '../../BirthdaySaving';
import MyFavoriteStore from '../../MyFavoriteStore';
import { StyledAnchorWrapper, AnchorLeftMargin } from '../../../../common/styledWrapper';
import endpoints from '../../../../common/externalEndpoints';
import AboutYouInfo from '../../AboutYouInfo';
import MailingInformationContainer from '../../MailingInformation';
import ModalNative from '../../../../../../common/molecules/Modal';
import BirthdaySavingsPage from '../../../../BirthdaySavingsPage';

const map = {
  userAboutYourselfSurvey: 'mountSurveyModal',
  userMailing: 'mountMailingAddressModal',
  birthdaySavings: 'mountAddChildModal',
};

export class ProfileInformation extends React.PureComponent {
  constructor(props) {
    super(props);
    const { activeComponent } = this.props;

    this.state = {
      mountSurveyModal: map[activeComponent] === map.userAboutYourselfSurvey,
      mountMailingAddressModal: map[activeComponent] === map.userMailing,
      mountAddChildModal: map[activeComponent] === map.birthdaySavings,
    };
  }

  /**
   * This function is to open/close the survey modal from child components
   */
  toggleModalState = (type = '') => {
    const { [type]: currentState } = this.state;
    this.setState({ [type]: !currentState });
  };

  toggleMailingAddressModal = () => {
    this.toggleModalState('mountMailingAddressModal');
  };

  toggleAddChildModal = () => {
    this.toggleModalState('mountAddChildModal');
  };

  render() {
    const {
      labels,
      labelsObj,
      handleComponentChange,
      profileCompletion,
      defaultStore,
      mailingAddress,
      profileInfoTile,
      userEmail,
      userBirthday,
      userFullName,
      userPhoneNumber,
      airMiles,
      myPlaceNumber,
      userSurvey,
      percentageIncrement,
      childrenBirthdays,
      activeComponent,
    } = this.props;
    const { mountSurveyModal, mountMailingAddressModal, mountAddChildModal } = this.state;
    return (
      <>
        <ProfileInfoActions
          labels={labels}
          handleComponentChange={handleComponentChange}
          profileCompletion={profileCompletion}
          defaultStore={defaultStore}
          mailingAddress={mailingAddress}
          userBirthday={userBirthday}
          userSurvey={userSurvey}
          percentageIncrement={percentageIncrement}
          mountSurveyModal={mountSurveyModal}
          toggleModalState={this.toggleModalState}
        />
        <PersonalInformation
          labels={labels}
          handleComponentChange={handleComponentChange}
          profileInfoTile={profileInfoTile}
          userEmail={userEmail}
          userBirthday={userBirthday}
          userFullName={userFullName}
          userPhoneNumber={userPhoneNumber}
          airMiles={airMiles}
          myPlaceNumber={myPlaceNumber}
          toggleModalState={this.toggleModalState}
          activeComponent={activeComponent}
        />
        {userSurvey !== null && userSurvey.getIn(['0', '0']) !== '' && (
          <AboutYouInfo labels={labels} userSurvey={userSurvey} />
        )}
        <ChangePasswordInfo labels={labels} handleComponentChange={handleComponentChange} />
        {!!defaultStore && <MyFavoriteStore defaultStore={defaultStore} />}
        <BirthdaySaving
          labels={labels}
          childrenBirthdays={childrenBirthdays}
          handleComponentChange={this.toggleAddChildModal}
        />
        <BirthdaySavingsPage
          mountAddChildModal={mountAddChildModal}
          handleComponentChange={this.toggleAddChildModal}
        />
        <StyledAnchorWrapper>
          <Anchor
            fontSizeVariation="medium"
            underline
            onPress={() => {
              UrlHandler(endpoints.myPlaceRewardsPage);
            }}
            anchorVariation="primary"
            data-locator="my-rewards-program-details"
            text={labels.lbl_profile_program_details}
          />
          <AnchorLeftMargin>
            <Anchor
              fontSizeVariation="medium"
              underline
              noLink
              onPress={() => {
                UrlHandler(endpoints.termsAndConditionsPage);
              }}
              anchorVariation="primary"
              data-locator="my-rewards-tnc"
              text={labels.lbl_profile_terms_condition}
            />
          </AnchorLeftMargin>
        </StyledAnchorWrapper>
        {mountMailingAddressModal && (
          <ModalNative
            isOpen={mountMailingAddressModal}
            onRequestClose={this.toggleMailingAddressModal}
            heading={labelsObj.profile.lbl_profile_heading}
          >
            <ViewWithSpacing spacingStyles="margin-left-SM margin-right-SM">
              <MailingInformationContainer
                labels={labelsObj}
                onUpdateMailingAddress={this.toggleMailingAddressModal}
                onClose={this.toggleMailingAddressModal}
              />
            </ViewWithSpacing>
          </ModalNative>
        )}
      </>
    );
  }
}

ProfileInformation.propTypes = {
  labels: PropTypes.shape({}),
  labelsObj: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
  profileInfoTile: PropTypes.shape({}),
  userEmail: PropTypes.string,
  airMiles: PropTypes.string,
  myPlaceNumber: PropTypes.string,
  userFullName: PropTypes.string,
  userPhoneNumber: PropTypes.number,
  profileCompletion: PropTypes.string,
  mailingAddress: PropTypes.shape({}),
  userBirthday: PropTypes.string,
  userSurvey: PropTypes.shape([]),
  percentageIncrement: PropTypes.shape({}),
  defaultStore: PropTypes.string,
  childrenBirthdays: PropTypes.shape({}),
  activeComponent: PropTypes.string,
};

ProfileInformation.defaultProps = {
  labels: {},
  labelsObj: {},
  handleComponentChange: () => {},
  profileInfoTile: {},
  userBirthday: '',
  userEmail: '',
  userFullName: '',
  userPhoneNumber: '',
  airMiles: '',
  myPlaceNumber: '',
  profileCompletion: '',
  mailingAddress: {},
  userSurvey: [],
  percentageIncrement: {},
  defaultStore: '',
  childrenBirthdays: fromJS([]),
  activeComponent: '',
};

export default ProfileInformation;
