import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';

import styles from '../RichText.style';

const RichText = ({ richTextHtml }) => (
  // eslint-disable-next-line
  <div dangerouslySetInnerHTML={{ __html: richTextHtml }} />
);

RichText.propTypes = {
  richTextHtml: PropTypes.string.isRequired,
};

export default withStyles(RichText, styles);
export { RichText as RichTextVanilla };
