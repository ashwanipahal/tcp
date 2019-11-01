import styled from 'styled-components';
import { Anchor } from '../../atoms';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const StyledCol = styled.div`
  margin-bottom: 16px;
  @media ${props => props.theme.mediaQuery.smallOnly} {
    width: 100%;
  }

  @media ${props => props.theme.mediaQuery.mediumOnly} {
    width: 48%;
    margin-right: 4%;
    &:nth-child(2n + 2) {
      margin-right: 0;
    }
    margin-bottom: 25px;
  }
  @media ${props => props.theme.mediaQuery.large} {
    width: 31.5%;
    margin-right: 2.75%;
    &:nth-child(3n + 3) {
      margin-right: 0;
    }
    margin-bottom: 31px;
  }
`;

export const StyledAnchor = styled(Anchor)`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.12);
  height: 106px;
  border-bottom: 2px solid #2e6a91;
  &:hover {
    background-color: #f3f3f3;
  }
`;
