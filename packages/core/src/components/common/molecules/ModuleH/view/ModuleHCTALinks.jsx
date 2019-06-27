import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from '../../../atoms';
import errorBoundary from '../../../hoc/errorBoundary';
import config from '../config';

const ModuleHCTALinks = ({ currentIndex, dataCTALinks }) => {
  const { maxLimit } = config.MODULE_H_CTALINKS;
  const CTALinks =
    dataCTALinks.length < maxLimit ? 'moduleH__CTALink--partial' : 'moduleH__CTALink--full';
  return (
    <ul className="moduleH__CTALink-wrapper">
      {dataCTALinks.map((item, index) => {
        return (
          <li key={`modHList${index.toString()}`} className={CTALinks}>
            <Anchor
              className={`moduleH__CTALink ${
                currentIndex.next === index ? `moduleH__CTALink--active` : ''
              }`}
              key={`modHCTALink${index.toString()}`}
              to={item.link.url}
              target={item.link.target}
            >
              {item.styled.text}
            </Anchor>
          </li>
        );
      })}
    </ul>
  );
};

ModuleHCTALinks.propTypes = {
  currentIndex: PropTypes.shape({}).isRequired,
  dataCTALinks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default errorBoundary(ModuleHCTALinks);
