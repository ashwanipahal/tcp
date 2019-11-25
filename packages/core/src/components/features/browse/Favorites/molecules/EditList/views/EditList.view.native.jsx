import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import CustomIcon from '@tcp/core/src/components/common/atoms/Icon';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import {
  ICON_NAME,
  ICON_FONT_CLASS,
} from '@tcp/core/src/components/common/atoms/Icon/Icon.constants';
import Button from '@tcp/core/src/components/common/atoms/Button';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import { Container, RowContainer } from '../styles/EditList.style.native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import DeleteList from '../../DeleteList';

class EditList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowRemoveModal: false,
    };
  }

  submitHandler = () => {
    const { handleSubmit, onHandleSubmit, activeWishListId } = this.props;
    handleSubmit(data => {
      if (onHandleSubmit) {
        const payload = {
          wishlistId: activeWishListId,
          wishlistName: data.listName,
          setAsDefault: data.default_checkbox,
        };
        onHandleSubmit(payload);
      }
    })();
  };

  onDeleteListHandler = () => {
    this.setState({
      isShowRemoveModal: true,
    });
  };

  onRemoveCancel = () => {
    this.setState({
      isShowRemoveModal: false,
    });
  };

  renderDeleteListPopup = () => {
    const { labels, onDeleteList } = this.props;
    return (
      <DeleteList labels={labels} onDeleteList={onDeleteList} onCloseModal={this.onRemoveCancel} />
    );
  };

  render() {
    const { labels, margins, onCloseModal, initialValues, isCheckBoxDisabled } = this.props;
    const { isShowRemoveModal } = this.state;
    if (isShowRemoveModal) {
      return this.renderDeleteListPopup();
    }
    return (
      <Container margins={margins}>
        <BodyCopy
          margin="0 0 60px 0"
          dataLocator="fav_brand_title"
          mobileFontFamily="secondary"
          fontSize="fs22"
          fontWeight="bold"
          color="gray.900"
          textAlign="center"
          text={getLabelValue(labels, 'lbl_fav_edit_list')}
        />
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
            {...initialValues}
            disabled={isCheckBoxDisabled}
            dataLocator="default_checkbox"
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
        {!isCheckBoxDisabled && (
          <Anchor
            locator="btn_fav_delete_list"
            accessibilityRole="link"
            accessibilityLabel={getLabelValue(labels, 'btn_fav_delete_list')}
            text={getLabelValue(labels, 'btn_fav_delete_list')}
            anchorVariation="custom"
            colorName="gray.900"
            fontSizeVariation="large"
            onPress={this.onDeleteListHandler}
            centered
            underline
            margins="22px 0 0 0"
          />
        )}
      </Container>
    );
  }
}

EditList.propTypes = {
  labels: PropTypes.shape({}),
  handleSubmit: PropTypes.func,
  margins: PropTypes.string,
  onHandleSubmit: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func,
  onDeleteList: PropTypes.func,
  activeWishListId: PropTypes.number.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  isCheckBoxDisabled: PropTypes.bool,
};

EditList.defaultProps = {
  labels: {},
  handleSubmit: () => {},
  margins: null,
  onCloseModal: () => {},
  onDeleteList: () => {},
  isCheckBoxDisabled: false,
};

const validateMethod = createValidateMethod(getStandardConfig(['listName']));

export default reduxForm({
  form: 'EditListForm',
  ...validateMethod,
})(withStyles(EditList));
export { EditList as EditListVanilla };
