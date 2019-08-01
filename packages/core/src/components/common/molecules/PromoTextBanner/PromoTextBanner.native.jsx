// @flow
import React from 'react';

import { BodyCopy } from './PromoTextBanner.style.native';

type Props = {
  promoTextBanner: Array<Object>,
  bodyCopyStyles: Array<Object>,
};

/* bodyCopyStyles is a array of BodyCopy component with key of style1,style2,style3 etc.
    The keys are coming from CMS */
const bodyCopyStyles = {
  style1: props => <BodyCopy fontSize="fs36" fontWeight="black" {...props} />,
  style2: props => <BodyCopy fontSize="fs42" textAlign="center" lineHeight="42px" {...props} />,
  style3: props => (
    <BodyCopy
      fontSize="fs64"
      fontWeight="black"
      color="black"
      lineHeight="64px"
      textAlign="center"
      {...props}
    />
  ),
};

/**
 * This component produces a Promo Text banner
 * Expects textItems array consisting of objects in below format
 * {
 *    style: "",
 *    text: ""
 * }
 * This component accepts BodyCopy styles in array return matching BodyCopy style with
 * the key provided by CMS
 * @param {*} props
 */
const PromoTextBanner = (props: Props) => {
  const {
    promoTextBanner: [{ textItems }],
    ...otherProps
  } = props;
  return [
    textItems.map(({ text, style }, index) => {
      const StyleBodyCopy = bodyCopyStyles[style];
      return <StyleBodyCopy text={index ? ` ${text}` : text} {...otherProps} />;
    }),
  ];
};

export default PromoTextBanner;
