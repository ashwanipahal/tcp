// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from '../../../atoms';
import config from '../config';

type Props = {
  currentIndex: Object,
  dataCTALinks: Object,
};

const ModuleHCTALinks = ({ currentIndex, dataCTALinks }: Props) => {
  const { maxLimit } = config.MODULE_H_CTALINKS;
  const CTALinks =
    dataCTALinks.length < maxLimit ? 'moduleH__listItem-partial' : 'moduleH__listItem-full';
  return (
    <ul className="moduleH__CTALink-wrapper">
      {dataCTALinks.map((item, index) => {
        return (
          <li key={`modHList${index.toString()}`} className={CTALinks}>
            <Anchor
              className={`moduleH__CTALink ${
                currentIndex.next === index ? `moduleH__CTALink--active` : ''
              }`}
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

export default ModuleHCTALinks;
