import React from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import InputCheckout from '@tcp/core/src/components/common/atoms/InputCheckbox';
import ErrorMessage from '@tcp/core/src/components/common/hoc/ErrorMessage';

export const CreateWishlistForm = ({ onSubmit, onClose, deleteWishList, error }) => {
  return (
    <form onSubmit={onSubmit} className="create-wishlist-form">
      {error && <ErrorMessage error={error} />}

      <div className="create-list-container">
        <Field
          name="wishlistName"
          component="input"
          className="list-name"
          title={<div className="input-title">List Name</div>}
        />
        <Field
          name="setAsDefault"
          component={InputCheckout}
          className="by-default"
          subtitle="Make My Default List"
        />
      </div>

      <div className="buttons-container">
        <button type="submit" className="">
          Save
        </button>
        <button type="button" className="button-cancel" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="button-delete" onClick={deleteWishList}>
          Delete
        </button>
      </div>
    </form>
  );
};

CreateWishlistForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteWishList: PropTypes.func.isRequired,
  error: PropTypes.shape({}),
};

CreateWishlistForm.defaultProps = {
  error: null,
};

export default reduxForm({
  form: 'CreateWishlistForm',
  enableReinitialize: true,
})(CreateWishlistForm);
