export const getColorFormValue = formValue => {
  return (
    (formValue.color && typeof formValue.color === 'object' && formValue.color.name) ||
    formValue.color
  );
};

export const getQuantityFormValue = formValue => {
  return (
    (formValue.Quantity && typeof formValue.Quantity === 'object' && formValue.Quantity.name) ||
    formValue.Quantity
  );
};

export const getFitFormValue = formValue => {
  return (
    (formValue.Fit && typeof formValue.Fit === 'object' && formValue.Fit.name) || formValue.Fit
  );
};

export const getSizeFormValue = formValue => {
  return (
    (formValue.Size && typeof formValue.Size === 'object' && formValue.Size.name) || formValue.Size
  );
};
