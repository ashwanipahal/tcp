import styled from 'styled-components';
import PromoBanner from '@tcp/core/src/components/common/molecules/PromoBanner';

export const StyledPromoBanner = styled(PromoBanner)`
  &.promoBanner {
    text-align: left;
    .small_text_bold {
      display: inline-block;
      width: 100%;
      line-height: 1.3;
      letter-spacing: 0.15px;
    }
  }
  &.promo-banner-half {
    .small_text_bold {
      font-size: 16.2px;
      line-height: 1.3;
      letter-spacing: 0.12px;
    }
  }
`;

export default StyledPromoBanner;
