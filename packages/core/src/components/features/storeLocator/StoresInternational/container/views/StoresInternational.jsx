import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import { Anchor } from '@tcp/core/src/components/common/atoms';
import { isClient, getLocator, getLabelValue } from '@tcp/core/src/utils';
import style from '../styles/StoresInternational.style';

const StoresInternational = ({ className, content, dataLocator, children, labels }) => (
  <div className={className}>
    <Anchor
      fontSizeVariation="xlarge"
      anchorVariation="secondary"
      handleLinkClick={e => {
        e.preventDefault();
        if (isClient()) window.history.back();
      }}
      noLink
      className={`${className}__backlink`}
      title={getLabelValue(labels, 'lbl_storelist_backLink')}
      dataLocator={getLocator('store_USCanadabacklink')}
    >
      <span className="left-arrow" />
      {getLabelValue(labels, 'lbl_storelist_backLink')}
    </Anchor>
    <RichText dataLocator={dataLocator} richTextHtml={content} />
    {children}
  </div>
);

StoresInternational.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
  content: PropTypes.string.isRequired,
  dataLocator: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
};

StoresInternational.defaultProps = {
  children: null,
};

export default withStyles(StoresInternational, style);
