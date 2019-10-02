import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLocator } from '../../../../../../../utils';
import style from '../ReadMore.style';

class ReadMore extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  handleReadMoreView = e => {
    this.setState({ isExpanded: e.target.checked });
  };

  render() {
    const { description, className, labels } = this.props;
    const { isExpanded } = this.state;

    return (
      <BodyCopy
        component="div"
        className={`${className} ${isExpanded && 'read-more-expanded'}`}
        tabIndex="0"
      >
        <BodyCopy
          className="body-copy"
          fontSize="fs14"
          component="div"
          color="text.primary"
          fontFamily="secondary"
          fontWeight="regular"
          textAlign="center"
          dangerouslySetInnerHTML={{ __html: description }}
          data-locator={getLocator('plp_seo_module')}
        />
        {description && description.includes('read-more-target') && (
          <label htmlFor="categoryDescription" className="read-more-trigger">
            <input
              type="checkbox"
              className="read-more-state"
              id="categoryDescription"
              onChange={this.handleReadMoreView}
            />
            <BodyCopy
              className="read-more"
              component="p"
              fontFamily="secondary"
              fontWeight="semibold"
              textAlign="center"
              data-locator={getLocator('plp_seo_readmore')}
              tabIndex="0"
            >
              {labels.readMore}
            </BodyCopy>
            <BodyCopy
              className="read-less"
              component="p"
              fontFamily="secondary"
              fontWeight="semibold"
              textAlign="center"
              data-locator={getLocator('plp_seo_readless')}
              tabIndex="0"
            >
              {labels.readLess}
            </BodyCopy>
          </label>
        )}
      </BodyCopy>
    );
  }
}

ReadMore.propTypes = {
  description: PropTypes.string,
  className: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

ReadMore.defaultProps = {
  className: '',
  description: '',
  labels: {},
};

export default withStyles(errorBoundary(ReadMore), style);
export { ReadMore as ReadMoreVanilla };
