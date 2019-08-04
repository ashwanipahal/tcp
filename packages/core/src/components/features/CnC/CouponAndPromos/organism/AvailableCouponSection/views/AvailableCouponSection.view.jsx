import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import styles from '../styles/AvailableCouponSection';

class AvailableCouponSection extends React.PureComponent<Props> {
  render() {
    const { labels } = this.props;
    return (
      <Row>
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: 12,
          }}
        >
          {labels.ACC_LBL_LOGIN_EMAIL}
        </Col>
      </Row>
    );
  }
}

AvailableCouponSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default withStyles(AvailableCouponSection, styles);
export { AvailableCouponSection as LoginSectionVanilla };
