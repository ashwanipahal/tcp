import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from '../../../atoms';
import { Grid, LinkText, PromoBanner } from '../..';
import errorBoundary from '../../../hoc/withErrorBoundary';
import withStyles from '../../../hoc/withStyles';
import ProductTabList from '../../../organisms/ProductTabList';
import moduleQStyle from '../styles/ModuleQ.style';
import { getLocator } from '../../../../../utils';

class ModuleQ extends React.PureComponent {
  render() {
    const { className, divTabs, headerText, promoBanner } = this.props;
    return (
      <Grid className={`${className} moduleQ`}>
        <Row centered>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            {headerText && (
              <LinkText
                component="div"
                headerText={headerText}
                className="moduleQ-header"
                dataLocator={getLocator('moduleQ_header_text')}
              />
            )}
            {promoBanner && (
              <PromoBanner
                promoBanner={promoBanner}
                className="moduleQ-promo"
                dataLocator={getLocator('moduleQ_promobanner_text')}
              />
            )}
          </Col>
          <div>
            <ProductTabList
              onProductTabChange={this.onProductTabChange}
              tabItems={divTabs}
              dataLocator={getLocator('moduleQ_cta_link')}
            />
          </div>
        </Row>
      </Grid>
    );
  }
}

ModuleQ.defaultProps = {
  className: '',
  promoBanner: [],
};

ModuleQ.propTypes = {
  className: PropTypes.string,
  divTabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.object,
      category: PropTypes.object,
      singleCTAButton: PropTypes.object,
    })
  ).isRequired,
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ).isRequired,
  promoBanner: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ),
};

const styledModuleQ = withStyles(errorBoundary(ModuleQ), moduleQStyle);
styledModuleQ.defaultProps = ModuleQ.defaultProps;
export default styledModuleQ;
export { ModuleQ as ModuleQVanilla };
