import React, { Fragment } from 'react';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import Image from '@tcp/core/src/components/common/atoms/Image';
import ModuleD from '../../../../common/organisms/ModuleD';

const HomePageView = data => {
  const layoutItems = data.layout.layout.val.layout;

  return (
    <Fragment>
      <Image src="/static/images/hero.png" />
      {layoutItems.val.map(item => (
        <Fragment>
          {item.val.typ === 'module' && item.val.sub === 'moduleA' ? <div>module A</div> : ''}
          {item.val.typ === 'module' && item.val.sub === 'moduleB' ? <div>module B</div> : ''}
          {item.val.typ === 'module' && item.val.sub === 'moduleD' ? <ModuleD /> : ''}
          {item.val.typ === 'module' && item.val.sub === 'moduleK' ? <div>module K</div> : ''}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default errorBoundary(HomePageView);
