import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles';

import styles from '../RichText.style';

// This accepts an HTML and inserts it wherever the component is added.
const RichText = ({ className, richTextHtml, dataLocator }) => (
  // eslint-disable-next-line
  <div
    data-locator={dataLocator}
    className={className}
    dangerouslySetInnerHTML={{ __html: richTextHtml }}
  />
);

RichText.propTypes = {
  className: PropTypes.string.isRequired,
  richTextHtml: PropTypes.string.isRequired,
  dataLocator: PropTypes.string,
};

RichText.defaultProps = {
  dataLocator: '',
};

export default withStyles(RichText, styles);
export { RichText as RichTextVanilla };
