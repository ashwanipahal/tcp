import React from 'react';
import ButtonList from '../../ButtonList';
import mock from '../../../../../services/abstractors/common/moduleB/mock';
import { getLocator } from '../../../../../utils';
import config from '../ModuleB.config';

const { ctaTypes } = config;
const { ctaItems } = mock.moduleB.composites;

const ModuleB = () => {
  const buttonListCtaType = ctaTypes.divImageCTACarousel;
  return (
    <div>
      <ButtonList
        buttonsData={ctaItems}
        buttonListVariation={buttonListCtaType}
        dataLocatorDivisionImages={getLocator('moduleA_cta_image')}
        dataLocatorTextCta={getLocator('moduleA_cta_links')}
      />
    </div>
  );
};

export default ModuleB;
