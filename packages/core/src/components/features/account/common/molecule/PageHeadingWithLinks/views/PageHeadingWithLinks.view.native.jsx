import React from 'react';
import PropTypes from 'prop-types';
import Heading from '@tcp/core/src/components/common/atoms/Heading';

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
    <Heading text={heading} {...otherProps} />
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

export default PageHeadingWithLinks;
