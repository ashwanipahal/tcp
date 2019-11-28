import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLocator } from '../../../../../../../utils';
import style from '../SeoCopy.style';
import { Heading } from '../../../../../../common/atoms';
import Espot from '../../../../../../common/molecules/Espot';

class SeoCopy extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  handleSeoCopyView = e => {
    this.setState({ isExpanded: e.target.checked });
  };

  render() {
    const { copyBody, className, copyTitle } = this.props;
    const { isExpanded } = this.state;

    const READ_MORE = 'Read More+';
    const READ_LESS = 'Read Less-';

    return (
      <BodyCopy
        component="div"
        className={`${className} ${isExpanded && 'read-more-expanded'} seo-text`}
        tabIndex="0"
      >
        {copyTitle && (
          <Heading component="h5" variant="h5" className="title" dataLocator="seo_title">
            {copyTitle}
          </Heading>
        )}
        {copyBody && (
          <BodyCopy
            className="body-copy"
            fontSize="fs14"
            component="div"
            color="text.primary"
            fontFamily="secondary"
            fontWeight="regular"
            textAlign="center"
            data-locator={getLocator('seo_body')}
          >
            <Espot richTextHtml={copyBody} />
          </BodyCopy>
        )}
        {copyBody && copyBody.includes('read-more-target') && (
          <label htmlFor="seo-text" className="read-more-trigger">
            <input
              type="checkbox"
              className="read-more-state"
              id="seo-text"
              onChange={this.handleSeoCopyView}
            />
            <BodyCopy
              className="read-more"
              component="p"
              fontFamily="secondary"
              fontWeight="semibold"
              textAlign="center"
              data-locator={getLocator('seo_readmore')}
              tabIndex="0"
            >
              {READ_MORE}
            </BodyCopy>
            <BodyCopy
              className="read-less"
              component="p"
              fontFamily="secondary"
              fontWeight="semibold"
              textAlign="center"
              data-locator={getLocator('seo_readless')}
              tabIndex="0"
            >
              {READ_LESS}
            </BodyCopy>
          </label>
        )}
      </BodyCopy>
    );
  }
}

SeoCopy.propTypes = {
  copyBody: PropTypes.string,
  className: PropTypes.string,
  copyTitle: PropTypes.string,
};

SeoCopy.defaultProps = {
  className: '',
  copyBody: '',
  copyTitle: '',
};

export default withStyles(errorBoundary(SeoCopy), style);
export { SeoCopy as SeoCopyVanilla };
