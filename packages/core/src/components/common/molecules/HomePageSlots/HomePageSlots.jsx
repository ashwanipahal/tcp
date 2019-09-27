import React from 'react';
import { PropTypes } from 'prop-types';

const HomePageSlots = props => {
  const { slots = [], modules, ...others } = props;

  return slots.map(slot => {
    const Module = modules[slot.moduleName];
    const { data: slotData, contentId, accessibility } = slot;

    return (
      Module &&
      slotData && <Module key={contentId} accessibility={accessibility} {...slotData} {...others} />
    );
  });
};

HomePageSlots.propTypes = {
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

export default HomePageSlots;
