/* stylelint-disable */
import styled from 'styled-components';

export default styled.div`
  background-color: none;
  padding: 0px 14px;

  @media ${props => props.theme.mediaQuery.large} {
    padding-left: 200px;
  }

  .back_button_container {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  .financial-terms-disclosures {
    width: 100%;
    border: 1px solid ${props => props.theme.colors.BUTTON.WHITE.BORDER};
    height: 914px;
    @media ${props => props.theme.mediaQuery.medium} {
      height: 591px;
    }
  }

  .field_dob {
    height: auto;
  }

  .iAgree_terms_conditions {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: row;
    > input {
      flex: -1 0 50%;
    }
    > p {
      flex: 1 0 50%;
    }
    > div {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
      flex: 1 0 100%;
    }
  }
  .rewards_card_instruction {
    @media ${props => props.theme.mediaQuery.medium} {
      padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    }

    @media ${props => props.theme.mediaQuery.large} {
      padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    }
  }

  .contact_information_form {
      >label {
        >p {
          margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
        }
      }
    }

  .plcc_min_phone {
    @media ${props => props.theme.mediaQuery.medium} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XXS} 0px ${props =>
  props.theme.spacing.ELEM_SPACING.XS} 0px;
    }
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0px ${props =>
  props.theme.spacing.ELEM_SPACING.MED} 0px;
  }

  .free_dropdown_label {
    position: absolute;
  }

  .columnWrapper {
    margin-top:  ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .back_button{
    color: ${props => props.theme.colors.PRIMARY.BLUE};
    ::before {
      content: "";
      display: block;
      background: url('/static/images/carrot-medium-left-gray.svg') no-repeat;
      width: 20px;
      height: 20px;
      float: left;
    }
  }

  .prescreen-code {
    font-family: ${props => props.theme.typography.fonts.secondary};
  }

  .click-here-link {
    text-underline-position: under;
    text-decoration: underline;
  }

  .apply_Card_Header_Text {
    font-family: ${props => props.theme.typography.fonts.primaryFontBlackFamily};
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    line-height: 2;
    border-bottom: 3px solid black;
    @media ${props => props.theme.mediaQuery.mediumMax} {
      font-size: ${props => props.theme.typography.fontSizes.fs10};
      margin-bottom: 33px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: 77px;
      font-size: ${props => props.theme.typography.fontSizes.fs16};
    }
  }

  .no_thanks_link {
    text-align: center;
    padding: 36px 0px 36px 0px;
    text-underline-position: under;
    text-decoration: underline; 
  }

  .no_thanks_link_wrapper {
    justify-content: space-around;
  }

  .table_contact_month {
    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax} {
      width: 29%;
      margin-right: 20px;
    }
  }

  .table_contact_day {
    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax} {
      width: 29%;
      margin-right: 20px;
    }
  }

  .submit_plcc_form {
    justify-content: space-around;
  }

  .submit_button_plcc_form_container {
    text-align: center;
    margin-top: 67px;
  }

  .submit_button_plcc_form {
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 1px;
    text-align: center;
  }

  .pre-approved-offer-criteria {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-weight: ${props => props.theme.fonts.fontWeight.bold};
  }

  .table_contact_year {
    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax} {
      width: 29%;
    }
  }

  .plcc_iAgree_container {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  .message-terms {
    padding-bottom: 21px;
    font-family: ${props => props.theme.typography.fonts.secondary};
  }

  .message-information {
    font-family: ${props => props.theme.typography.fonts.primaryFontBlackFamily};
  }

  .title {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    margin: 34px 0px 19px 0px;
    line-height: 1;
  }

  .header-image {
    background: transparent url('/static/images/tcp-cc@2x.png') no-repeat 0 0;
    background-size: contain;
    border: none;
    width: 211px;
    height: 135px;
    object-fit: contain;
    margin: auto;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax} {
      background: transparent url('/static/images/tcp-cc.png') no-repeat 0 0;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXXS} ${props =>
  props.theme.spacing.ELEM_SPACING.XXS} 0 0;
    }
  }

  .rewards_card_logo {
    text-align: center;
    margin: ${props => props.theme.spacing.ELEM_SPACING.XXS} 0px;
    @media ${props => props.theme.mediaQuery.large} {
      text-align: left;
    }
  }

  .underprogress_application {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card-InProgress-header {
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0px;
  }

  .underproress_checkout_button {
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0px ${props =>
  props.theme.spacing.ELEM_SPACING.MED} 0px;
  }

  .underproress_continue_button {
    margin: 0px 0px ${props => props.theme.spacing.ELEM_SPACING.LRG} 0px;
  }`;
