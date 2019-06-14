const accountLink = 'https://www.childrensplace.com/us/account';

export default {
  footer_top: {
    email_sms_signup: {
      url: '/',
      title: 'Get $10 off by signing up for email or text',
      text: 'GET <span class="l-color-primary">$10 OFF</span> BY SIGNING UP FOR EMAIL OR TEXT',
      target: 'email_signup_popup',
    },
    refer_a_fried: {
      url: '/',
      title: 'Refer a friend and earn another $10',
      text: 'REFER A FRIEND AND EARN ANOTHER <span class="l-color-primary">$10</span>',
      target: '',
    },
    social_media_links: [
      {
        url: 'http://facebook.com/childrensplace',
        title: 'Facebook',
        target: '_blank',
        iconClass: 'icon-facebook',
      },
      {
        url: 'http://twitter.com/childrensplace',
        title: 'Twitter',
        target: '_blank',
        iconClass: 'icon-twitter',
      },
      {
        url: 'http://instagram.com/childrensplace',
        title: 'Instagram',
        target: '_blank',
        iconClass: 'icon-instagram',
      },
      {
        url: 'http://pinterest.com/childrensplace',
        title: 'Pinterest',
        target: '_blank',
        iconClass: 'icon-pinterest',
      },
    ],
  },
  footer_middle: {
    mpr: {
      link: {
        url: 'https://www.childrensplace.com/us/content/myplace-rewards-page',
        image_alt: 'My Place Rewards image',
        image_url: 'mp-rewards-orange.png',
        title: 'My Place rewards title',
        text: 'My Place Rewards',
        target: '_blank',
      },
      sub_links: [
        {
          url: accountLink,
          title: 'Create An Account title',
          text: 'Create An Account',
          target: '',
        },
        {
          url: accountLink,
          title: 'Check Point Balance title',
          text: 'Check Point Balance',
          target: '',
        },
        {
          url: accountLink,
          title: 'Redeem rewards title',
          text: 'Redeem Rewards',
          target: '',
        },
        {
          url:
            'https://www.childrensplace.com/us/content/myplace-rewards-page?ecid=mpr_txt_learn_glft_100916',
          title: 'Member benefits title',
          text: 'Member Benefits',
          target: '',
        },
      ],
    },
    mpr_cc: {
      link: {
        url: 'https://www.childrensplace.com/us/place-card/?ecid=mprcc_txt_learn_glft_100916',
        image_alt: 'My Place Rewards Credit Card image',
        image_url: 'mp-rewards-blue.png',
        title: 'My Place rewards credit card title',
        text: 'My Place Rewards Credit Card',
        target: '_blank',
      },
      sub_links: [
        {
          url: 'https://www.childrensplace.com/us/place-card/?ecid=mprcc_txt_learn_glft_100916',
          title: 'Learn more title',
          text: 'Learn More',
          target: '',
        },
        {
          url: 'https://www.childrensplace.com/us/place-card/application',
          title: 'Apply now title',
          text: 'Apply Now',
          target: '',
        },
        {
          url: 'https://d.comenity.net/childrensplace/?ecid=paybill',
          title: 'Pay your bill title',
          text: 'Pay Your Bill',
          target: '',
        },
        {
          url: 'https://d.comenity.net/childrensplace/?ecid=manageacct',
          title: 'Manage your account title',
          text: 'Manage Your Account',
          target: '',
        },
      ],
    },
    nav_links: [
      {
        items: [
          {
            text: 'HELP CENTER',
            links: [
              {
                url: 'https://www.childrensplace.com/us/help-center/#faq',
                text: 'FAQs',
                title: 'Frequently Asked Questions',
              },
              {
                url: 'https://www.childrensplace.com/us/account/orders',
                text: 'Track Order',
                title: 'Track Order Title',
              },
              {
                url: 'https://www.childrensplace.com/us/help-center/#returnExchangePolicyli',
                text: 'Return Policy',
                title: 'Return Policy Title',
              },
            ],
          },
        ],
      },
      {
        items: [
          {
            text: 'SHOPPING',
            links: [
              {
                url:
                  'https://www.childrensplace.com/us/content/childrens-place-coupons?icid=coupon_glft_cplp_txt_121914_null',
                text: 'Coupons',
                title: 'Coupons Title',
              },
              {
                url: 'https://www.childrensplace.com/us/store-locator',
                text: 'Store Locator',
                title: 'Store Locator Title',
              },
            ],
          },
        ],
      },
      {
        items: [
          {
            // isSubHeader: true,
            text: 'ABOUT US',
            links: [
              {
                url: 'https://corporate.childrensplace.com/corporate-responsibility',
                text: 'Public Relations',
                title: 'Public Relations Title',
              },
              {
                url: 'https://childrensplace.gcs-web.com',
                text: 'Investor Relations',
                title: 'Investor Relations Title',
              },
              {
                url: 'https://corporate.childrensplace.com/careers',
                text: 'Careers',
                title: 'Careers Title',
              },
            ],
          },
        ],
      },
      {
        items: [
          {
            // isSubHeader: true,
            text: 'ABOUT US',
            links: [
              {
                url: 'https://corporate.childrensplace.com/corporate-responsibility',
                text: 'Public Relations',
                title: 'Public Relations Title',
              },
              {
                url: 'https://childrensplace.gcs-web.com',
                text: 'Investor Relations',
                title: 'Investor Relations Title',
              },
              {
                url: 'https://corporate.childrensplace.com/careers',
                text: 'Careers',
                title: 'Careers Title',
              },
            ],
          },
        ],
      },
    ],
  },
  footer_bottom: {
    copyrights: {
      text: "<p>&copy; 2019 The Children's Place | Big fashion, little prices</p>",
    },
    legal_links: [
      {
        url: 'https://www.childrensplace.com/us/help-center/#termsAndConditionsli',
        title: 'Terms and Conditions title',
        text: 'Terms and Conditions',
        name: 'terms_and_conditions',
        target: '_blank',
      },
      {
        url: 'https://www.childrensplace.com/us/help-center/#privacyPolicySectionli',
        title: 'Privacy Policy title',
        name: 'privacy_policy',
        text: 'Privacy Policy',
        target: '_blank',
      },
      {
        url: 'https://www.childrensplace.com/us/help-center/#cookiePolicySectionli',
        title: 'Cookie Policy title',
        name: 'cookie_policy',
        text: 'Cookie Policy',
        target: '_blank',
      },
      {
        url: 'https://www.childrensplace.com/us/content/supply-chain',
        title: 'California supply chain act title',
        name: 'california_supply_chain',
        text: 'California Supply Chains Act',
        target: '_blank',
      },
      {
        url: 'https://www.childrensplace.com/us/sitemap',
        title: 'Site Map title',
        name: 'site_map',
        text: 'Site Map',
        target: '_blank',
      },
    ],
  },
};
