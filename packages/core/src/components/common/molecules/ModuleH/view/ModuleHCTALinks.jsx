import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from '../../../atoms';

const ModuleHCTALinks = ({ className, currentIndex, dataCTALinks }) => {
  const CTALinks = dataCTALinks.length < 6 ? 'moduleH__CTALink--partial' : 'moduleH__CTALink--full';
  return (
    <div className={className}>
      {dataCTALinks.map((item, index) => {
        return (
          <Anchor
            className={`${CTALinks} moduleH__CTALink
                ${currentIndex.next === index ? `moduleH__CTALink--active` : ''}`}
            key={index.toString()}
            to={item.link.url}
            target={item.link.target}
          >
            {item.styled.text}
          </Anchor>
        );
      })}
    </div>
  );
};

ModuleHCTALinks.propTypes = {
  className: PropTypes.string.isRequired,
  currentIndex: PropTypes.objectOf(PropTypes.oneOfType(PropTypes.number)).isRequired,
  dataCTALinks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ModuleHCTALinks;
