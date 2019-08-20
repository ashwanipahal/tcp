// @flow
import React from 'react';
import { Container } from '../ModuleA.style.native';
import moduleA from '../../../../../services/abstractors/common/moduleA/mock';
import ModuleATcpCarousel from '../../ModuleATcpCarousel';

const datamoduleA = { ...moduleA };

/**
 * @param {object} props : Props for Module A multi type of banner list, button list, header text.
 * @desc This is Module A global component. It has capability to display
 * featured content module with 1 backckground color tiles ,links and a CTA Button list.
 * Author can surface teaser content leading to corresponding pages.
 */

const ModuleA = (props: Props) => {
  const { navigation } = props;
  const { largeCompImageCarousel } = datamoduleA.moduleA.composites;

  return (
    <Container>
      <ModuleATcpCarousel navigation={navigation} largeCompImageCarousel={largeCompImageCarousel} />
    </Container>
  );
};

export default ModuleA;
export { ModuleA as ModuleAVanilla };
