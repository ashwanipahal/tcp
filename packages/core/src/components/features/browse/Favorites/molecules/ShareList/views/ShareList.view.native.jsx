import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { Container } from '../styles/ShareList.style.native';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import TextArea from '../../../../../../common/atoms/TextArea';

class ShareList extends React.PureComponent {
  submitHandler = () => {
    const { handleSubmit, onHandleSubmit } = this.props;
    handleSubmit(data => {
      if (onHandleSubmit) {
        onHandleSubmit(data);
      }
    })();
  };

  render() {
    const { labels, margins, onCloseModal } = this.props;
    return (
      <Container margins={margins}>
        <BodyCopy
          margin="0 0 32px 0"
          dataLocator="fav_brand_title"
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          color="gray.900"
          textAlign="center"
          text={getLabelValue(labels, 'lbl_fav_share_list_msg')}
        />
        <Field
          label={getLabelValue(labels, 'lbl_fav_to')}
          name="toEmail"
          id="toEmail"
          type="text"
          autoCapitalize="none"
          component={TextBox}
          dataLocator="toEmail"
          maxLength={50}
          bottomBorderColor="gray.600"
        />
        <Field
          label={getLabelValue(labels, 'lbl_fav_from')}
          name="fromEmail"
          id="fromEmail"
          type="text"
          autoCapitalize="none"
          component={TextBox}
          dataLocator="fromEmail"
          maxLength={50}
          bottomBorderColor="gray.600"
        />
        <Field
          label={getLabelValue(labels, 'lbl_fav_subject')}
          name="subject"
          id="subject"
          type="text"
          autoCapitalize="none"
          component={TextBox}
          dataLocator="subject"
          maxLength={50}
          bottomBorderColor="gray.600"
        />
        <Field
          label={getLabelValue(labels, 'lbl_fav_message')}
          name="message"
          id="message"
          component={TextArea}
          bottomBorderColor="gray.600"
          multiline
          numberOfLines={4}
        />
        <Button
          margin="40px 0 0 0"
          fill="BLUE"
          type="submit"
          color="white"
          onPress={this.submitHandler}
          text={getLabelValue(labels, 'btn_fav_save')}
        />
        <Button
          margin="24px 0 0 0"
          fill="WHITE"
          type="submit"
          onPress={onCloseModal}
          text={getLabelValue(labels, 'btn_fav_cancel')}
        />
      </Container>
    );
  }
}

ShareList.propTypes = {
  labels: PropTypes.shape({}),
  handleSubmit: PropTypes.func,
  onHandleSubmit: PropTypes.func.isRequired,
  margins: PropTypes.string,
  onCloseModal: PropTypes.func,
};

ShareList.defaultProps = {
  labels: {},
  handleSubmit: () => {},
  margins: null,
  onCloseModal: () => {},
};

const validateMethod = createValidateMethod(
  getStandardConfig([
    { toEmail: 'shareToEmailAddresses' },
    { fromEmail: 'shareFromEmailAddresses' },
    { subject: 'subject' },
    { message: 'message' },
  ])
);

export default reduxForm({
  form: 'ShareListForm',
  ...validateMethod,
})(ShareList);
export { ShareList as ShareListVanilla };
