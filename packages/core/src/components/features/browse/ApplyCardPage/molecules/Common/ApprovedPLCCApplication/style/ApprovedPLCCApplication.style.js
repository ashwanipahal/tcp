import styled from 'styled-components';

export default styled.div`
  padding-top: 24px;

  @media ${props => props.theme.mediaQuery.large}{
      padding-right: ${props =>
        props.isPLCCModalFlow ? `0px` : props.theme.spacing.LAYOUT_SPACING.XXL};
    }
  
  .underprogress_application {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .congratulations_header {
    padding-top: 32px;
  }

  .centered {
    justify-content: center;
    text-align: center;
  }

  .credit_limit_heading {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG}
  }

  .card-InProgress-header {
    text-align: center;
    height: 30px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0px;
  }

  .horizontal_divider {
    color: ${props => props.theme.colorPalette.gray['500']};
    margin-top: 32px;
  }

  .linkIconSeperator {
    margin-left: 10px;
  }

  .in_progress_status_details {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    text-align: center;
    @media ${props => props.theme.mediaQuery.large}{
      padding: 5px 248px 0px;
    }
    @media ${props => props.theme.mediaQuery.medium}{
      padding: 5px 140px 0px;
    }
  }

  .no_bag_items_continue {
      margin-top: 32px;
  }

  .submit_buttons_set {
    justify-content: space-around;
  }

  .existing_checkout_button {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    font-weight: normal;
    width:  ${props => (props.isPLCCModalFlow ? `300px` : ``)}; 
  }

  .existing_continue_button {
    font-weight: normal;
    width:  ${props => (props.isPLCCModalFlow ? `300px` : ``)};
  }

  .footer_links {
    margin-top: 32px;
  }

  .header-image {
    background: transparent url('/static/images/tcp-cc@2x.png') no-repeat 0 0;
    background-size: contain;
    border: none;
    width: 259px;
    height: 166px;
    object-fit: contain;
    margin: auto;
    }

  .existing_user_info_text2 {
    text-align: center;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    

    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax}{
      padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} ${props =>
  props.theme.spacing.LAYOUT_SPACING.XXL} 0px;
    }
  }

  .promo_offer_section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .promo-image-container {
    display: flex;
    align-items: center;
    @media ${props => props.theme.mediaQuery.smallOnly}{
      justify-content: center;
      margin-top: 32px;
    } 
  }

  .promo_code {
    background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin: 21px 0;
    width: 227px;
  }

  .promo-image {
    background: transparent url('/static/images/promo.png') no-repeat 0 0;
    background-size: contain;
    border: none;
    width: 157px;
    height: 124px;
    object-fit: contain;
    }
    
    /*
      Font related details are given since class has to be embedded with content coming from CMS
      **/
    .shipping_info_subtext {
      font-family: ${props => props.theme.typography.fonts.secondary};
      font-size: ${props => props.theme.fonts.fontSize.heading.large.h6}px;    
      text-align: center;
      padding: 20px 51px 0px;
      @media ${props => props.theme.mediaQuery.medium} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0px;
      } 
    }
`;
