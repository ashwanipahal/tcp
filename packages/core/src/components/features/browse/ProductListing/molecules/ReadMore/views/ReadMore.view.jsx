import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import style from '../ReadMore.style';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { PropTypes } from 'prop-types';

class ReadMore extends React.Component {
  static propTypes = {
    /** Description for the category */
    description: PropTypes.string.isRequired,
  };

  render() {
    const { description, className } = this.props;

    return (
      <BodyCopy component="div" className={className}>
        <input type="checkbox" className="read-more-state" id="post-1" />
        <BodyCopy
          className="body-copy"
          fontSize="fs14"
          component="div"
          color="text.primary"
          fontFamily="secondary"
          fontWeight="regular"
          textAlign="center"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {description && description.includes('read-more-target') && (
          <label htmlFor="post-1" className="read-more-trigger" />
        )}
      </BodyCopy>
    );
  }
}

export default errorBoundary(withStyles(ReadMore, style));
export { ReadMore as ReadMoreVanilla };
