import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Heading, BodyCopy, TextItems } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';
import LinkTextStyle from '../LinkText.style';
import { configureInternalNavigationFromCMSUrl } from '../../../../../utils';

/**
 * This component creates a link with styled text
 * Text can be configured to be inside a heading tag to some other element.
 * This component uses BodyCopy atom and Heading atom and differentiates based on type="heading"
 * @param {*} props
 * type="heading" if heading is required
 * component="div|any" if type is heading then component should be "h1|h2|h3|h4|h5|h6"
 * accepts all parameters for BodyCopy and Heading atom
 *
 * [TODO] Can configure icon in heading at start|middle|last
 */
const LinkText = props => {
  const {
    className,
    type,
    component,
    headerText,
    headingClass,
    color,
    dataLocator,
    ...otherProps
  } = props;
  let Component;
  let compProps = {};
  const heading = headingClass || '';

  if (type === 'heading') {
    Component = Heading;
    compProps.variant = component;
    compProps.color = color;
    compProps.dataLocator = dataLocator;
    compProps.color = color;
  } else {
    Component = BodyCopy;
    compProps = {
      component,
      'data-locator': dataLocator,
      ...otherProps,
    };
  }

  return (
    <div className={className}>
      {headerText.map((item, index) => {
        const { link, textItems } = item;
        const navigationUrl = link;
        navigationUrl.to = configureInternalNavigationFromCMSUrl(link.url);
        navigationUrl.asPath = link.url;

        if (type === 'heading') {
          compProps.dataLocator = `${compProps.dataLocator}_${index}`;
        } else {
          compProps['data-locator'] = `${compProps['data-locator']}_${index}`;
        }

        return (
          <Anchor key={index.toString()} {...navigationUrl}>
            <Component {...compProps} className={`${heading} link-text`}>
              <TextItems textItems={textItems} />
            </Component>
          </Anchor>
        );
      })}
    </div>
  );
};

LinkText.defaultProps = {
  type: '',
  component: () => null,
  headerText: [],
  className: '',
  dataLocator: '',
  headingClass: '',
  color: '',
};

LinkText.propTypes = {
  type: PropTypes.string,
  component: PropTypes.elementType,
  headerText: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
  dataLocator: PropTypes.string,
  headingClass: PropTypes.string,
  color: PropTypes.string,
};

export default withStyles(errorBoundary(LinkText), LinkTextStyle);
export { LinkText as VanillaLinkText };
