import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Anchor from '../../../../../../common/atoms/Anchor/views/Anchor';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/ProfileInformation.style';
import ProfileInfoActions from '../../ProfileInfoActions/views';
import PersonalInformation from '../../PersonalInformation/views';
import ChangePasswordInfo from '../../ChangePasswordInfo/views';
import BirthdaySaving from '../../BirthdaySaving/views';
import AboutYouInfo from '../../AboutYouInfo';
import MyFavoriteStore from '../../MyFavoriteStore';

class ProfileInformation extends React.PureComponent {
  constructor(props) {
    super(props);
    const url = new URL(window.location.href);
    const isSurvey = url.searchParams.get('survey');
    if (isSurvey) {
      this.state = {
        mountSurveyModal: true,
      };
    } else {
      this.state = {
        mountSurveyModal: false,
      };
    }
  }

  toggleModalState = e => {
    const { mountSurveyModal } = this.state;
    this.setState({ mountSurveyModal: !mountSurveyModal });
    if (e) {
      e.preventDefault();
    }
  };

  render() {
    const {
      className,
      labels,
      profileCompletion,
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
      defaultStore,
      successMessage,
      childrenBirthdays,
      ...otherProps
    } = this.props;

    const { mountSurveyModal } = this.state;
    return (
      <div className={className}>
        {successMessage && (
          <Notification
            className="elem-mt-MED"
            status="success"
            colSize={{ large: 12, medium: 8, small: 6 }}
            message={labels[`lbl_profile_${successMessage}`]}
          />
        )}
        <Row fullBleed className="elem-pt-LRG">
          <Col
            colSize={{
              small: 6,
              medium: 4,
              large: 6,
            }}
            ignoreGutter={{
              small: true,
            }}
            className="profileInfoCol"
          >
            <ProfileInfoActions
              labels={labels}
              /* isCanada={isCanada}
            onEditPersonalInfo={this.handleEditPersonalInfo}
            onEditMailingAddress={this.handleEditMailingAddress} */
              toggleModalState={this.toggleModalState}
              profileCompletion={profileCompletion}
              defaultStore={defaultStore}
              mailingAddress={mailingAddress}
              userBirthday={userBirthday}
              userSurvey={userSurvey}
              percentageIncrement={percentageIncrement}
              mountSurveyModal={mountSurveyModal}
              {...otherProps}
            />
          </Col>
          <Col
            colSize={{
              small: 6,
              medium: 4,
              large: 6,
            }}
            ignoreGutter={{
              small: true,
            }}
            className="profileInfoCol"
          >
            <PersonalInformation
              labels={labels}
              profileInfoTile={profileInfoTile}
              userEmail={userEmail}
              userBirthday={userBirthday}
              userFullName={userFullName}
              userPhoneNumber={userPhoneNumber}
              airMiles={airMiles}
              myPlaceNumber={myPlaceNumber}
            />
          </Col>
        </Row>

        <Row fullBleed className="hideOnMobile elem-pt-LRG elem-pb-LRG">
          <Col
            colSize={{
              large: 12,
            }}
            className="profileInfoSeparator"
          />
        </Row>

        <Row fullBleed className="elem-pt-LRG">
          <Col
            colSize={{
              small: 6,
              medium: 4,
              large: 6,
            }}
            ignoreGutter={{
              small: true,
            }}
            className="profileInfoCol elem-mb-XL"
          >
            <ChangePasswordInfo labels={labels} />
          </Col>

          <Col
            colSize={{
              small: 6,
              medium: 4,
              large: 6,
            }}
            ignoreGutter={{
              small: true,
            }}
            className="profileInfoCol elem-mb-XL"
          >
            <BirthdaySaving labels={labels} childrenBirthdays={childrenBirthdays} />
          </Col>
        </Row>

        <Row fullBleed className="hideOnMobile elem-pt-LRG elem-pb-LRG">
          <Col
            colSize={{
              large: 12,
            }}
            className="profileInfoSeparator"
          />
        </Row>
        <Row fullBleed className="elem-pt-LRG">
          {defaultStore && (
            <Col
              colSize={{
                small: 6,
                medium: 4,
                large: 6,
              }}
              ignoreGutter={{
                small: true,
              }}
              className="profileInfoCol elem-mb-XL"
            >
              <MyFavoriteStore />
            </Col>
          )}
          {userSurvey && userSurvey.getIn(['0', '0']) && (
            <Col
              colSize={{
                small: 6,
                medium: 4,
                large: 6,
              }}
              ignoreGutter={{
                small: true,
              }}
              className="profileInfoCol elem-mb-XL"
            >
              <AboutYouInfo labels={labels} userSurvey={userSurvey} />
            </Col>
          )}
        </Row>
        <Row fullBleed className="elem-pb-MED">
          <Col
            colSize={{
              large: 2,
              medium: 2,
              small: 2,
            }}
            offsetLeft={{
              large: 4,
              medium: 2,
              small: 1,
            }}
          >
            <Anchor fontSizeVariation="medium" underline anchorVariation="primary" to="/#" asPath>
              {getLabelValue(labels, 'lbl_profile_program_details')}
            </Anchor>
          </Col>
          <Col
            colSize={{
              large: 2,
              medium: 2,
              small: 2,
            }}
          >
            <Anchor fontSizeVariation="medium" underline anchorVariation="primary" to="/#" asPath>
              {getLabelValue(labels, 'lbl_profile_terms_condition')}
            </Anchor>
          </Col>
        </Row>
      </div>
    );
  }
}

ProfileInformation.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
  profileCompletion: PropTypes.string,
  mailingAddress: PropTypes.shape({}),
  profileInfoTile: PropTypes.shape({}),
  userBirthday: PropTypes.string,
  userEmail: PropTypes.string,
  airMiles: PropTypes.string,
  myPlaceNumber: PropTypes.string,
  userFullName: PropTypes.string,
  userPhoneNumber: PropTypes.number,
  userSurvey: PropTypes.shape([]),
  percentageIncrement: PropTypes.shape({}),
  defaultStore: PropTypes.string,
  successMessage: PropTypes.string,
  childrenBirthdays: PropTypes.shape({}),
};

ProfileInformation.defaultProps = {
  className: '',
  labels: {},
  profileCompletion: '',
  mailingAddress: {},
  profileInfoTile: {},
  userBirthday: '',
  userEmail: '',
  userFullName: '',
  userPhoneNumber: '',
  airMiles: '',
  myPlaceNumber: '',
  userSurvey: [],
  percentageIncrement: {},
  defaultStore: '',
  successMessage: '',
  childrenBirthdays: fromJS([]),
};

export default withStyles(ProfileInformation, styles);
export { ProfileInformation as ProfileInformationvanilla };
