import React from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Row from '@tcp/core/src/components/common/atoms/Row';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Col from '@tcp/core/src/components/common/atoms/Col';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Button from '@tcp/core/src/components/common/atoms/Button';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import styles from '../styles/EditList.style';

class EditList extends React.PureComponent {
  submitHandler = () => {
    const { handleSubmit, onHandleSubmit } = this.props;
    handleSubmit(data => {
      if (onHandleSubmit) {
        onHandleSubmit(data);
      }
    })();
  };

  onCancel = () => {
    this.toggleModal();
  };

  render() {
    const { labels, className } = this.props;

    return (
      <>
        <form className={className}>
          <Row fullBleed className="add-list-field">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <Field
                placeholder={getLabelValue(labels, 'lbl_fav_list_name')}
                name="listName"
                id="listName"
                type="text"
                component={TextBox}
                dataLocator="childNameField"
              />
            </Col>
          </Row>
          <Row fullBleed className="add-list-fav-check">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <Field
                name="makeDefaultList"
                id="makeDefaultList"
                component={InputCheckbox}
                dataLocator="makeDefaultList"
                className="default-check-row"
              >
                <BodyCopy
                  component="span"
                  fontSize="fs13"
                  fontFamily="secondary"
                  fontWeight="semibold"
                >
                  {getLabelValue(labels, 'lbl_fav_default_list')}
                </BodyCopy>
              </Field>
            </Col>
          </Row>
          <Row fullBleed className="add-list-save">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <Button
                buttonVariation="fixed-width"
                type="submit"
                fill="BLUE"
                dataLocator="SaveListFormBtn"
                onClick={this.submitHandler}
              >
                {getLabelValue(labels, 'btn_fav_save')}
              </Button>
            </Col>
          </Row>
          <Row fullBleed className="add-list-cancel">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <Button
                buttonVariation="fixed-width"
                dataLocator="CancelListFormBtn"
                onClick={this.onCancel}
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

const validateMethod = createValidateMethod(getStandardConfig(['listName']));

EditList.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string,
  handleSubmit: PropTypes.func,
  onHandleSubmit: PropTypes.func.isRequired,
};
EditList.defaultProps = {
  labels: {},
  className: '',
  handleSubmit: () => {},
};

export default reduxForm({
  form: 'EditListForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(EditList, styles));

export { EditList as EditListFormVanilla };
