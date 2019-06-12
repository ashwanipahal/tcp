import React from 'react';

import styled from 'styled-components';
import {
  HeadingLarge1,
  HeadingLarge2,
  HeadingLarge3,
  HeadingLarge4,
  HeadingLarge5,
  HeadingLarge6,
  Bodylarge3,
  BodyText1,
  Bodysmall1,
} from '@tcp/core/styles/themes/TCP/typotheme';

const Test = () => {
  return (
    <div>
      <HeadingLarge1 tag="h1">ALL H1 TO H6 variation large dynamic tag</HeadingLarge1>

      <HeadingLarge2 largeHeading="tertiary" tag="h4">
        ALL H1 TO H6 variation large dynamic tag
      </HeadingLarge2>

      <HeadingLarge3 tag="h3">ALL H1 TO H6 variation large dynamic tag</HeadingLarge3>

      <HeadingLarge4 tag="h1">ALL H1 TO H6 variation large dynamic tag</HeadingLarge4>

      <HeadingLarge5 tag="h1">ALL H1 TO H6 variation large dynamic tag</HeadingLarge5>

      <HeadingLarge6 tag="h1">ALL H1 TO H6 variation large dynamic tag</HeadingLarge6>

      <Bodylarge3 tag="h1">bodylarge3</Bodylarge3>

      <BodyText1 tag="h1">BodyText1</BodyText1>

      <Bodysmall1 tag="h2">bodysmall1 </Bodysmall1>
    </div>
  );
};
export default Test;
