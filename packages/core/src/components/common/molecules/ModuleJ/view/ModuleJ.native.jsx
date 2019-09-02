import React from 'react';
import { Text } from 'react-native';

import { Container } from '../ModuleJ.style.native';

import ProductListTabs from '../../../organisms/ProductListTabs';

const ModuleA = () => {
  return (
    <Container>
      <Text>Hello Module J</Text>
      <ProductListTabs />
    </Container>
  );
};

export default ModuleA;
export { ModuleA as ModuleAVanilla };
