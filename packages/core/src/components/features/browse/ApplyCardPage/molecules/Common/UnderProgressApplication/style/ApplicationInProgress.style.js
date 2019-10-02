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

  .in_progress_status_details {
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0 ${props =>
  props.theme.spacing.ELEM_SPACING.LRG} 0;
    text-align: center;
    @media ${props => props.theme.mediaQuery.large}{
      padding: 5px ${props => (props.isPLCCModalFlow ? `88px` : `234px`)} 24px;
    }
    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax}{
      padding: 5px 70px 24px;
    }
  }

  .submit_plcc_form {
    justify-content: space-around;
  }

  .underprogress_checkout_button {
    margin: 0px 0px
      ${props => props.theme.spacing.ELEM_SPACING.XS} 0px;
    font-weight: normal;
    width: ${props => (props.isPLCCModalFlow ? `300px` : ``)};
  }

  .underprogress_continue_button {
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
`;
