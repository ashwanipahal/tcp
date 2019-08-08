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

export const findCategoryIdandName = (data, category) => {
  const index = this.getIndex(data);
  let iterator = 0;
  let categoryFound = [];
  const categoryId = this.extractCategory(category);
  while (iterator < index) {
    const navUrl = this.extractCategory(data[iterator].url);
    if (
      data[iterator].categoryId === categoryId ||
      navUrl.toLowerCase() === categoryId.toLowerCase()
    ) {
      categoryFound.push(this.getRequiredCategoryData(data[iterator]));
    } else if (data[iterator].menuItems && data[iterator].menuItems.length) {
      categoryFound = this.findCategoryIdandName(
        data[iterator].menuItems[0].length ? data[iterator].menuItems[0] : data[iterator].menuItems,
        category
      );
      if (categoryFound.length) {
        categoryFound.push(this.getRequiredCategoryData(data[iterator]));
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
