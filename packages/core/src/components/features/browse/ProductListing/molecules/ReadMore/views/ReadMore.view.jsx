import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLocator } from '../../../../../../../utils';
import style from '../ReadMore.style';

const ReadMore = props => {
  const { description, className, labels } = props;

  return (
    <BodyCopy component="div" className={className}>
      <label htmlFor="categoryDescription" className="read-more-trigger">
        <input type="checkbox" className="read-more-state" id="categoryDescription" />
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
          <React.Fragment>
            <BodyCopy
              className="read-more"
              component="p"
              fontFamily="secondary"
              fontWeight="semibold"
              textAlign="center"
              data-locator={getLocator('plp_seo_readmore')}
            >
              {labels.lbl_read_more}
            </BodyCopy>
            <BodyCopy
              className="read-less"
              component="p"
              fontFamily="secondary"
              fontWeight="semibold"
              textAlign="center"
              data-locator={getLocator('plp_seo_readless')}
            >
              {labels.lbl_read_less}
            </BodyCopy>
          </React.Fragment>
        )}
      </label>
    </BodyCopy>
  );
};

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
