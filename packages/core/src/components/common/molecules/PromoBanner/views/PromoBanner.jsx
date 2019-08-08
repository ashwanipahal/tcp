// @flow
import React from 'react';
import { Anchor, BodyCopy } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import PromoBannerStyle from '../PromoBanner.style';

type Props = {
  promoBanner: Array<Object>,
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
  const {
    promoBanner: [{ textItems, link }],
    className,
    ...otherProps
  } = props;
  return (
    <BodyCopy component="div" className={className} {...otherProps}>
      <React.Fragment>
        <Anchor {...link}>
          {textItems.map(({ text, style }, index) => (
            <span className={`promo-text ${style}`}>{index ? ` ${text}` : text}</span>
          ))}
        </Anchor>
      </React.Fragment>
    </BodyCopy>
  );
};

export { PromoBanner as PromoBannerVanilla };
export default withStyles(PromoBanner, PromoBannerStyle);
