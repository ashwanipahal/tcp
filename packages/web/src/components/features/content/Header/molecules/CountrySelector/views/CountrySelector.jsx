import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../styles/CountrySelector.styles';

const CountrySelector = ({ className }) => {
  return (
    <div className={`${className} countrySelector`}>
      <div className="countrySelector__flag-icon">
        <Image src="/static/images/flags/united-states-of-america.svg" width="20px" height="20px" />
      </div>
      <div>
        {['EN', 'ES'].map((locale, index) => (
          <BodyCopy
            component="span"
            fontSize="fs13"
            className={`${
              index < 1 ? 'countrySelector__locale--selected' : 'countrySelector__locale--disabled'
            } countrySelector__locale`}
          >
            {locale}
          </BodyCopy>
        ))}
      </div>
    </div>
  );
};

CountrySelector.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(CountrySelector, style);
