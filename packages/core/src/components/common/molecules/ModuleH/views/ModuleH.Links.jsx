import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from '../../../atoms';
import errorBoundary from '../../../hoc/withErrorBoundary';
import { getLocator } from '../../../../../utils';
import config from '../config';

/**
 * @function ModuleHCTALinks This function renders header of Module H
 * @param {currentIndex} currentIndex Current and next index of carousel autoplay
 * @param {dataCTALinks} dataCTALinks This list of CTA links data to display
 */
const ModuleHCTALinks = ({ currentIndex, dataCTALinks }) => {
  const { maxLimit } = config.MODULE_H_CTALINKS;
  const CTALinks =
    dataCTALinks.length < maxLimit ? 'moduleH__listItem-partial' : 'moduleH__listItem-full';
  return (
    <ul className="moduleH__CTALink-wrapper">
      {dataCTALinks.map(({ link, styled }, index) => {
        return (
          <li key={`modHList${index.toString()}`} className={CTALinks}>
            <Anchor
              className={`moduleH__CTALink ${
                currentIndex.next === index ? `moduleH__CTALink--active` : ''
              }`}
              dataLocator={`${getLocator('moduleH_cta_links')}${index + 1}`}
              to={link.url}
              target={link.target}
            >
              {styled.text}
            </Anchor>
          </li>
        );
      })}
    </ul>
  );
};

ModuleHCTALinks.propTypes = {
  currentIndex: PropTypes.shape({}).isRequired,
  dataCTALinks: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      styled: PropTypes.object,
    })
  ).isRequired,
};

export default errorBoundary(ModuleHCTALinks);
