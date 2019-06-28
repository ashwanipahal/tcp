import React from 'react';

const scriptSrc = [
  '//assets.adobedtm.com/launch-EN35cf63837e524037bc099142d8051c4b-development.min.js',
];

const Scripts = () =>
  scriptSrc.map(item => {
    return <script type="text/javascript" src={item} />;
  });

export default Scripts;
