import React from 'react';
import { PropTypes } from 'prop-types';
import { SectionList } from 'react-native';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import {
  TitleView,
  HeadingView,
  ItemView,
  SizeSelector,
  ShopBySizeViewWrapper,
} from '../NavMenuLevel2.style';

const placeHolderText = 'Lorem Ipsum';

const NavigationMenu = props => {
  const shopBySizeCircle = links => {
    return (
      <ShopBySizeViewWrapper>
        {links.map(linkItem => {
          return (
            <SizeSelector>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs18"
                text={linkItem.text}
                color="text.primary"
              />
            </SizeSelector>
          );
        })}
      </ShopBySizeViewWrapper>
    );
  };

  const renderItem = item => {
    // TODO - there would be a differentiating factor for generating circular links
    // Use that check instead
    if (item.item.links) {
      return shopBySizeCircle(item.item.links);
    }
    return (
      <ItemView>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          text={item.item.categoryContent.name}
          color="text.primary"
        />
      </ItemView>
    );
  };
  const {
    navigation: { getParam },
  } = props;
  const item = getParam('navigationObj');

  const {
    item: { subCategories },
  } = item;

  subCategories['Shop By Size'] = [
    {
      links: [
        {
          url: '1',
          text: '1',
        },
        {
          url: '2',
          text: '2',
        },
        {
          url: '3',
          text: '3',
        },
        {
          url: '4',
          text: '4',
        },
        {
          url: '5',
          text: '5',
        },
        {
          url: '6',
          text: '6',
        },
        {
          url: '7',
          text: '7',
        },
        {
          url: '8',
          text: '8',
        },
      ],
    },
  ];

  const subCatArr = Object.keys(subCategories);
  const indexOfSubFirstSection = subCatArr.indexOf(placeHolderText);
  if (indexOfSubFirstSection !== 0) {
    subCatArr.splice(indexOfSubFirstSection, 1);
    subCatArr.unshift(placeHolderText);
  }

  const sectionArr = subCatArr.map(subcatName => {
    return { data: subCategories[subcatName], title: subcatName };
  });

  return (
    <SectionList
      renderItem={renderItem}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section }) => {
        if (section.title === placeHolderText) {
          return (
            <HeadingView>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs16"
                textAlign="center"
                text={section.title}
                color="text.primary"
              />
            </HeadingView>
          );
        }
        return (
          <TitleView>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs16"
              text={section.title}
              color="text.primary"
            />
          </TitleView>
        );
      }}
      sections={sectionArr}
    />
  );
};

NavigationMenu.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default NavigationMenu;
