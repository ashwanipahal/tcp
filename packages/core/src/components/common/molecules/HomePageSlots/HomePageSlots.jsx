import React from 'react';
import { PropTypes } from 'prop-types';

const HomePageSlots = props => {
  const { slots = [], modules, ...others } = props;

  return slots
    .sort((a, b) => (b.name > a.name ? -1 : 1))
    .map(slot => {
      const Module = modules[slot.moduleName];
      return Module && slot.data && <Module key={slot.contentId} {...slot.data} {...others} />;
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
