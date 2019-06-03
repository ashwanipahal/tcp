import { css } from 'styled-components';

const CDNpath =
  process.env.NODE_ENV === 'production' && process.env.CDN_ENABLE === 'true'
    ? process.env.CDN_URL
    : '';

export default css`
  @font-face {
    font-family: 'icons';
    src: url('${CDNpath}/static/fonts/icons.ttf?n2bcc7') format('truetype'),
      url('${CDNpath}/static/fonts/icons.woff?n2bcc7') format('woff'),
      url('${CDNpath}/static/fonts/icons.svg?n2bcc7#icons') format('svg');
    font-weight: normal;
    font-style: normal;
  }
`;
