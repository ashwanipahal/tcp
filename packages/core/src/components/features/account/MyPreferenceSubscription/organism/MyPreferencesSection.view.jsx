import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Field, reduxForm } from 'redux-form';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import Image from '../../../../common/atoms/Image';
import styles from '../styles/MyPreferenceSubscription.style';
import withStyles from '../../../../common/hoc/withStyles';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import InputCheckbox from '../../../../common/atoms/InputCheckbox';
import { getIconPath } from '../../../../../utils';

class MyPrefrenceSection extends React.PureComponent {
  render() {
    const {
      className,
      labels,
      onSubscribe,
      onUnsubscribe,
      isTcpSubscribe,
      isGymSubscribe,
    } = this.props;
    return (
      <div className={className}>
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
            <BodyCopy className="elm-pt-LRG" fontSize="fs14" fontFamily="secondary">
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
                    name="tcpAppSubscribe"
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
                    name="gymboreeAppSubscribe"
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
                    name="tcpWebSubscribe"
                    type="checkbox"
                    component={InputCheckbox}
                    dataLocator="mypreference-texttcpcheckbox"
                    className="elm-padding-top"
                    onChange={isTcpSubscribe ? onUnsubscribe : onSubscribe}
                    checked={isTcpSubscribe}
                  >
                    <BodyCopy fontSize="fs14" fontFamily="secondary" component="span">
                      {getLabelValue(labels, 'lbl_prefrence_tcp_label')}
                    </BodyCopy>
                  </Field>
                  <Field
                    name="gymboreeWebSubscribe"
                    component={InputCheckbox}
                    dataLocator="mypreference-textgymcheckbox"
                    className="elm-padding-top"
                    onChange={isGymSubscribe ? onUnsubscribe : onSubscribe}
                    checked={isGymSubscribe}
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
      </div>
    );
  }
}

MyPrefrenceSection.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string.isRequired,
  urlParams: PropTypes.shape({}),
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
  isTcpSubscribe: PropTypes.bool,
  isGymSubscribe: PropTypes.bool,
};

MyPrefrenceSection.defaultProps = {
  labels: {},
  isTcpSubscribe: false,
  isGymSubscribe: false,
  urlParams: {},
};

export default reduxForm({
  form: 'MyPrefrence', // a unique identifier for this form
})(withStyles(MyPrefrenceSection, styles));
export { MyPrefrenceSection as MyPrefrenceSectionVanilla };
