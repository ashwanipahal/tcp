import { css } from 'styled-components';

// TODO: issue on semibold 500 or 600 font; Can we set semibold === 500 or 600
export default css`
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: local('Montserrat Regular'), local('Montserrat-Regular'),
      url('/static/fonts/Montserrat-regular.woff2') format('woff2'),
      url('/static/fonts/Montserrat-regular.woff') format('woff');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'),
      url('/static/fonts/Montserrat-600.woff2') format('woff2'),
      url('/static/fonts/Montserrat-600.woff') format('woff');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'),
      url('/static/fonts/Montserrat-800.woff2') format('woff2'),
      url('/static/fonts/Montserrat-800.woff') format('woff');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 900;
    src: local('Montserrat Black'), local('Montserrat-Black'),
      url('/static/fonts/Montserrat-900.woff2') format('woff2'),
      url('/static/fonts/Montserrat-900.woff') format('woff');
  }

  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    src: local('Nunito Regular'), local('Nunito-Regular'),
      url('/static/fonts/Nunito-regular.woff2') format('woff2'),
      url('/static/fonts/Nunito-regular.woff') format('woff');
  }

  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 600;
    src: local('Nunito SemiBold'), local('Nunito-SemiBold'),
      url('/static/fonts/Nunito-600.woff2') format('woff2'),
      url('/static/fonts/Nunito-600.woff') format('woff');
  }

  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 800;
    src: local('Nunito ExtraBold'), local('Nunito-ExtraBold'),
      url('/static/fonts/Nunito-800.woff2') format('woff2'),
      url('/static/fonts/Nunito-800.woff') format('woff');
  }

  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 900;
    src: local('Nunito Black'), local('Nunito-Black'),
      url('/static/fonts/Nunito-900.woff2') format('woff2'),
      url('/static/fonts/Nunito-900.woff') format('woff');
  }
`;
