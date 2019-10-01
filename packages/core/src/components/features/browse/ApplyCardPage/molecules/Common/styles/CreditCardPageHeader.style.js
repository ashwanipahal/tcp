import styled from 'styled-components';

export default styled.div`
  .back_button_container {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  .back_button {
    color: ${props => props.theme.colors.PRIMARY.BLUE};
  }

  .apply_Card_Header_Text {
    font-family: ${props => props.theme.typography.fonts.primaryFontBlackFamily};
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    border-bottom: 3px solid black;
    @media ${props => props.theme.mediaQuery.mediumMax} {
      font-size: ${props => props.theme.typography.fontSizes.fs10};
      margin-bottom: 33px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: 71px;
      font-size: ${props => props.theme.typography.fontSizes.fs16};
    }
  }

  .plcc_card_header_title {
    margin-top: 12px;
  }

  .credit_card_heading {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    line-height: 2;
  }

  .left-arrow {
    border: solid ${props => props.theme.colors.ANCHOR.SECONDARY};
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 5px;
    transform: rotate(135deg);
  }
`;
