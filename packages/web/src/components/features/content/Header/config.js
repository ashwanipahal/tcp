import { getStaticFilePath } from '@tcp/core/src/utils';

export default {
  tcp: {
    alt: "The Children's Place",
    dataLocator: 'global_TCPlink',
    imgSrc: getStaticFilePath('/images/tcp-logo.svg'),
    title: "The Children's Place",
  },
  gym: {
    alt: 'Gymboree',
    dataLocator: 'global_Gymboreelink',
    imgSrc: getStaticFilePath('/images/gymboree-logo.svg'),
    title: 'Gymboree',
  },
};
