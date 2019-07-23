// @flow
import React from 'react';
import { Anchor, BodyCopy } from '../../../atoms';

type Props = {
  linkClass: Object,
  textItems: Object,
};

const PromoBanner = ({ linkClass: { url, target }, textItems }: Props) => {
  return (
    <BodyCopy component="div" className="moduleL__promo-banner">
      <Anchor to={url} target={target}>
        {textItems.map(({ text, style }, index) => (
          <BodyCopy
            key={index.toString()}
            component="span"
            className={`moduleL__promo-text ${style}`}
            fontSize={['fs48']}
          >
            {`${text} `}
          </BodyCopy>
        ))}
      </Anchor>
    </BodyCopy>
  );
};

export default PromoBanner;
