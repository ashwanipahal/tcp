import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from '../../../atoms';

const ModuleHCTALinks = ({ currentIndex, dataCTALinks }) => {
  const CTALinks = dataCTALinks.length < 6 ? 'moduleH__CTALink--partial' : 'moduleH__CTALink--full';
  return (
    <div className="moduleH__CTALink--wrapper">
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
  currentIndex: PropTypes.shape({}).isRequired,
  dataCTALinks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ModuleHCTALinks;
