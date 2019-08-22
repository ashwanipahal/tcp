import { getAlternateFormFields } from '../Pickup.selectors';

describe('#pickup Page Selectors', () => {
  it('#getAlternateFormFields', () => {
    const state = {
      form: {
        checkoutPickup: {
          values: {
            pickUpAlternate: {
              hasAlternatePickup: false,
            },
          },
        },
      },
    };

    expect(getAlternateFormFields(state)).toEqual(state.form.checkoutPickup.values.pickUpAlternate);
  });
});
