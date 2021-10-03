enum FONT_WEIGHT {
  Book = 'Book',
  Medium = 'Medium',
  Bold = 'Bold',
}

const font = (weight: FONT_WEIGHT) => {
  const defaultFontName = 'AndesCondensed';
  return [defaultFontName, weight].join('');
};

export default {
  book: font(FONT_WEIGHT.Book),
  medium: font(FONT_WEIGHT.Medium),
  bold: font(FONT_WEIGHT.Bold),
};
