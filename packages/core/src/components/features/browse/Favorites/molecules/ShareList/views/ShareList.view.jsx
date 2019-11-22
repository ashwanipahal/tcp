import React from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Row, TextBox, BodyCopy, Col, Button } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import styles from '../styles/ShareList.style';

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
    const { labels, className, onCloseModal, handleSubmit } = this.props;

    return (
      <>
        <form className={`${className} share-list-form`} onSubmit={handleSubmit}>
          <Row fullBleed className="elem-mb-MED">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <BodyCopy component="p" fontSize="fs14" fontFamily="secondary" fontWeight="regular">
                {getLabelValue(labels, 'lbl_fav_share_list_msg')}
              </BodyCopy>
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-MED">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <Field
                placeholder={getLabelValue(labels, 'lbl_fav_to')}
                name="toEmail"
                id="toEmail"
                type="text"
                component={TextBox}
                dataLocator="toEmailField"
              />
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-MED">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <Field
                placeholder={getLabelValue(labels, 'lbl_fav_from')}
                name="fromEmail"
                id="fromEmail"
                type="text"
                component={TextBox}
                dataLocator="fromEmailField"
              />
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-LRG">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <Field
                placeholder={getLabelValue(labels, 'lbl_fav_subject')}
                name="subject"
                id="subject"
                type="text"
                className="subject-field"
                component={TextBox}
                dataLocator="subjectField"
              />
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-XXXS">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <BodyCopy fontSize="fs14" fontFamily="secondary" textAlign="left">
                {getLabelValue(labels, 'lbl_fav_message')}
              </BodyCopy>
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-LRG">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <Field
                className="message-txt-field"
                name="message"
                id="message"
                component="textarea"
                dataLocator="messageField"
              />
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-LRG">
            <Col
              colSize={{ small: 4, medium: 4, large: 8 }}
              offsetLeft={{ small: 1, medium: 2, large: 2 }}
              offsetRight={{ small: 1, medium: 2, large: 2 }}
            >
              <Button
                buttonVariation="fixed-width"
                type="submit"
                fill="BLUE"
                dataLocator="SaveListFormBtn"
              >
                {getLabelValue(labels, 'btn_fav_save')}
              </Button>
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-XL">
            <Col
              colSize={{ small: 4, medium: 4, large: 8 }}
              offsetLeft={{ small: 1, medium: 2, large: 2 }}
              offsetRight={{ small: 1, medium: 2, large: 2 }}
            >
              <Button
                buttonVariation="fixed-width"
                dataLocator="CancelListFormBtn"
                onClick={onCloseModal}
              >
                {getLabelValue(labels, 'btn_fav_cancel')}
              </Button>
            </Col>
          </Row>
        </form>
      </>
    );
  }
}

const validateMethod = createValidateMethod(
  getStandardConfig([
    { toEmail: 'shareToEmailAddresses' },
    { fromEmail: 'shareFromEmailAddresses' },
    { subject: 'subject' },
    { message: 'message' },
  ])
);

ShareList.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string,
  handleSubmit: PropTypes.func,
  onHandleSubmit: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
ShareList.defaultProps = {
  labels: {},
  className: '',
  handleSubmit: () => {},
};

export default reduxForm({
  form: 'ShareListForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(ShareList, styles));

export { ShareList as ShareListFormVanilla };
