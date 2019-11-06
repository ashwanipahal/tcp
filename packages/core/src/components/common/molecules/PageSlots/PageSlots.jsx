import React from 'react';
import { PropTypes } from 'prop-types';

const PageSlots = props => {
  const { slots = [], modules, ...others } = props;

  return slots.map(slot => {
    const Module = modules[slot.moduleName];
    const { data: slotData, contentId, accessibility, moduleName } = slot;
    return (
      Module &&
      slotData && (
        <Module
          key={contentId}
          accessibility={accessibility}
          {...slotData}
          {...others}
          moduleName={moduleName}
        />
      )
    );
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
