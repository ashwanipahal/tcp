import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import styles from '../styles/MyPrefrence.style';
import withStyles from '../../../../common/hoc/withStyles';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Anchor from '../../../../common/atoms/Anchor';
import SocialContainer from '../../../../common/organisms/SocialAccount/container/Social.container';
import MyFavoriteStore from '../../MyProfile/organism/MyFavoriteStore';
import MyPreferenceSubscription from '../../MyPreferenceSubscription';

class MyPrefrenceSection extends React.PureComponent {
  render() {
    const { className, labels, urlParams } = this.props;

    return (
      <div className={`elem-pt-LRG ${className}`}>
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              medium: 5,
              large: 5,
            }}
            className="profileInfoCol"
          >
            <BodyCopy
              className="elem-mb-MED"
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="extrabold"
            >
              <MyFavoriteStore isMyPreferences />
            </BodyCopy>
          </Col>
          <Col
            colSize={{
              small: 6,
              medium: 4,
              large: 7,
            }}
            className="profileInfoCol"
          >
            <BodyCopy
              className="elem-mb-MED"
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="extrabold"
              data-locator="mypreference-socialaccountheader"
            >
              {getLabelValue(labels, 'lbl_prefrence_social_account')}
            </BodyCopy>
            <SocialContainer labels={labels} urlParams={urlParams} />
          </Col>
        </Row>

        <Row fullBleed className="hide-on-mobile elem-pt-LRG elem-pb-LRG">
          <Col
            colSize={{
              large: 12,
            }}
            className="profileInfoSeparator"
          />
        </Row>

        <MyPreferenceSubscription labels={labels} />

        <Row fullBleed className="elem-pt-LRG">
          <Col
            colSize={{
              small: 6,
              medium: 4,
              large: 12,
            }}
          >
            <BodyCopy textAlign="center">
              <Anchor
                url="learn_more_link"
                fontSizeVariation="large"
                anchorVariation="primary"
                underline
                target="_blank"
                className="favtPageLink"
                data-locator="myprefernce-progdetaillink"
              >
                {getLabelValue(labels, 'lbl_prefrence_program_details')}
              </Anchor>
              <Anchor
                url="learn_more_link"
                fontSizeVariation="large"
                anchorVariation="primary"
                underline
                target="_blank"
                className="favtPageLink"
                data-locator="mypreference-tandclink"
              >
                {getLabelValue(labels, 'lbl_prefrence_term_codition')}
              </Anchor>
            </BodyCopy>
          </Col>
        </Row>
      </div>
    );
  }
}

MyPrefrenceSection.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string.isRequired,
  urlParams: PropTypes.shape({}),
};

MyPrefrenceSection.defaultProps = {
  labels: {},
  urlParams: {},
};

export default withStyles(MyPrefrenceSection, styles);
export { MyPrefrenceSection as MyPrefrenceSectionVanilla };
