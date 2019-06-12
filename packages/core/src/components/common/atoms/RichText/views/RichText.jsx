import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles';

import styles from '../RichText.style';

// This accepts an HTML and inserts it wherever the component is added.
const RichText = ({ className, richTextHtml }) => (
  // eslint-disable-next-line
  <div className={className} dangerouslySetInnerHTML={{ __html: richTextHtml }} />
);

RichText.propTypes = {
  className: PropTypes.string.isRequired,
  richTextHtml: PropTypes.string.isRequired,
};

export default withStyles(RichText, styles);
export { RichText as RichTextVanilla };
