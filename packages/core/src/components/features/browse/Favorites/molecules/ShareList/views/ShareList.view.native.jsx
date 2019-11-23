import React from 'react';
import { reduxForm, Field, change } from 'redux-form';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { Container, InputBoxWrapper } from '../styles/ShareList.style.native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';

class ShareList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }
  submitHandler = () => {
    const { handleSubmit, onHandleSubmit } = this.props;
    handleSubmit(data => {
      if (onHandleSubmit) {
        onHandleSubmit(data);
      }
    })();
  };

  render() {
    const { labels, margins, onCloseModal, dispatch } = this.props;
    const { message } = this.state;
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
        <BodyCopy
          margin="0 0 6px 0"
          dataLocator="fav_brand_title"
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          color="gray.900"
          text={getLabelValue(labels, 'lbl_fav_message')}
        />
        <Field
          label={getLabelValue(labels, 'lbl_fav_subject')}
          name="message"
          id="message"
          type="text"
          value={message}
          onChangeText={text => {
            this.setState({ message: text });
            dispatch(change('ShareListForm', `message`, text));
          }}
          autoCapitalize="none"
          component={InputBoxWrapper}
          dataLocator="message"
          maxLength={100}
          bottomBorderColor="gray.600"
          multiline
          textAlign="left"
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
  dispatch: PropTypes.func,
};

ShareList.defaultProps = {
  labels: {},
  handleSubmit: () => {},
  margins: null,
  onCloseModal: () => {},
  dispatch: () => {},
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
