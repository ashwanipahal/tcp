import styled from 'styled-components';

export default styled.div`
  .back_button_container {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  .back_button {
    color: ${props => props.theme.colors.PRIMARY.BLUE};
    ::before {
      content: '';
      display: block;
      background: url('/static/images/carrot-medium-left-gray.svg') no-repeat;
      width: 20px;
      height: 20px;
      float: left;
    }
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
`;
