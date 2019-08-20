import React from 'react';
import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

const SEOTags = ({ seoConfig }) => (
  <React.Fragment>
    <NextSeo {...seoConfig} />
    <Head>
      {seoConfig.hrefLangs.map(lang => (
        <link rel="alternate" hrefLang={lang.id} href={lang.canonicalUrl} />
      ))}
    </Head>
  </React.Fragment>
);

SEOTags.propTypes = {
  seoConfig: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    canonical: PropTypes.string,
    twitter: PropTypes.objectOf(
      PropTypes.shape({
        cardType: PropTypes.string,
        site: PropTypes.string,
      })
    ),
    openGraph: PropTypes.objectOf(
      PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    hrefLangs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        canonicalUrl: PropTypes.string,
      })
    ),
    additionalMetaTags: PropTypes.arrayOf(
      PropTypes.shape({
        property: PropTypes.string,
        content: PropTypes.string,
      })
    ),
  }),
};

SEOTags.defaultProps = {
  seoConfig: {
    title: '',
    description: '',
    canonical: '',
    twitter: {
      cardType: '',
      site: '',
    },
    openGraph: {
      url: '',
      title: '',
      description: '',
    },
    hrefLangs: [],
    additionalMetaTags: [],
  },
};

export default SEOTags;
