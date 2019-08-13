const getIndex = data => {
  return data && data.some(category => !!category.url) ? data.length : 0;
};

// TODO - add the required information from the commented lines
const getRequiredCategoryData = data => {
  return {
    categoryId: data.categoryContent.id,
    title: data.categoryContent.name,
    // seoTitle: data.seoTitle,
    // seoDesc: data.seoDesc,
    longDescription: data.categoryContent.longDescription,
    url: data.url,
    // productCount: data.productCount,
    // isL1Category: data.isL1Category,
    // isUnique: data.isUnique,
  };
};

export const extractCategory = category => {
  // Extracting category id or path from the URL
  try {
    let categoryId;
    if (Number.isInteger(category)) {
      categoryId = category;
    } else if (category.lastIndexOf('/') === category.length - 1) {
      categoryId = category.split('/');
      categoryId = categoryId.length > 1 ? categoryId[categoryId.length - 2] : categoryId[0];
    } else {
      categoryId = category.split('/').pop();
    }
    return categoryId;
  } catch (error) {
    console.log(error);
  }
  return category;
};

// eslint-disable-next-line
export const findCategoryIdandName = (data, category) => {
  const index = getIndex(data);
  let iterator = 0;
  let categoryFound = [];
  const categoryId = extractCategory(category);
  while (iterator < index) {
    const navUrl = extractCategory(data[iterator].url);
    if (
      data[iterator].categoryId === categoryId ||
      navUrl.toLowerCase() === categoryId.toLowerCase()
    ) {
      categoryFound.push(getRequiredCategoryData(data[iterator]));
    } else if (
      // TODO - only looking for items in Categories. Should look for all the groups
      data[iterator].subCategories &&
      data[iterator].subCategories.Categories &&
      data[iterator].subCategories.Categories.length
    ) {
      categoryFound = findCategoryIdandName(data[iterator].subCategories.Categories, category);
      if (categoryFound.length) {
        categoryFound.push(getRequiredCategoryData(data[iterator]));
      }
    } else if (data[iterator].subCategories && data[iterator].subCategories.length) {
      categoryFound = findCategoryIdandName(data[iterator].subCategories, category);
      if (categoryFound.length) {
        categoryFound.push(getRequiredCategoryData(data[iterator]));
      }
    }
    if (categoryFound.length) {
      break;
    } else {
      iterator += 1;
    }
  }
  return categoryFound;
};
