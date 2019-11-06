/* eslint-disable no-console */
import React, { useLayoutEffect, useRef, useContext } from 'react';
import { HotfixPropsContext, HotfixBrowserContext } from '../context/HotfixContext';

function displayName(Component) {
  return Component.displayName || Component.name;
}

/**
 * Hook for applying derived prop overrides to components
 * @param {React.Component} Component component
 * @param {Object} props props
 */
function usePropsHotfix(Component, props) {
  const key = displayName(Component);
  const context = useContext(HotfixPropsContext);
  const hotfixFunction = context[key];

  try {
    return hotfixFunction(props);
  } catch (e) {
    console.log(`usePropsHotfix ${e}`);
    // Default to empty object for merging
    return {};
  }
}

/**
 * Hook for applying DOM manipulations to component root elements
 * @param {React.Component} Component component
 * @param {Object} props props
 */
function useBrowserHotfix(Component, props) {
  const key = displayName(Component);
  const context = useContext(HotfixBrowserContext);
  const hotfixFunction = context[key];
  const ref = useRef();

  useLayoutEffect(() => {
    const element = ref.current;
    try {
      return hotfixFunction(element, props);
    } catch (e) {
      console.log(`useBrowserHotfix ${e}`);
      return undefined;
    }
  }, [ref]);

  return ref;
}

/**
 * HOC for applying hotfixes to props and DOM elements
 * @param {React.Component} Component component
 */
export default function withHotfix(Component) {
  const HOC = props => {
    const hotfixProps = usePropsHotfix(Component, props);
    const combinedProps = { ...props, ...hotfixProps };
    const ref = useBrowserHotfix(Component, combinedProps);
    return <Component ref={ref} {...combinedProps} />;
  };

  HOC.displayName = `withHotfix(${displayName(Component)})`;
  return HOC;
}
