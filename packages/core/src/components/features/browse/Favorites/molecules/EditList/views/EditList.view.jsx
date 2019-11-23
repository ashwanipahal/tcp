import React from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { getLabelValue, getIconPath } from '@tcp/core/src/utils/utils';
import { Row, TextBox, BodyCopy, Col, Button, Image } from '@tcp/core/src/components/common/atoms';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import DeleteList from '../../DeleteList/views';
import styles from '../styles/EditList.style';

class EditList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowRemoveModal: false,
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

  showDeleteModal = () => {
    this.setState({
      isShowRemoveModal: true,
    });
  };

  hideDeleteModal = () => {
    this.setState({
      isShowRemoveModal: false,
    });
  };

  render() {
    const { labels, className, onCloseModal, handleSubmit, onDeleteList } = this.props;
    const { isShowRemoveModal } = this.state;
    if (isShowRemoveModal) {
      return (
        <DeleteList
          labels={labels}
          hideDeleteModal={this.hideDeleteModal}
          onDeleteList={onDeleteList}
        />
      );
    }
    return (
      <>
        <Row fullBleed className={`${className} elem-mb-LRG`}>
          <Col
            colSize={{ small: 4, medium: 6, large: 10 }}
            offsetLeft={{ small: 1, medium: 1, large: 1 }}
            offsetRight={{ small: 1, medium: 1, large: 1 }}
          >
            <BodyCopy
              component="h3"
              fontSize="fs22"
              fontFamily="secondary"
              fontWeight="bold"
              textAlign="center"
            >
              {getLabelValue(labels, 'lbl_fav_edit_list')}
            </BodyCopy>
          </Col>
        </Row>
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
          <Row fullBleed className="elem-mb-LRG">
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
          <Row fullBleed className="elem-mb-MED">
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
                onClick={this.submitHandler}
              >
                {getLabelValue(labels, 'btn_fav_save')}
              </Button>
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-MED">
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
            </Col>
          </Row>
          <Row fullBleed className="delete-list-link">
            <Col
              colSize={{ small: 4, medium: 6, large: 10 }}
              offsetLeft={{ small: 1, medium: 1, large: 1 }}
              offsetRight={{ small: 1, medium: 1, large: 1 }}
            >
              <Button
                buttonVariation="fixed-width"
                dataLocator="DeleteListFormBtn"
                onClick={this.showDeleteModal}
              >
                {getLabelValue(labels, 'btn_fav_delete_list')}
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
  onCloseModal: PropTypes.func.isRequired,
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
