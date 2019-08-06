// @flow
import React from 'react';
import LinkText from '../../LinkText';
import { Container } from '../ModuleN.styles.native';
import moduleN from '../mock';

const datamoduleN = { ...moduleN };

/**
 * @param {object} props : Props for Module N multi list banner.
 * @desc This is Module N global component. It has capability to display
 * featured content module with 1 backckground color tiles ,links and a CTA Button list.
 * Author can surface teaser content leading to corresponding pages.
 */

const ModuleN = () => {
  const { headerText } = datamoduleN.moduleN.composites;

  return (
    <Container background="red">
      <LinkText
        type="heading"
        fontFamily="primary"
        fontSize="fs20"
        letterSpacing="ls271"
        textAlign="center"
        color="white"
        textItems={headerText[0].textItems}
      />
    </Container>
  );
};

export default ModuleN;
export { ModuleN as ModuleNVanilla };
