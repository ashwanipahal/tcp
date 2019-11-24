import React from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { getLabelValue, getIconPath } from '@tcp/core/src/utils/utils';
import { Row, TextBox, BodyCopy, Col, Button, Image } from '@tcp/core/src/components/common/atoms';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import styles from '../styles/AddList.style';

class AddList extends React.PureComponent {
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
        <form className={className} onSubmit={handleSubmit}>
          <Row fullBleed className="elem-mb-MED">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <Field
                placeholder={getLabelValue(labels, 'lbl_fav_list_name')}
                name="listName"
                id="listName"
                type="text"
                component={TextBox}
                dataLocator="listNameField"
              />
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-XXL">
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
                  <Image
                    alt="Default Favourite List"
                    src={getIconPath('add-to-favorite')}
                    className="fav-list-heart-icon"
                  />
                </BodyCopy>
              </Field>
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-LRG">
            <Col
              colSize={{ small: 4, medium: 6, large: 10 }}
              offsetLeft={{ small: 1, medium: 1, large: 1 }}
              offsetRight={{ small: 1, medium: 1, large: 1 }}
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
              colSize={{ small: 4, medium: 6, large: 10 }}
              offsetLeft={{ small: 1, medium: 1, large: 1 }}
              offsetRight={{ small: 1, medium: 1, large: 1 }}
            >
              <Button
                buttonVariation="fixed-width"
                dataLocator="CancelListFormBtn"
                onClick={onCloseModal}
              >
                {getLabelValue(labels, 'btn_fav_cancel')}
              </Button>
              <Field name="itemId" id="itemId" type="hidden" component={TextBox} />
            </Col>
          </Row>
        </form>
      </>
    );
  }
}

const validateMethod = createValidateMethod(getStandardConfig(['listName']));

AddList.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string,
  handleSubmit: PropTypes.func,
  onHandleSubmit: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
AddList.defaultProps = {
  labels: {},
  className: '',
  handleSubmit: () => {},
};

export default reduxForm({
  form: 'AddListForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(AddList, styles));

export { AddList as AddListFormVanilla };
