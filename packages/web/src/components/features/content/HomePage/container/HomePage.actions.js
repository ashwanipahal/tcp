import { loadPageSEOData } from '@tcp/core/src/reduxStore/actions';
import { SEO_DATA } from '@tcp/core/src/reduxStore/constants';

/* eslint-disable import/prefer-default-export */
export const initActions = [loadPageSEOData({ page: SEO_DATA.home })];
