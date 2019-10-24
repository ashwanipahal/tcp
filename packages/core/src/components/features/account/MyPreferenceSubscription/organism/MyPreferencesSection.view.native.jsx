import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';

import { Field, reduxForm } from 'redux-form';
import Image from '../../../../common/atoms/Image';
import { ViewWithSpacing, BodyCopyWithSpacing } from '../../../../common/atoms/styledWrapper';

import BodyCopy from '../../../../common/atoms/BodyCopy';
import InputCheckbox from '../../../../common/atoms/InputCheckbox';
import {
  AppTextWrapper,
  AppAlertWrapper,
  SubscribeCheckWrapper,
} from '../styles/MyPreferenceSubscription.style.native';

const alertIcon = require('@tcp/core/src/assets/icon-alarm-gray.png');
const textIcon = require('@tcp/core/src/assets/icon-chat-gray.png');

class MyPrefrenceSection extends React.PureComponent {
  constructor(props) {
    super(props);
    const { isTcpSubscribe, isGymSubscribe } = this.props;
    this.state = {
      isTcpSubscribeState: isTcpSubscribe,
    };
    this.state = {
      isGymSubscribeState: isGymSubscribe,
    };
  }

  componentDidUpdate() {
    const { isTcpSubscribe, isGymSubscribe } = this.props;
    const { isTcpSubscribeState, isGymSubscribeState } = this.state;
    if (isTcpSubscribe !== isTcpSubscribeState) {
      this.setTcpSubscribeState(isTcpSubscribe);
    }
    if (isGymSubscribe !== isGymSubscribeState) {
      this.setGymSubscribeState(isGymSubscribe);
    }
  }

  setTcpSubscribeState = isTcpSubscribe => {
    this.setState({
      isTcpSubscribeState: isTcpSubscribe,
    });
  };

  setGymSubscribeState = isGymSubscribe => {
    this.setState({
      isGymSubscribeState: isGymSubscribe,
    });
  };

  onSubscribeHandler = subscribeBrand => {
    const { onSubscribe } = this.props;
    onSubscribe(subscribeBrand);
  };

  onUnsubscribeHandler = subscribeBrand => {
    const { onUnsubscribe } = this.props;
    onUnsubscribe(subscribeBrand);
  };

  render() {
    const { labels, isTcpSubscribe, isGymSubscribe } = this.props;
    const { isTcpSubscribeState, isGymSubscribeState } = this.state;
    return (
      <ViewWithSpacing spacingStyles="margin-bottom-XXXL margin-left-XXS margin-right-XXS">
        <BodyCopyWithSpacing
          fontSize="fs16"
          spacingStyles="margin-bottom-MED margin-top-MED"
          fontFamily="secondary"
          fontWeight="extrabold"
          data-locator="mypreference-Myplacerewardpreferheade"
          text={getLabelValue(labels, 'lbl_prefrence_rewards_prefrence')}
        />

        <BodyCopyWithSpacing
          data-locator="mypreference-Myplacerewardprefertext"
          fontSize="fs16"
          fontFamily="secondary"
          fontWeight="regular"
          spacingStyles="margin-bottom-LRG"
          text={getLabelValue(labels, 'lbl_prefrence_access_buy_online_pickup')}
        />

        <BodyCopy
          className="elm-pt-LRG"
          fontSize="fs14"
          fontFamily="secondary"
          fontWeight="regular"
          text={getLabelValue(labels, 'lbl_prefrence_marketing_notification')}
        />

        <AppTextWrapper>
          <BodyCopyWithSpacing
            fontSize="fs16"
            fontFamily="secondary"
            fontWeight="extrabold"
            component="span"
            text={getLabelValue(labels, 'lbl_prefrence_app_text')}
          />
          <AppAlertWrapper>
            <Image width="17" height="17" source={alertIcon} />
          </AppAlertWrapper>
        </AppTextWrapper>
        <SubscribeCheckWrapper>
          <Field
            name="tcpAppSubscribe"
            component={InputCheckbox}
            dataLocator="mypreference-apptcpcheckbox"
            className="elm-padding-top"
          />
          <BodyCopyWithSpacing
            fontSize="fs14"
            data-locator="mypreference-texttcpcheckbox"
            fontFamily="secondary"
            component="span"
            fontWeight="regular"
            spacingStyles="margin-top-XXS"
            text={` ${getLabelValue(labels, 'lbl_prefrence_tcp_label')}`}
          />
        </SubscribeCheckWrapper>
        <SubscribeCheckWrapper>
          <Field
            name="gymboreeAppSubscribe"
            component={InputCheckbox}
            dataLocator="mypreference-appgymcheckbox"
            className="elm-padding-top"
          />
          <BodyCopyWithSpacing
            fontSize="fs14"
            data-locator="mypreference-textgymcheckbox"
            fontFamily="secondary"
            component="span"
            spacingStyles="margin-top-XXS"
            fontWeight="regular"
            text={` ${getLabelValue(labels, 'lbl_prefrence_gym_label')}`}
          />
        </SubscribeCheckWrapper>
        <AppTextWrapper>
          <BodyCopy
            fontSize="fs16"
            fontFamily="secondary"
            component="span"
            fontWeight="extrabold"
            text={getLabelValue(labels, 'lbl_prefrence_text_text')}
          />
          <AppAlertWrapper>
            <Image class="elem-pl-XS" width="17" height="17" source={textIcon} />
          </AppAlertWrapper>
        </AppTextWrapper>
        <SubscribeCheckWrapper>
          <Field
            name="tcpWebSubscribe"
            component={InputCheckbox}
            dataLocator="mypreference-texttcpcheckbox"
            className="elm-padding-top"
            execOnChangeByDefault={false}
            onChange={value => {
              this.setState(
                {
                  isTcpSubscribeState: value,
                },
                () => {
                  if (isTcpSubscribe) {
                    this.onUnsubscribeHandler('tcpWebSubscribe');
                  } else {
                    this.onSubscribeHandler('tcpWebSubscribe');
                  }
                }
              );
            }}
            isChecked={isTcpSubscribeState}
          />
          <BodyCopyWithSpacing
            fontSize="fs14"
            fontFamily="secondary"
            component="span"
            spacingStyles="margin-top-XXS"
            fontWeight="regular"
            text={getLabelValue(labels, 'lbl_prefrence_tcp_label')}
          />
        </SubscribeCheckWrapper>
        <SubscribeCheckWrapper>
          <Field
            name="gymboreeWebSubscribe"
            component={InputCheckbox}
            dataLocator="mypreference-textgymcheckbox"
            className="elm-padding-top"
            execOnChangeByDefault={false}
            onChange={value => {
              this.setState(
                {
                  isGymSubscribeState: value,
                },
                () => {
                  if (isGymSubscribe) {
                    this.onUnsubscribeHandler('gymboreeWebSubscribe');
                  } else {
                    this.onSubscribeHandler('gymboreeWebSubscribe');
                  }
                }
              );
            }}
            isChecked={isGymSubscribeState}
          />
          <BodyCopyWithSpacing
            fontSize="fs14"
            fontFamily="secondary"
            component="span"
            spacingStyles="margin-top-XXS"
            fontWeight="regular"
            text={getLabelValue(labels, 'lbl_prefrence_gym_label')}
          />
        </SubscribeCheckWrapper>
      </ViewWithSpacing>
    );
  }
}

MyPrefrenceSection.propTypes = {
  labels: PropTypes.shape({}),
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
})(MyPrefrenceSection);
export { MyPrefrenceSection as MyPrefrenceSectionVanilla };