import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Anchor from '../../../../../../common/atoms/Anchor/views/Anchor';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/ProfileInformation.style';
import ProfileInfoActions from '../../ProfileInfoActions/views';
import PersonalInformation from '../../PersonalInformation/views';
import ChangePassword from '../../ChangePassword/views';
import BirthdaySaving from '../../BirthdaySaving/views';

const ProfileInformation = ({
  className,
  labels,
  profileCompletion,
  mailingAddress,
  userBirthday,
  userSurvey,
  percentageIncrement,
  defaultStore,
}) => {
  return (
    <div>
      <Row fullBleed className={`${className} elem-pt-LRG`}>
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
          <ProfileInfoActions
            labels={labels}
            /* isCanada={isCanada}
            onEditPersonalInfo={this.handleEditPersonalInfo}
            toggleModalState={this.toggleModalState}
            onEditMailingAddress={this.handleEditMailingAddress} */
            profileCompletion={profileCompletion}
            defaultStore={defaultStore}
            mailingAddress={mailingAddress}
            userBirthday={userBirthday}
            userSurvey={userSurvey}
            percentageIncrement={percentageIncrement}
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
          className="profileInfoCol elem-mb-XL"
        >
          <PersonalInformation labels={labels} />
        </Col>
      </Row>

      <Row fullBleed className={`${className} elem-pt-LRG elem-pb-LRG`}>
        <Col
          colSize={{
            large: 12,
          }}
          className="profileInfoSeparator"
        />
      </Row>

      <Row fullBleed className={`${className} elem-pt-LRG`}>
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
          <ChangePassword labels={labels} />
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
          <BirthdaySaving labels={labels} />
        </Col>
      </Row>
      <Row fullBleed className={`${className} elem-pb-MED`}>
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
          <Anchor
            fontSizeVariation="small"
            underline
            anchorVariation="primary"
            fontSize="fs10"
            to="/#"
            asPath
          >
            {labels.lbl_profile_program_details}
          </Anchor>
        </Col>
        <Col
          colSize={{
            large: 2,
            medium: 2,
            small: 2,
          }}
        >
          <Anchor
            fontSizeVariation="small"
            underline
            anchorVariation="primary"
            fontSize="fs10"
            to="/#"
            asPath
          >
            {labels.lbl_profile_terms_condition}
          </Anchor>
        </Col>
      </Row>
    </div>
  );
};

ProfileInformation.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
  profileCompletion: PropTypes.string,
  mailingAddress: PropTypes.shape({}),
  userBirthday: PropTypes.string,
  userSurvey: PropTypes.shape([]),
  percentageIncrement: PropTypes.string,
  defaultStore: PropTypes.string,
};

ProfileInformation.defaultProps = {
  className: '',
  labels: {},
  profileCompletion: '',
  mailingAddress: {},
  userBirthday: '',
  userSurvey: [],
  percentageIncrement: '',
  defaultStore: '',
};

export default withStyles(ProfileInformation, styles);
