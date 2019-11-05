import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getIconPath, getLocator } from '@tcp/core/src/utils';
import style from '../styles/HelpCenterHeader.style';

const HelpCenterHeader = ({ className, labels }) => (
  <div className={className}>
    <div className="help-center-icon">
      <Image src={getIconPath('circle-info-blue')} alt="Store Icon" />
    </div>
    <div className="help-center">
      <div className="help-center-title">
        <h4 className="help-center-title__text" data-locator={getLocator('')}>
          {labels.helpcenter_pageHeader || 'HELP CENTER'}
        </h4>
      </div>
    </div>
  </div>
);

HelpCenterHeader.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    helpcenter_pageHeader: PropTypes.string,
  }),
};

HelpCenterHeader.defaultProps = {
  labels: {
    helpcenter_pageHeader: 'HELP CENTER',
  },
};

export default withStyles(HelpCenterHeader, style);
