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

  .existing_account_info {
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0 ${props =>
  props.theme.spacing.ELEM_SPACING.LRG} 0;
  }

  .submit_buttons_set {
    justify-content: space-around;
  }

  .existing_checkout_button {
    margin: 0px 0px
      ${props => props.theme.spacing.ELEM_SPACING.XS} 0px;
    font-weight: normal;
    width:  ${props => (props.isPLCCModalFlow ? `300px` : ``)};
  }

  .existing_continue_button {
    margin: 0px 0px ${props => props.theme.spacing.ELEM_SPACING.LRG} 0px;
    font-weight: normal;
    width:  ${props => (props.isPLCCModalFlow ? `300px` : ``)};
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

  .existing_plcc_enquiry {
    font-family: ${props => props.theme.typography.fonts.secondary};
    text-align: center;
    @media ${props => props.theme.mediaQuery.large} {
      padding: 0 186px;
    }
  }  

  .existing_user_info_text2 {
    text-align: center;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    @media ${props => props.theme.mediaQuery.large}{
      padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} ${props =>
  props.isPLCCModalFlow ? `147px` : `337px`} 0px;
    }

    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax}{
      padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} ${props =>
  props.theme.spacing.LAYOUT_SPACING.XXL} 0px;
    }
  }
`;
