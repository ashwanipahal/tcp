import { css } from 'styled-components';

export default css`
  position: relative;
  padding-top: 32px;
  .footer_top_candidate_a .flex-align-center {
    align-items: center;
  }
  .footer_top_candidate_a .candidate_a_inline_container_button {
    text-align: center;
  }
  .candidate_a_inline_container_button button{
    white-space: nowrap;
  }
  .footer_top_candidate_a .candidate_a_inline_container_button button {
    font-size: ${props => props.theme.typography.fontSizes.fs13};
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM}
      ${props => props.theme.spacing.ELEM_SPACING.XL};
    min-height: 42px;
  }
  .candidate-b_buttons {
    padding: 11px 0 0 0;
  }
  .heading_text, .footer_top_candidate_a .heading_text  {
    margin-bottom: 15px;
    text-align: center;

    .style1 {
      color: ${props => props.theme.colorPalette.gray[800]};
    }
    .style2 {
      color: ${props => props.theme.colorPalette.primary.main};
    }
  }
  .candidate-b_buttons .heading_text {
    font-size: 10px;
  }
  .footer_top_candidate_a .email-sign-up, .footer_top_candidate_a .sms_sign_up {
    font-size: 12px;
    line-height: 2.08;
  }
  .footer_top_candidate_a .divider {
    height: 1px;
    background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    margin-top: 24px;
    margin-bottom: 24px;
    width: 100%;
  }

  .footer_top__signup_form {
    label {
      margin-bottom: 10px;
    }
  }

  .poc-hide {
    display: none;
  }
  .footer-top {
    > div {
      border-top: 2px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
      padding-top: 32px;
    }
  }
  .footer-top__slots {
    padding-bottom: 16px;
  }
  .footer-top__slot-2 {
    order: 1;
  }
  .footer-bottom__slot--1 {
    background-color: ${props => props.theme.colors.BRAND.PRIMARY};
  }
  .fullbleed-mobile {
    flex-direction: column-reverse;
    display: flex;
    margin: 0;
  }
  .default-offset {
    padding: 0 ${props => props.theme.gridDimensions.gridOffsetObj.small}px;
  }
  .footer-middle.desktop {
    display: none;
  }
  .reference-id {
    background-color: ${props => props.theme.colors.BRAND.PRIMARY};
    font-size: ${props => props.theme.fonts.fontSize.body.small.tertiary}px;
    padding: 0 15px 24px;
    margin: 0;
    color: ${props => props.theme.colors.WHITE};
    font-family: ${props => props.theme.secondaryFontFamily};
  }

  .footer_top_candidate_a_social_links {
    flex-direction: row;
    align-items: center;
    @media ${props => props.theme.mediaQuery.largeMax} and ${props => props.theme.mediaQuery.large}{
      margin: 0 auto;
      flex-direction: column;
    }
  }

  &.navigation-footer {
    .reference-id {
      display: none;
    }
    .social-media-links, .social-media-label {
      display: block;
    }
    .social-media-links {
      padding: 0;
    }
    .email-sign-up-form button, .footer_top__signup_form button{
      padding: 0;
    }
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .default-offset {
      padding: 0 ${props => props.theme.gridDimensions.gridOffsetObj.medium}px;
    }
    .footer-top {
      padding-bottom: 20px;
    }
    .hide-in-medium-up {
      display: none;
    }
    .footer_top_candidate_a .heading_text.refer_friend_text {
      margin-bottom: 0;
    }
    .footer_top_candidate_a .refer-a-friend {
      font-size: 12px;
      line-height: 1.67;
    }
    &.navigation-footer .col-md-half-width {
      width: 100%;
      margin-right: 0;
    }
    &.navigation-footer .hide-in-medium-up {
      display: block;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    padding-top: 12px;
    .hide-in-large-up {
      display: none;
    }
    .footer-top {
      padding-bottom: 44px;
      border-bottom: 2px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    }
    .candidate-b_buttons {
      padding: 11px 38px 0 38px;
    }
    .candidate-b_buttons .heading_text{
      font-size: 15px;
    }
    .footer-bottom {
      background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
    }
    .fullbleed-mobile {
      flex-direction: row;
      margin: 0 ${props => props.theme.gridDimensions.gridOffsetObj.medium}px;
    }
    .default-offset {
      padding: 0;
    }
    .footer-bottom__slot--1 {
      background-color: inherit;
    }
    .footer-middle.mobile {
      display: none;
    }
    .footer-middle.desktop {
      display: flex;
      padding: 36px 0 64px;
    }
    .divider {
      border-left: 1px solid ${props => props.theme.colors.FOOTER.DIVIDER};
    }
    .reference-id {
      text-align: center;
      background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
      font-size: ${props => props.theme.fonts.fontSize.body.small.secondary};
      padding: 11px 0 24px;
      color: ${props => props.theme.colors.TEXT.DARKERGRAY};
    }
    .refer_a_friend_desktop {
      margin-right: 0;
    }
    .footer_top_candidate_a .email-sign-up, .footer_top_candidate_a .sms_sign_up, .footer_top_candidate_a .refer-a-friend {
      font-size: 15px;
      line-height: 1.67;
    }
  }

  .checkout-pages &{
    display: none;
  }

  @media ${props => props.theme.mediaQuery.mediumMax} {
    .hide-in-medium-down {
      display: none;
    }
  }
`;
