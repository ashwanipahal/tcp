// Basic file for column in the grid structure
import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './RichText.style';
import withStyles from '../../hoc/withStyles';

const RichText = ({ richTextHtml }) => (
  // eslint-disable-next-line
  <div dangerouslySetInnerHTML={{ __html: richTextHtml }} />
);

RichText.propTypes = {
  richTextHtml: PropTypes.string.isRequired,
};

export default withStyles(RichText, styles);
export { RichText as RichTextVanilla };
