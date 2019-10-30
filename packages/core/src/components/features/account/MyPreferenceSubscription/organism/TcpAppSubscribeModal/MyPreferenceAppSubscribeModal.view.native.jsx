import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Button } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import {
  ViewWithSpacing,
  BodyCopyWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';

// import { ButtonWrapper } from './styles/MyPreferenceAppSubscribeModal.style.native';

/**
 * This Class component use for return the My Preference App Subscribe Modal
 * can be passed in the component.
 * @param MyPreferenceAppSubscribeModal - is a  functional component we can use it within  any component
 * * @param onRequestClose - received onRequestClose function as param for closed popup
 * * @param onSubmit - received onSubmit function to handle form data
 */
class MyPreferenceAppSubscribeModal extends React.PureComponent {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    labels: PropTypes.shape({}),
  };

  static defaultProps = {
    labels: {},
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { onRequestClose, onSubmit, labels } = this.props;
    return (
      <ViewWithSpacing spacingStyles="margin-bottom-XXXL margin-left-MED margin-right-MED">
        <BodyCopyWithSpacing
          fontSize="fs22"
          fontWeight="extrabold"
          fontFamily="secondary"
          textAlign="center"
          spacingStyles="margin-bottom-MED"
          data-locator="my-preference-app-push_title"
          text={getLabelValue(labels, 'lbl_preference_push_notification_heading')}
        />
        <BodyCopyWithSpacing
          component="div"
          fontSize="fs14"
          fontWeight="regular"
          fontFamily="secondary"
          textAlign="center"
          spacingStyles="margin-bottom-LRG"
          data-locator="my-preference-app-push_subtext"
          text={getLabelValue(labels, 'lbl_preference_push_notification_subtext')}
        />
        <BodyCopyWithSpacing
          component="div"
          fontSize="fs14"
          fontWeight="regular"
          fontFamily="secondary"
          textAlign="center"
          spacingStyles="margin-bottom-XXXL margin-left-MED margin-right-MED"
          data-locator="my-preference-app-push_notification_note"
          text={getLabelValue(labels, 'lbl_preference_push_notification_note')}
        />
        <Button
          fullWidth
          buttonVariation="fixed-width"
          fill="BLUE"
          type="submit"
          className="submit-button"
          onPress={onSubmit}
          dataLocator="subscribe_app_push_submit"
          text={getLabelValue(labels, 'lbl_prefrence_modal_submit')}
        />
        <ViewWithSpacing spacingStyles="margin-top-LRG">
          <Button
            fullWidth
            buttonVariation="fixed-width"
            fill="WHITE"
            className="cancel-button"
            dataLocator="subscribe_app_push_cancel"
            onPress={onRequestClose}
            text={getLabelValue(labels, 'lbl_prefrence_modal_cancel')}
          />
        </ViewWithSpacing>
      </ViewWithSpacing>
    );
  }
}

export default withStyles(MyPreferenceAppSubscribeModal);
export { MyPreferenceAppSubscribeModal as MyPreferenceAppSubscribeModalVanilla };
