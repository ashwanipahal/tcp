// @flow
import React from 'react';

type Props = {
  promoTextBanner: Array<Object>,
  bodyCopyStyles: Array<Object>,
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
    /* bodyCopyStyles is a array of BodyCopy component with key of style1,style2,style3 etc.
    The keys are coming from CMS */
    bodyCopyStyles,
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
