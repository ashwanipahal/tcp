import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import Heading from '@tcp/core/src/components/common/atoms/Heading';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/PageHeadingWithLinks.styles';

export const PageHeadingWithLinks = ({ className, programDetailsCta, termsConditionCta, children, labels, heading, ...otherProps }) => {
  return (
    <>
      <Heading component="h2" variant="h6" className={className} {...otherProps}>
        {heading}
      </Heading>
      {children}

      { programDetailsCta && termsConditionCta && (
      <Row fullBleed className="elem-pb-MED">
        <Col
          colSize={{
            large: 2,
            medium: 2,
            small: 2,
          }}
          offsetLeft={{
            large: 4,
            medium: 2,
            small: 1,
          }}
        >
          <Anchor fontSizeVariation="medium" underline anchorVariation="primary" to="/#" asPath>
            {programDetailsCta}
          </Anchor>
        </Col>
        <Col
          colSize={{
            large: 2,
            medium: 2,
            small: 2,
          }}
        >
          <Anchor fontSizeVariation="medium" underline anchorVariation="primary" to="/#" asPath>
            {termsConditionCta}
          </Anchor>
        </Col>
      </Row>
      )}
    </>
  );
};

PageHeadingWithLinks.propTypes = {
  className: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  programDetailsCta: PropTypes.string.isRequired,
  termsConditionCta: PropTypes.string.isRequired,
  labels: PropTypes.shape({}),
  children: PropTypes.string.isRequired,
};

PageHeadingWithLinks.defaultProps = {
  labels: {},
};

export default withStyles(PageHeadingWithLinks, styles);
