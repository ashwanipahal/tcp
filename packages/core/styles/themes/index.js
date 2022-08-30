import themeTCP from './TCP';
import themeGymboree from './Gymboree';
import { getAPIConfig } from '../../src/utils';

const getCurrentTheme = () => {
  const brand = getAPIConfig().brandId;
  switch (brand) {
    case 'tcp':
      return themeTCP;

    case 'gym':
      return themeGymboree;

    default:
      return themeTCP;
  }
};

export default getCurrentTheme;
