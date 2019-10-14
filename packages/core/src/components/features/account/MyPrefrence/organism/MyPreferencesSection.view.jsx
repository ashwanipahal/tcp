import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Field, reduxForm } from 'redux-form';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import Image from '../../../../common/atoms/Image';
import styles from '../styles/MyPrefrence.style';
import withStyles from '../../../../common/hoc/withStyles';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Anchor from '../../../../common/atoms/Anchor';
import InputCheckbox from '../../../../common/atoms/InputCheckbox';
import { getIconPath } from '../../../../../utils';
import SocialContainer from '../../../../common/organisms/SocialAccount/container/Social.container';
import MyFavoriteStore from '../../MyProfile/organism/MyFavoriteStore';

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

        <Row fullBleed className="elem-pt-LRG">
          <Col
            colSize={{
              small: 6,
              medium: 4,
              large: 5,
            }}
            className="elem-mb-XL"
          >
            <BodyCopy
              className="elem-mb-MED"
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="extrabold"
              data-locator="mypreference-Myplacerewardpreferheade"
            >
              {getLabelValue(labels, 'lbl_prefrence_rewards_prefrence')}
            </BodyCopy>

            <BodyCopy
              data-locator="mypreference-Myplacerewardprefertext"
              fontSize="fs16"
              fontFamily="secondary"
            >
              {getLabelValue(labels, 'lbl_prefrence_access_buy_online_pickup')}
            </BodyCopy>
            <BodyCopy className="elm-padding-top" fontSize="fs14" fontFamily="secondary">
              {getLabelValue(labels, 'lbl_prefrence_marketing_notification')}
            </BodyCopy>
          </Col>
          <Col
            colSize={{
              small: 6,
              medium: 4,
              large: 1,
            }}
            className="hide-on-mobile elem-mb-XL"
          />
          <Col
            colSize={{
              small: 6,
              medium: 4,
              large: 6,
            }}
            className="profileInfoCol elem-mb-XL"
          >
            <form oValidate>
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
                  className="elem-mb-XL"
                >
                  <BodyCopy
                    fontSize="fs16"
                    fontFamily="secondary"
                    fontWeight="extrabold"
                    component="span"
                  >
                    {getLabelValue(labels, 'lbl_prefrence_app_text')}
                  </BodyCopy>
                  <Image
                    class="elem-pl-XS"
                    width="17"
                    height="17"
                    src={getIconPath('icon-alarm')}
                  />
                  <Field
                    name="primary"
                    component={InputCheckbox}
                    dataLocator="mypreference-apptcpcheckbox"
                    className="elm-padding-top"
                  >
                    <BodyCopy
                      fontSize="fs14"
                      data-locator="mypreference-texttcpcheckbox"
                      fontFamily="secondary"
                      component="span"
                    >
                      {' '}
                      {getLabelValue(labels, 'lbl_prefrence_tcp_label')}
                    </BodyCopy>
                  </Field>
                  <Field
                    name="primary"
                    component={InputCheckbox}
                    dataLocator="mypreference-appgymcheckbox"
                    className="elm-padding-top"
                  >
                    <BodyCopy
                      fontSize="fs14"
                      data-locator="mypreference-textgymcheckbox"
                      fontFamily="secondary"
                      component="span"
                    >
                      {' '}
                      {getLabelValue(labels, 'lbl_prefrence_gym_label')}
                    </BodyCopy>
                  </Field>
                </Col>
                <Col
                  colSize={{
                    small: 6,
                    medium: 4,
                    large: 6,
                  }}
                  className="elem-mb-XL"
                >
                  <BodyCopy
                    fontSize="fs14"
                    fontFamily="secondary"
                    component="span"
                    fontWeight="extrabold"
                  >
                    {getLabelValue(labels, 'lbl_prefrence_text_text')}
                  </BodyCopy>
                  <Image class="elem-pl-XS" width="17" height="17" src={getIconPath('icon-chat')} />

                  <Field
                    name="primary"
                    component={InputCheckbox}
                    dataLocator="mypreference-texttcpcheckbox"
                    className="elm-padding-top"
                  >
                    <BodyCopy fontSize="fs14" fontFamily="secondary" component="span">
                      {getLabelValue(labels, 'lbl_prefrence_tcp_label')}
                    </BodyCopy>
                  </Field>
                  <Field
                    name="primary"
                    component={InputCheckbox}
                    dataLocator="mypreference-textgymcheckbox"
                    className="elm-padding-top"
                  >
                    <BodyCopy fontSize="fs14" fontFamily="secondary" component="span">
                      {getLabelValue(labels, 'lbl_prefrence_gym_label')}
                    </BodyCopy>
                  </Field>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
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
};

MyPrefrenceSection.defaultProps = {
  labels: {},
};

export default reduxForm({
  form: 'MyPrefrence', // a unique identifier for this form
})(withStyles(MyPrefrenceSection, styles));
export { MyPrefrenceSection as MyPrefrenceSectionVanilla };
