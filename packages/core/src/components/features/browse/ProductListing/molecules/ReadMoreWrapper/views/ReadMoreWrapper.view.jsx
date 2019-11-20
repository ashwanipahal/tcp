import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../ReadMoreWrapper.style';
import { Col } from '../../../../../../common/atoms';
import ReadMore from '../../ReadMore/views';

class ReadMoreWrapper extends React.PureComponent {
  render() {
    const { longDescription, className, labels } = this.props;

    return (
      <Col className={className} colSize={{ small: 6, medium: 8, large: 12 }}>
        <ReadMore description={longDescription} labels={labels} className="seo-text" />
      </Col>
    );
  }
}

ReadMoreWrapper.propTypes = {
  longDescription: PropTypes.string,
  className: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

ReadMoreWrapper.defaultProps = {
  className: '',
  longDescription: '',
  labels: {},
};

export default withStyles(ReadMoreWrapper, style);
