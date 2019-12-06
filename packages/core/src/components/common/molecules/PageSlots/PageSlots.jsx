import React from 'react';
import { PropTypes } from 'prop-types';

const PageSlots = props => {
  const { slots = [], modules, ...others } = props;
  return slots.map((slot, index) => {
    const key = index;
    if (slot && slot.moduleName) {
      const Module = modules[slot.moduleName];
      const { data: slotData, accessibility } = slot;
      return (
        Module &&
        slotData && <Module key={key} accessibility={accessibility} {...slotData} {...others} />
      );
    }
    return null;
  });
};

PageSlots.propTypes = {
  modules: PropTypes.shape({}).isRequired,
  slots: PropTypes.arrayOf(
    PropTypes.shape({
      contentId: PropTypes.string,
      data: PropTypes.shape({}),
      moduleName: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default PageSlots;
