import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import PropTypes from 'prop-types';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import GenericSkeleton from '../../../../common/molecules/GenericSkeleton/GenericSkeleton.view';
import styles from '../styles/AddressListComponentSkeleton.style';

const AddressListComponentSkeleton = ({ className }) => {
  return (
    <div className={className}>
      <Row fullBleed>
        <Col
          colSize={{
            small: 6,
            large: 3,
            medium: 4,
          }}
          className="col-border-color elem-pt-MED elem-pr-SM elem-pb-MED elem-pl-SM"
        >
          <GenericSkeleton isCardView />
        </Col>
        <Col
          colSize={{
            small: 6,
            large: 3,
            medium: 4,
          }}
          className="col-border-color elem-pt-MED elem-pr-SM elem-pb-MED elem-pl-SM"
        >
          <GenericSkeleton isCardView />
        </Col>
      </Row>
    </div>
  );
};

AddressListComponentSkeleton.propTypes = {
  className: PropTypes.string,
};

AddressListComponentSkeleton.defaultProps = {
  className: '',
};

export default withStyles(AddressListComponentSkeleton, styles);
export { AddressListComponentSkeleton as AddressListComponentSkeletonVanilla };
