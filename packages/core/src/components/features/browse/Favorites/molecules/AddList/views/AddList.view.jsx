import React from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Row from '@tcp/core/src/components/common/atoms/Row';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import Col from '@tcp/core/src/components/common/atoms/Col';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Button from '@tcp/core/src/components/common/atoms/Button';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import styles from '../styles/AddList.style';

class AddList extends React.PureComponent {
  render() {
    const { labels, className } = this.props;

    return (
      <>
        <form className={className}>
          <Row fullBleed>
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <Field
                placeholder={getLabelValue(labels, 'lbl_add_child_save')}
                name="listName"
                id="listName"
                type="text"
                component={TextBox}
                dataLocator="childNameField"
              />
            </Col>
          </Row>
          <Row fullBleed>
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <Button
                buttonVariation="fixed-width"
                type="submit"
                fill="BLUE"
                dataLocator="SaveListFormBtn"
              >
                {getLabelValue(labels, 'lbl_add_child_save')}
              </Button>
            </Col>
          </Row>
          <Row fullBleed>
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <Button buttonVariation="fixed-width" type="submit" dataLocator="CancelListFormBtn">
                {getLabelValue(labels, 'lbl_add_child_save')}
              </Button>
            </Col>
          </Row>
        </form>
      </>
    );
  }
}

const validateMethod = createValidateMethod(getStandardConfig(['wishlistName']));

AddList.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string,
};
AddList.defaultProps = {
  labels: {},
  className: '',
};

export default reduxForm({
  form: 'AddListForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(AddList, styles));

export { AddList as AddListFormVanilla };
