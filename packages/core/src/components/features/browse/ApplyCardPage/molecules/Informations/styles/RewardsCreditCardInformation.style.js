/* stylelint-disable */
import styled from 'styled-components';

export default styled.div`
 .rewards_card_logo {
    text-align: center;
    margin: ${props => props.theme.spacing.ELEM_SPACING.XXS} 0px;
    @media ${props => props.theme.mediaQuery.large} {
      text-align: left;
    }
  }

  .header-image {
    background: transparent url('/static/images/tcp-cc@2x.png') no-repeat 0 0;
    background-size: contain;
    border: none;
    width: 211px;
    height: 135px;
    object-fit: contain;
    margin: auto;
    padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.largeMax} {
        background: transparent url('/static/images/tcp-cc.png') no-repeat 0 0;
        margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXXS} ${props =>
  props.theme.spacing.ELEM_SPACING.XXS} 0 0;
    }
    }

  .rewards_card_instruction {
    @media ${props => props.theme.mediaQuery.medium} {
      padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    }

    @media ${props => props.theme.mediaQuery.large} {
      padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    }
  }`;
