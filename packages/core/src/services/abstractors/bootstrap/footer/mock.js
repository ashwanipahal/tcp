export default {
  submodules: {
    footerTop: {
      composites: {
        buttonList: [
          {
            url: '/node/modal/ttt1',
            text: null,
            title:
              "<div id='email-signup-text' style='font-weight: 900; line-height: 1.67;color: #6a6a6a;'>Get <span style='color: #4b9fdd;'>$10 OFF</span> by signing <br>up for email offers!</div>",
            external: 0,
            target: '',
          },
          {
            url: '/node/modal/ttt22',
            text: null,
            title:
              "<div id='sms-signup-text' style='font-weight: 900; line-height: 1.67;color: #6a6a6a;'>Sign up for text alerts <br> and get <span style='color: #4b9fdd;'>$10 off!</span></div> ",
            external: 0,
            target: '',
          },
          {
            url: '/dummy',
            text: null,
            title:
              "<div id='refer-friend-text' style='font-weight: 900; line-height: 1.67;color: #6a6a6a;'>REFER A FRIEND<br>AND EARN ANOTHER <span style='color: #4b9fdd;'>$10!</span></div>",
            external: 0,
            target: '',
          },
        ],
        socialLinks: [
          {
            url: 'http://facebook.com/childrensplace',
            title: 'Facebook',
            target: '_blank',
            external: 0,
            class: 'footer__social-link--fb',
          },
          {
            url: 'http://twitter.com/childrensplace',
            title: 'Twitter',
            target: '_blank',
            external: 0,
            class: 'footer__social-link--tw',
          },
          {
            url: 'http://instagram.com/childrensplace',
            title: 'Instagram',
            target: '_blank',
            external: 0,
            class: 'footer__social-link--ig',
          },
          {
            url: 'http://pinterest.com/childrensplace',
            title: 'Pinterest',
            target: '_blank',
            external: 0,
            class: 'footer__social-link--pt',
          },
        ],
      },
    },
    footerMiddle: {
      composites: {
        mprWrapper: [
          {
            linkClass: {
              url: '/static/rewards',
              title: 'My Place Rewards',
              target: '',
              external: 0,
              class: 'footer__mpr-container--col1',
            },
            linkList: [
              {
                url: '/static/balance',
                target: '',
                title: 'Check Point Balance',
                external: 0,
              },
              {
                url: '/static/rewards',
                target: '',
                title: 'Redeem Rewards',
                external: 0,
              },
              {
                url: '/static/benefits',
                target: '',
                title: 'Member Benefits',
                external: 0,
              },
            ],
          },
          {
            linkClass: {
              url: '/static/rewards/cc',
              title: 'My Place Rewards Credit Card',
              target: '',
              external: 0,
              class: 'footer__mpr-container--col2',
            },
            linkList: [
              {
                url: '/static/learn-more',
                target: '',
                title: 'Learn More',
                external: 0,
              },
              {
                url: '/static/apply-now',
                target: '',
                title: 'Apply Now',
                external: 0,
              },
              {
                url: '/static/pay',
                target: '',
                title: 'Pay Your Bill',
                external: 0,
              },
            ],
          },
        ],
        linkColumns: [
          {
            text: {
              text: 'Help center',
            },
            linkList: [
              {
                url: '/static/faq',
                target: '',
                title: 'FAQs',
                external: 0,
              },
              {
                url: 'https://track-order.com/tttt1',
                target: '_blank',
                title: 'Track Order',
                external: 0,
              },
              {
                url: '/static/return-policy',
                target: '',
                title: 'Return Policy',
                external: 0,
              },
            ],
          },
          {
            text: {
              text: 'Shopping',
            },
            linkList: [
              {
                url: '/static/log-out',
                target: '',
                title: 'Log Out',
                external: 0,
              },
              {
                url: '/static/coupons',
                target: '',
                title: 'Coupons',
                external: 0,
              },
            ],
          },
          {
            text: {
              text: 'About Us',
            },
            linkList: [
              {
                url: '/static/public-relations',
                target: '',
                title: 'Public Relations',
                external: 0,
              },
              {
                url: '/static/investor-relations',
                target: '',
                title: 'Investor Relations',
                external: 0,
              },
            ],
          },
        ],
      },
    },
    footerBottom: {
      composites: {
        linkList: [
          {
            url: '/static/terms-and-conditions',
            target: '',
            title: 'Terms and Conditions',
            external: 0,
          },
          {
            url: '/static/privacy-policy',
            target: '',
            title: 'Privacy Policy',
            external: 0,
          },
        ],
        richTextGroup: [
          {
            text: '<p>@copy; 2019 The Childrens Place | Big Fashion, Little Prices.</p>',
          },
        ],
      },
    },
  },
};
