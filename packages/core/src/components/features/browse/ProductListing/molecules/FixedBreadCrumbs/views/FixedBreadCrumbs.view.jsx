/* eslint-disable react/no-array-index-key */
/**
 * @module BreadCrumbs
 * @summary A React component rendering a list of hyperlinks as bread crumbs.
 /**
 * @module Breadcrum
 * @author Florencia Acosta <facosta@minutentag.com>
 * Component that displays a list of section links.
 *
 * @example
 * <code>
 *   <Breadcrum className={string} name={string} steps={array[object]} />
 * </code>
 *
 * Component Props description/enumeration:
 *  @param {string} actualSection: the text to display as title
 *  @param {string} className: the additional pickup person details
 *  @param {array} steps: array of links to show
 *
 * Style (ClassName) Elements description/enumeration
 *  .breadcrum-container
 *  .breadcrum-item
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import { Anchor } from '../../../../../../common/atoms';

const FixedBreadCrumbs = ({ crumbs, separationChar }) => {
  return (
    <div className="breadcrum-container">
      {crumbs.map((crumb, index) => {
        const {
          displayName,
          destinationUrl,
          destination,
          pathSuffix,
          ...otherHyperLinkProps
        } = crumb;

        // for PLP breadcrumb new field categoryKey is added So, if categoryKey exist then  pathSuffix will be updated by SeoUrl
        if (otherHyperLinkProps && otherHyperLinkProps.pathSuffix && otherHyperLinkProps.linkUrl) {
          otherHyperLinkProps.pathSuffix = otherHyperLinkProps.categoryKey;
        }
        const itemClassName =
          index === crumbs.length - 1 ? 'breadcrum-last-item' : 'breadcrum-item';
        return (
          <span key={`${displayName} ${index}`} className="breadcrum-item-container">
            {destinationUrl ? (
              <a className={itemClassName} href={destinationUrl}>
                {displayName}
              </a>
            ) : (
              <Anchor
                className={itemClassName}
                to={`/${destination}/${pathSuffix}`}
                {...otherHyperLinkProps}
              >
                {displayName}
              </Anchor>
            )}
            {index !== crumbs.length - 1 && (
              <span className="breadcrum-separation">{separationChar}</span>
            )}
          </span>
        );
      })}
    </div>
  );
};

FixedBreadCrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        /** A description of a (non-legacy) page, or section within a page, to link to */
        destination: PropTypes.string,
        /** optional suffix for the url's path (used for example to concatenate a skuId, etc.) */
        pathSuffix: PropTypes.string,
        /** Optional simple object of key-value pairs that will be appended to the query string of the url */
        queryValues: PropTypes.string,
        /** optional hash to be added to url */
        hash: PropTypes.string,
        /** optional state part for the url (see window.location docs).
         * Observe that this is ignored if the page is not the same as the current page (as this is not preseved
         * when going back to the server).
         */
        state: PropTypes.shape({}),
      }),
      PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        /** A url to link to */
        destinationUrl: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  separationChar: PropTypes.string,
};

FixedBreadCrumbs.defaultProps = {
  separationChar: '/',
};

export default FixedBreadCrumbs;
