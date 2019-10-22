import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Field, reduxForm } from 'redux-form';
import Image from '../../../../common/atoms/Image';
import { ViewWithSpacing, BodyCopyWithSpacing } from '../../../../common/atoms/styledWrapper';
import styles from '../styles/MyPreferenceSubscription.style';
import withStyles from '../../../../common/hoc/withStyles';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import InputCheckbox from '../../../../common/atoms/InputCheckbox';
import { getIconPath } from '../../../../../utils';

class MyPrefrenceSection extends React.PureComponent {
  render() {
    const { labels, onSubscribe, onUnsubscribe, isTcpSubscribe, isGymSubscribe } = this.props;

    return (
      <ViewWithSpacing spacingStyles="margin-bottom-XL margin-left-XXS margin-right-XXS">
        <BodyCopyWithSpacing
          fontSize="fs16"
          spacingStyles="margin-bottom-MED margin-top-MED"
          fontFamily="secondary"
          fontWeight="extrabold"
          data-locator="mypreference-Myplacerewardpreferheade"
          text={getLabelValue(labels, 'lbl_prefrence_rewards_prefrence')}
        />

        <BodyCopy
          data-locator="mypreference-Myplacerewardprefertext"
          fontSize="fs16"
          fontFamily="secondary"
          text={getLabelValue(labels, 'lbl_prefrence_access_buy_online_pickup')}
        />

        <BodyCopy
          className="elm-pt-LRG"
          fontSize="fs14"
          fontFamily="secondary"
          text={getLabelValue(labels, 'lbl_prefrence_marketing_notification')}
        />

        <BodyCopy
          fontSize="fs16"
          fontFamily="secondary"
          fontWeight="extrabold"
          component="span"
          text={getLabelValue(labels, 'lbl_prefrence_app_text')}
        />

        <Image class="elem-pl-XS" width="17" height="17" src={getIconPath('icon-alarm')} />

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
            text={` ${getLabelValue(labels, 'lbl_prefrence_tcp_label')}`}
          />
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
            text={` ${getLabelValue(labels, 'lbl_prefrence_gym_label')}`}
          />
        </Field>

        <BodyCopy
          fontSize="fs14"
          fontFamily="secondary"
          component="span"
          fontWeight="extrabold"
          text={getLabelValue(labels, 'lbl_prefrence_text_text')}
        />

        <Image class="elem-pl-XS" width="17" height="17" src={getIconPath('icon-chat')} />

        <Field
          name="tcpWebSubscribe"
          component={InputCheckbox}
          dataLocator="mypreference-texttcpcheckbox"
          className="elm-padding-top"
          checked={isTcpSubscribe || false}
        >
          <BodyCopy
            fontSize="fs14"
            fontFamily="secondary"
            component="span"
            text={getLabelValue(labels, 'lbl_prefrence_tcp_label')}
          />
        </Field>
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
})(withStyles(MyPrefrenceSection, styles));
export { MyPrefrenceSection as MyPrefrenceSectionVanilla };
