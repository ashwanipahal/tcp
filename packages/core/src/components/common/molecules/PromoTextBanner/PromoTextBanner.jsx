// @flow
import React from 'react';
import { BodyCopy } from '../../atoms';
import withStyles from '../../hoc/withStyles';
import PromoBannerStyle from './PromoTextBanner.style';

type Props = {
  textItems: Object,
  className: String,
};

/**
 * This component produces a Promo Text banner
 * Expects textItems array consisting of objects in below format
 * {
 *    style: "",
 *    text: ""
 * }
 * This component uses BodyCopy atom and accepts all properties of BodyCopy
 * @param {*} props
 */
const PromoBanner = (props: Props) => {
  const { textItems, className, ...otherProps } = props;

  return (
    <BodyCopy component="div" className={className} {...otherProps}>
      <React.Fragment>
        {textItems.map(({ text, style }, index) => (
          <span className={`promo-text ${style}`}>{index ? ` ${text}` : text}</span>
        ))}
      </React.Fragment>
    </BodyCopy>
  );
};

export { PromoBanner as PromoBannerVanilla };
export default withStyles(PromoBanner, PromoBannerStyle);
