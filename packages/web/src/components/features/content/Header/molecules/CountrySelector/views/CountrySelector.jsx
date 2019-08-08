import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';

import CountrySelectorModal from './CountrySelectorModal';
import style from '../styles/CountrySelector.styles';

const CountrySelector = ({ className, footer }) => {
  return (
    <div className={`${className} countrySelector`}>
      {footer ? (
        <BodyCopy
          className="countrySelector__shipTo"
          color="gray.800"
          component="div"
          fontSize="fs12"
        >
          Ship to
        </BodyCopy>
      ) : (
        ''
      )}
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
      <CountrySelectorModal heading="Ship To" />
    </div>
  );
};

CountrySelector.propTypes = {
  className: PropTypes.string.isRequired,
  footer: PropTypes.bool,
};

CountrySelector.defaultProps = {
  footer: false,
};

export default errorBoundary(withStyles(CountrySelector, style));
