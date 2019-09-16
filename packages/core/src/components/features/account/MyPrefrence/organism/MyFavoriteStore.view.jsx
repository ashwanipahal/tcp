import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import Image from '../../../../common/atoms/Image';
import styles from '../styles/MyPrefrence.style';
import withStyles from '../../../../common/hoc/withStyles';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Anchor from '../../../../common/atoms/Anchor';
import InputCheckbox from '../../../../common/atoms/InputCheckbox';
import { getIconPath } from '../../../../../utils';
import SocialContainer from '../../../../common/atoms/SocialAccount/container/Social.container';
import { config } from '../../../../common/atoms/SocialAccount/Views/config';

class MyFavoriteStore extends React.PureComponent {
  render() {
    const { className, labels } = this.props;
    return (
      <div className={className}>
        <Row fullBleed className="elem-pt-LRG">
          <Col
            colSize={{
              small: 6,
              medium: 5,
              large: 5,
            }}
            ignoreGutter={{
              small: true,
            }}
            className="profileInfoCol"
          >
            <BodyCopy
              className="elem-mb-MED"
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="extrabold"
            >
              {labels.lbl_prefrence_favorite_store}
            </BodyCopy>
          </Col>
          <Col
            colSize={{
              small: 6,
              medium: 4,
              large: 7,
            }}
            ignoreGutter={{
              small: true,
            }}
            className="profileInfoCol"
          >
            <BodyCopy
              className="elem-mb-MED"
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="extrabold"
            >
              {labels.lbl_prefrence_social_account}
            </BodyCopy>
            <SocialContainer view={config.VIEW_MODE.read} />
          </Col>
        </Row>

        <Row fullBleed className="hideOnMobile elem-pt-LRG elem-pb-LRG">
          <Col
            colSize={{
              large: 12,
            }}
            className="profileInfoSeparator"
          />
        </Row>

        <Row fullBleed className="elem-pt-LRG">
          <Col
            colSize={{
              small: 6,
              medium: 4,
              large: 5,
            }}
            ignoreGutter={{
              small: true,
            }}
            className="elem-mb-XL"
          >
            <BodyCopy
              className="elem-mb-MED"
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="extrabold"
            >
              {labels.lbl_prefrence_rewards_prefrence}
            </BodyCopy>

            <BodyCopy fontSize="fs16" fontFamily="secondary">
              {labels.lbl_prefrence_access_buy_online_pickup}
            </BodyCopy>
            <BodyCopy fontSize="fs16" fontFamily="secondary">
              {labels.lbl_prefrence_not_added_fvt_store}
            </BodyCopy>
          </Col>
          <Col
            colSize={{
              small: 6,
              medium: 4,
              large: 7,
            }}
            ignoreGutter={{
              small: true,
            }}
            className="profileInfoCol elem-mb-XL"
          >
            <form oValidate>
              <Row fullBleed className="elem-pt-LRG">
                <Col
                  colSize={{
                    small: 6,
                    medium: 4,
                    large: 6,
                  }}
                  ignoreGutter={{
                    small: true,
                  }}
                  className="elem-mb-XL"
                >
                  <BodyCopy
                    fontSize="fs16"
                    fontFamily="secondary"
                    fontWeight="extrabold"
                    component="div"
                  >
                    {labels.lbl_prefrence_app_text}
                    <Image src={getIconPath('empty-fav-icon')} />
                  </BodyCopy>

                  <Field
                    name="primary"
                    component={InputCheckbox}
                    dataLocator="InputCheckbox"
                    className="InputCheckbox"
                  >
                    <BodyCopy fontSize="fs14" fontFamily="secondary" component="span">
                      {' '}
                      {labels.lbl_prefrence_tcp_label}
                    </BodyCopy>
                  </Field>
                  <Field
                    name="primary"
                    component={InputCheckbox}
                    dataLocator="InputCheckbox"
                    className="InputCheckbox"
                  >
                    <BodyCopy fontSize="fs14" fontFamily="secondary" component="span">
                      {labels.lbl_prefrence_gym_label}
                    </BodyCopy>
                  </Field>
                </Col>
                <Col
                  colSize={{
                    small: 6,
                    medium: 4,
                    large: 6,
                  }}
                  ignoreGutter={{
                    small: true,
                  }}
                  className="elem-mb-XL"
                >
                  <BodyCopy
                    fontSize="fs14"
                    fontFamily="secondary"
                    component="div"
                    fontWeight="extrabold"
                  >
                    {labels.lbl_prefrence_text_text}
                    <Image src={getIconPath('empty-fav-icon')} />
                  </BodyCopy>

                  <Field
                    name="primary"
                    component={InputCheckbox}
                    dataLocator="InputCheckbox"
                    className="InputCheckbox"
                  >
                    <BodyCopy fontSize="fs14" fontFamily="secondary" component="span">
                      {' '}
                      {labels.lbl_prefrence_tcp_label}
                    </BodyCopy>
                  </Field>
                  <Field
                    name="primary"
                    component={InputCheckbox}
                    dataLocator="InputCheckbox"
                    className="InputCheckbox"
                  >
                    <BodyCopy fontSize="fs14" fontFamily="secondary" component="span">
                      {labels.lbl_prefrence_gym_label}
                    </BodyCopy>
                  </Field>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
        <Row fullBleed className="elem-pt-LRG">
          <Col
            colSize={{
              small: 6,
              medium: 4,
              large: 12,
            }}
            ignoreGutter={{
              small: true,
            }}
          >
            <BodyCopy textAlign="center">
              <Anchor
                url="learn_more_link"
                fontSizeVariation="large"
                anchorVariation="primary"
                underline
                target="_blank"
                className="favtPageLink"
              >
                {labels.lbl_prefrence_program_details}
              </Anchor>
              <Anchor
                url="learn_more_link"
                fontSizeVariation="large"
                anchorVariation="primary"
                underline
                target="_blank"
                className="favtPageLink"
              >
                {labels.lbl_prefrence_term_codition}
              </Anchor>
            </BodyCopy>
          </Col>
        </Row>
      </div>
    );
  }
}

MyFavoriteStore.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string.isRequired,
};

MyFavoriteStore.defaultProps = {
  labels: {},
};

export default reduxForm({
  form: 'rewardPrefrence', // a unique identifier for this form
})(withStyles(MyFavoriteStore, styles));
