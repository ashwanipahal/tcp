import React, { useLayoutEffect, useRef } from 'react';
import get from 'lodash.get';

export default function withHotfix(Component, hotfixPath) {
  const HOC = props => {
    const ref = useRef();
    const hotfix = get(global.TCP_HOTFIX.component, hotfixPath);
    const finalProps = { ...props, ...hotfix.props };

    useLayoutEffect(() => {
      const el = ref.current;
      if (el instanceof Element && hotfix.mutate instanceof Function) {
        try {
          hotfix.mutate({ el, props: finalProps, component: Component });
        } catch (ex) {
          console.log(`withHotfix error: ${ex}`);
        }
      }
    }, [ref]);

    return <Component ref={ref} {...finalProps} />;
  };

  HOC.displayName = `withHotfix(${Component.displayName || Component.name || 'Component'})`;

  return HOC;
}
