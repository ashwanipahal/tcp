import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import HelpCenterHeader from '@tcp/core/src/components/common/molecules/HelpCenterHeader';
import { Row, Col } from '../../../atoms';
import style from '../styles/HelpCenterTemplate.style';

const HelpCenter = ({ className, childProps, mainContent: MainContent, labels }) => {
  // const { navData, active } = navLinkProps;
  return (
    <div className={className}>
      <Row>
        <HelpCenterHeader labels={labels} />
      </Row>

      <Row className="is-hidden-nav__desktop">
        <Col
          colSize={{ large: 12, medium: 4, small: 6 }}
          className="help-center-template__dropdown"
        >
          {/* <Dropdown options={navData} active={active} isUpperCase /> */}
          {/* TO DO - Dropdown options for mobile and tablet view */}
          DROP DOWN CONTAINER
        </Col>
      </Row>
      <Row className="help-center-template">
        <Col colSize={{ small: 6, medium: 8, large: 2 }} className="is-hidden-nav__medSmall">
          {/* TO DO - Left Side Navigation for Desktop web view */}
          Left Side Navigation
        </Col>
        <Col
          colSize={{ small: 6, medium: 8, large: 9 }}
          offsetRight={{
            small: 0,
            medium: 0,
            large: 1,
          }}
        >
          <MainContent {...childProps} />
        </Col>
      </Row>
    </div>
  );
};
HelpCenter.propTypes = {
  className: PropTypes.string.isRequired,
  navLinkProps: PropTypes.shape([]).isRequired,
  childProps: PropTypes.shape({}).isRequired,
  mainContent: PropTypes.node.isRequired,
  labels: PropTypes.shape({}).isRequired,
};
export default withStyles(HelpCenter, style);
export { HelpCenter as VanillaHelpCenter };
