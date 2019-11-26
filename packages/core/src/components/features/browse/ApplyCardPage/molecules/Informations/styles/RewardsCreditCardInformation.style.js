/* stylelint-disable */
import styled from 'styled-components';
import { getStaticFilePath } from '@tcp/core/src/utils';

export default styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${props => (props.isPLCCModalFlow ? props.theme.spacing.LAYOUT_SPACING.MED : `0px`)};

  @media ${props => props.theme.mediaQuery.medium} {
    flex-direction: row;
  }

  .rewards_card_logo {
    text-align: center;
    margin: ${props => props.theme.spacing.ELEM_SPACING.XXS} 0px;
    @media ${props => props.theme.mediaQuery.large} {
      text-align: left;
    }
  }

  .header-image {
    background: transparent url(${getStaticFilePath('/images/tcp-cc@2x.png')}) no-repeat 0 0;
    background-size: contain;
    border: none;
    width: 211px;
    height: 135px;
    object-fit: contain;
    margin: auto;
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0;
    }
  }

  .rewards_card_instruction {
    text-align: left;
  }
`;
