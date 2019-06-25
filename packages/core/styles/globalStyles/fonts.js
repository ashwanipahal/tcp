import { css } from 'styled-components';

// TODO: issue on semibold 500 or 600 font; Can we set semibold === 500 or 600
export default css`
  @font-face {
    font-family: 'Nunito';
    src: url('/static/fonts/Nunito-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Nunito';
    src: url('/static/fonts/Nunito-SemiBold.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Nunito';
    src: url('/static/fonts/Nunito-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Nunito';
    src: url('/static/fonts/Nunito-ExtraBold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Nunito';
    src: url('/static/fonts/Nunito-Black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat';
    src: url('/static/fonts/Montserrat-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Montserrat';
    src: url('/static/fonts/Montserrat-SemiBold.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Montserrat';
    src: url('/static/fonts/Montserrat-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Montserrat';
    src: url('/static/fonts/Montserrat-ExtraBold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Montserrat';
    src: url('/static/fonts/Montserrat-Black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
  }
`;
