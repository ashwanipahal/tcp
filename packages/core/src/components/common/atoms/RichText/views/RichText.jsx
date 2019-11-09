import React from 'react';
import { PropTypes } from 'prop-types';
import { RenderTree, ComponentMap } from '@fabulas/astly';
import withStyles from '../../../hoc/withStyles';

import styles from '../RichText.style';

// This accepts an HTML and inserts it wherever the component is added.
const RichText = ({ className, richTextHtml, dataLocator, isNativeView, actionHandler }) => {
  if (isNativeView) {
    const handleNativeNavigation = node => {
      if (node.properties && node.properties.dataTarget) {
        actionHandler(node.properties.dataTarget);
      }
    };

    return (
      <RenderTree
        tools={{ navigate: handleNativeNavigation }}
        tree={`<div>${richTextHtml}</div>`}
        componentMap={ComponentMap}
      />
    );
  }

  // eslint-disable-next-line
  return (
    <div
      data-locator={dataLocator}
      className={className}
      dangerouslySetInnerHTML={{ __html: richTextHtml }}
    />
  );
};

RichText.propTypes = {
  className: PropTypes.string.isRequired,
  richTextHtml: PropTypes.string.isRequired,
  dataLocator: PropTypes.string,
  isNativeView: PropTypes.bool,
  actionHandler: PropTypes.func,
};

RichText.defaultProps = {
  dataLocator: '',
  isNativeView: false,
  actionHandler: () => {},
};

export default withStyles(RichText, styles);
export { RichText as RichTextVanilla };
