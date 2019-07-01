import styled from 'styled-components';

const ModalStyle = styled.div`
  .TCPModal__Overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: ${props => props.theme.colors.MODAL_OVERLAY};
    z-index: ${props => props.theme.zindex.zOverlay};
  }
  div.TCPModal__InnerContent {
    background: ${props => props.theme.colors.WHITE};
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    transform: translate(-50%, -50%);
    ${props => props.theme.zindex.zModal};
    width: 100%;
    height: 100%;
    overflow: scroll;
    @media ${props => props.theme.mediaQuery.medium} {
      width: auto;
      height: auto;
      max-width: 460px;
      min-height: 500px;
    }
  }
  .Modal_Heading {
    border-bottom: 3px solid ${props => props.theme.colors.BLACK};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    margin-top: 0;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
  .Modal_Title {
    text-align: center;
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    @media ${props => props.theme.mediaQuery.medium} {
      margin: ${props => props.theme.spacing.ELEM_SPACING.MED}
        ${props => props.theme.spacing.ELEM_SPACING.XXXL}
        ${props => props.theme.spacing.ELEM_SPACING.XL};
      padding: 0;
      text-align: initial;
    }
  }
`;
export default ModalStyle;
