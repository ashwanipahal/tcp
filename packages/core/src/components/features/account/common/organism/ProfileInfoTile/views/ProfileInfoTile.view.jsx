import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, BodyCopy } from '../../../../../../common/atoms';
import Anchor from '../../../../../../common/atoms/Anchor';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/ProfileInfoTile.style';

import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';
import Address from '../../../../../../common/molecules/Address';
import internalEndpoints from '../../../internalEndpoints';
import { isCanada } from '../../../../../../../utils';

const ProfileInfoTile = ({ labels, profileInfo }) => {
  const { firstName, lastName, emailAddress, rewardsAccountNumber, address } = profileInfo;
  const isCA = isCanada();
  return (
    <AccountOverviewTile
      title={labels.lbl_overview_profileInformationHeading}
      ctaTitle={labels.lbl_overview_profileInfoViewCTA}
      dataLocatorPrefix="profileInfo"
      ctaLink="/account?id=profile"
      ctaPath="/account/profile"
    >
      <BodyCopy component="div">
        <Row fullBleed className="heading">
          <Col
            colSize={{
              small: 5,
              large: 10,
              medium: 6,
            }}
          >
            <BodyCopy
              component="div"
              data-locator="username"
              fontSize="fs14"
              fontWeight="extrabold"
              fontFamily="secondary"
            >
              {firstName}
              {` `}
              {lastName}
            </BodyCopy>
            {!isCA && (
              <BodyCopy
                component="div"
                data-locator="memberLbl"
                fontSize="fs14"
                fontFamily="secondary"
              >
                {`${labels.lbl_overview_profileInfoMember} `}
                <BodyCopy
                  component="span"
                  data-locator="memberId"
                  fontSize="fs14"
                  fontFamily="secondary"
                >
                  {rewardsAccountNumber}
                </BodyCopy>
              </BodyCopy>
            )}
            <BodyCopy component="div" className="elem-mt-LRG">
              <BodyCopy
                component="div"
                data-locator="emailLbl"
                fontSize="fs14"
                fontFamily="secondary"
              >
                {labels.lbl_overview_profileInfoEmailAddress}
              </BodyCopy>
              <BodyCopy
                component="span"
                data-locator="emailValue"
                fontSize="fs14"
                fontFamily="secondary"
              >
                {emailAddress}
              </BodyCopy>
            </BodyCopy>
          </Col>
          <Col
            colSize={{
              small: 1,
              large: 2,
              medium: 2,
            }}
          >
            <BodyCopy textAlign="right" component="div">
              <Anchor
                fontSizeVariation="large"
                underline
                anchorVariation="primary"
                to="/account?id=profile"
                asPath="/account/profile"
                data-locator="userdetailsEditLnk"
              >
                {labels.lbl_overview_profileInfoEditCTA}
              </Anchor>
            </BodyCopy>
          </Col>
        </Row>
        <Row fullBleed className="heading elem-pt-LRG">
          <Col
            colSize={{
              small: 5,
              large: 10,
              medium: 6,
            }}
          >
            <BodyCopy
              component="div"
              fontSize="fs14"
              data-locator="mailingAddressLbl"
              fontWeight="extrabold"
              fontFamily="secondary"
            >
              {labels.lbl_overview_profileInfoMailingAddress}
            </BodyCopy>
            <BodyCopy data-locator="mailingAddressValue" component="div">
              <Address
                dataLocatorPrefix="mailingAddress"
                showName={false}
                showPhone={false}
                showCountry={false}
                address={address}
              />
            </BodyCopy>
          </Col>
          <Col
            colSize={{
              small: 1,
              large: 2,
              medium: 2,
            }}
          >
            <BodyCopy textAlign="right" component="div">
              <Anchor
                fontSizeVariation="large"
                underline
                anchorVariation="primary"
                to="/account?id=profile"
                asPath="/account/profile"
                data-locator="mailingAddressEditLnk"
              >
                {labels.lbl_overview_profileInfoEditCTA}
              </Anchor>
            </BodyCopy>
          </Col>
        </Row>
        <Row fullBleed className="elem-pt-LRG">
          <Col
            colSize={{
              small: 4,
              large: 10,
              medium: 6,
            }}
          >
            <BodyCopy
              component="div"
              data-locator="passwordLbl"
              fontSize="fs14"
              fontWeight="extrabold"
              fontFamily="secondary"
            >
              {labels.lbl_overview_profileInfoPassword}
            </BodyCopy>
            <BodyCopy
              component="div"
              data-locator="passwordValue"
              fontSize="fs14"
              fontWeight="extrabold"
              fontFamily="secondary"
            >
              **********
            </BodyCopy>
          </Col>
          <Col
            colSize={{
              small: 2,
              large: 2,
              medium: 2,
            }}
          >
            <BodyCopy textAlign="right" component="div">
              <Anchor
                fontSizeVariation="large"
                underline
                anchorVariation="primary"
                to={internalEndpoints.changePassowrdPage.link}
                asPath={internalEndpoints.changePassowrdPage.path}
                data-locator="passwordChangeLnk"
              >
                {labels.lbl_overview_profileInfoChangeCTA}
              </Anchor>
            </BodyCopy>
          </Col>
        </Row>
      </BodyCopy>
    </AccountOverviewTile>
  );
};

ProfileInfoTile.propTypes = {
  labels: PropTypes.shape({}),
  profileInfo: PropTypes.shape({}).isRequired,
};

ProfileInfoTile.defaultProps = {
  labels: {
    lbl_overview_profileInformationHeading: '',
    lbl_overview_profileInfoEditCTA: '',
    lbl_overview_profileInfoMember: '',
    lbl_overview_profileInfoEmailAddress: '',
    lbl_overview_profileInfoMailingAddress: '',
    lbl_overview_profileInfoPassword: '',
    lbl_overview_profileInfoChangeCTA: '',
    lbl_overview_profileInfoViewCTA: '',
  },
};

export default withStyles(ProfileInfoTile, styles);
