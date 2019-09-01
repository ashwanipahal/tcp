import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Heading from '@tcp/core/src/components/common/atoms/Heading';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/PageHeadingWithLinks.styles';

export const PageHeadingWithLinks = ({
  className,
  programDetailsCta,
  termsConditionCta,
  children,
  labels,
  heading,
  ...otherProps
}) => {
  return (
    <>
      <BodyCopy className="elem-mb-XXL" component="div">
        <Heading component="h2" className={className} variant="h6" {...otherProps}>
          {heading}
        </Heading>
      </BodyCopy>
      {children}

      {programDetailsCta && termsConditionCta && (
        <Row className="elem-pb-MED">
          <Col
            colSize={{
              small: 6,
              large: 12,
              medium: 8,
            }}
            offsetLeft={{
              small: 1,
              large: 4,
              medium: 2,
            }}
            className="anchor-wrapper"
          >
            <Anchor
              fontSizeVariation="medium"
              underline
              to="/#"
              asPath
              anchorVariation="primary"
              dataLocator="terms_condition_cta"
              target="_blank"
              className="elem-ml-MED"
            >
              {termsConditionCta}
            </Anchor>
            <Anchor
              fontSizeVariation="medium"
              underline
              to="/#"
              asPath
              anchorVariation="primary"
              dataLocator="program_details_cta"
              className="elem-ml-LRG"
            >
              {programDetailsCta}
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
