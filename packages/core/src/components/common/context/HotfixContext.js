import { createContext } from 'react';

/**
 * Context for the global registry of component prop overrides
 */
export const HotfixPropsContext = createContext({});

/**
 * Context for the global registry of DOM side-effect functions
 */
export const HotfixBrowserContext = createContext({});
