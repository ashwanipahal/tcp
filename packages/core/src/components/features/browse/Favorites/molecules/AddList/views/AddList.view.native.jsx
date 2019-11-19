import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import CustomIcon from '@tcp/core/src/components/common/atoms/Icon';
import {
  ICON_NAME,
  ICON_FONT_CLASS,
} from '@tcp/core/src/components/common/atoms/Icon/Icon.constants';
import Button from '@tcp/core/src/components/common/atoms/Button';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import { Container, RowContainer } from '../styles/AddList.style.native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';

class AddList extends React.PureComponent {
  onHandleSubmit = () => {
    const { handleSubmit } = this.props;
    handleSubmit(data => {
      console.tron.log('data: ', data);
    })();
  };

  onCancel = () => {
    this.toggleModal();
  };

  renderCheckBox = () => {};

  render() {
    const { labels, margins } = this.props;
    return (
      <Container margins={margins}>
        <Field
          label={getLabelValue(labels, 'lbl_fav_list_name')}
          name="listName"
          id="listName"
          type="text"
          autoCapitalize="none"
          component={TextBox}
          dataLocator="listName"
          maxLength={50}
          bottomBorderColor="gray.600"
        />
        <RowContainer margins="20px 0 0 0">
          <Field
            inputVariation="inputVariation-1"
            name="default_checkbox"
            component={InputCheckbox}
            dataLocator="default_checkbox"
            disabled={false}
            rightText={getLabelValue(labels, 'lbl_fav_default_list')}
            textMargin="4px 0 0 0"
          />
          <CustomIcon
            margins="0 0 0 8px"
            iconFontName={ICON_FONT_CLASS.Icomoon}
            name={ICON_NAME.heart}
            size="fs12"
            color="gray.900"
          />
        </RowContainer>
        <Button
          margin="40px 0 0 0"
          fill="BLUE"
          type="submit"
          color="white"
          onPress={this.onHandleSubmit}
          text={getLabelValue(labels, 'btn_fav_save')}
        />
        <Button
          margin="24px 0 0 0"
          fill="WHITE"
          type="submit"
          onPress={this.onCancel}
          text={getLabelValue(labels, 'btn_fav_cancel')}
        />
      </Container>
    );
  }
}

AddList.propTypes = {
  labels: PropTypes.shape({}),
  handleSubmit: PropTypes.func,
  margins: PropTypes.string,
};

AddList.defaultProps = {
  labels: {},
  handleSubmit: () => {},
  margins: null,
};

const validateMethod = createValidateMethod(getStandardConfig(['listName']));

export default reduxForm({
  form: 'addListForm',
  ...validateMethod,
})(withStyles(AddList));
export { AddList as AddListVanilla };
