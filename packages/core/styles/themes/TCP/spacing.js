export default {
  // SPACING
  // ELEMENT_SPACING - This spacing is defined from the mininum to maximum that can be used inside an individual
  // component for both padding and margin.

  // LAYOUT_SPACING - TThe layout scale is used for arranging components and other UI parts into a full page layout.
  // It has larger increments that are used to control the density of a design.
  // Use the smaller layout tokens to create more dense compositions and direct relationships.
  // Use the larger tokens to increase the amount of white space and to disassociate sections.

  // The spacing below are taken from the UI stylesheet. If you find you need a spacing that doesn't
  // exist here, it's likely the design should be updated to match an use spacing, or the spacing needs
  // to be added to the stylesheet. Please speak to a designer first before adding here and
  // PLEASE DO NOT JUST ADD SPACING BELOW BECAUSE IT'S IN A DESIGN :)

  ELEMENT_SPACING: {
    XXXS: '2px',
    XXS: '4px',
    XS: '8px',
    SM: '12px',
    MED: '16px',
    LRG: '24px',
    XL: '32px',
    XXL: '40px',
    XXXL: '48px',
  },
  LAYOUT_SPACING: {
    XXS: '16px',
    XS: '24px',
    SM: '32px',
    MED: '48px',
    LRG: '64px',
    XL: '96px',
    XXL: '160px',
  },
};
