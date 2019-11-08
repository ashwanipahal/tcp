import styled from 'styled-components';
import PromoBanner from '@tcp/core/src/components/common/molecules/PromoBanner';

export const StyledPromoBanner = styled(PromoBanner)`
  &.promoBanner {
    text-align: left;
    .small_text_bold {
      display: inline-block;
      width: 100%;
      line-height: 1;
      letter-spacing: 0.15px;
    }
  }
  &.text-pink {
    span {
      color: #ff3db4;
    }
  }
  &.text-purple {
    span {
      color: #b976cc;
    }
  }
  &.text-orange {
    span {
      color: #ff6b00;
    }
  }
  &.text-blue {
    span {
      color: #49a6e0;
    }
  }
  &.text-yellow {
    span {
      color: #f6d343;
    }
  }
  &.text-red {
    span {
      color: #ed0505;
    }
  }
  &.promo-banner-half {
    .small_text_bold {
      display: inline-block;
      width: 100%;
      font-size: 16.2px;
      line-height: 1.3;
      letter-spacing: 0.12px;
    }
  }
`;

export default StyledPromoBanner;
