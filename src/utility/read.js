import { constants } from './colors';

export const offered = [
  'Old Testament',
  'New Testament',
  'Book Of Mormon',
  'Doctrine And Covenants',
  'Pearl Of Great Price',
]

export const offeredColors = {
  'Old Testament': { background: constants.black, text: constants.orange },
  'New Testament': { background: constants.black, text: constants.orange },
  'Book Of Mormon': { background: constants.navy, text: constants.orange },
  'Doctrine And Covenants': { background: constants.heckaGray, text: constants.orange },
  'Pearl Of Great Price': { background: constants.maroon, text: constants.orange },
}

export const books = {
  'Old Testament': { 'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36, 'Deuteronomy': 34, 'Joshua': 24, 'Judges': 21, 'Ruth': 4, '1 Samuel': 31, '2 Samuel': 24, '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36, 'Ezra': 10, 'Nehemiah': 13, 'Esther': 10, 'Job': 42, 'Psalms': 150, 'Proverbs': 31, 'Ecclesiastes': 12, 'Song of Solomon': 8, 'Isaiah': 66, 'Jeremiah': 52, 'Lamentations': 5, 'Ezekiel': 48, 'Daniel': 12, 'Hosea': 14, 'Joel': 3, 'Amos': 9, 'Obadiah': 1, 'Jonah': 4, 'Micah': 7, 'Nahum': 3, 'Habakkuk': 3, 'Zephaniah': 3, 'Haggai': 2, 'Zechariah': 14, 'Malachi': 4 },
  'New Testament': { 'Matthew': 28, 'Mark': 16, 'Luke': 24, 'John': 21, 'Acts': 28, 'Romans': 16, '1 Corinthians': 16, '2 Corinthians': 13, 'Galatians': 6, 'Ephesians': 6, 'Philippians': 4, 'Colossians': 4, '1 Thessalonians': 5, '2 Thessalonians': 3, '1 Timothy': 6, '2 Timothy': 4, 'Titus': 3, 'Philemon': 1, 'Hebrews': 13, 'James': 5, '1 Peter': 5, '2 Peter': 3, '1 John': 5, '2 John': 1, '3 John': 1, 'Jude': 1, 'Revelation': 22 },
  'Book Of Mormon': { '1 Nephi': 22, '2 Nephi': 33, 'Jacob': 7, 'Enos': 1, 'Jarom': 1, 'Omni': 1, 'Words of Mormon': 1, 'Mosiah': 29, 'Alma': 63, 'Helaman': 16, '3 Nephi': 30, '4 Nephi': 1, 'Mormon': 9, 'Ether': 15, 'Moroni': 10 },
  'Doctrine And Covenants': 138,
  'Pearl Of Great Price': { 'Moses': 8, 'Abraham': 5, 'Joseph Smith Matthew': 1, 'Joseph Smith History': 1, 'Articles of Faith': 1 }
};

export const detailedWorkSections = {
  'Book Of Mormon': [
    { title: 'Small plates of Nephi', books: ['1 Nephi', '2 Nephi', 'Jacob', 'Enos', 'Jarom', 'Omni'] },
    { title: 'Abridgement by Mormon', books: ['Words of Mormon'] },
    { title: 'Large plates of Nephi', books: ['Mosiah', 'Alma', 'Helaman', '3 Nephi', '4 Nephi', 'Mormon', 'Ether', 'Moroni'] },
  ],
  'Old Testament': [
    { title: 'The Law (Pentateuch)', books: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'] }, 
    { title: 'History', books: [ 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther' ] },
    { title: 'Poetry and Wisdom', books: [ 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon' ] },
    { title: 'Major Prophets', books: [ 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel' ] },
    { title: 'Minor Prophets (The Twelve)', books: [ 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi' ] },
  ],
  'New Testament': [
    { title: 'Gospels', books: ['Matthew', 'Mark', 'Luke', 'John'] },
    { title: 'History', books: ['Acts'] },
    { title: 'Pauline Epistles', books: [ 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon' ] },
    { title: 'General Epistles', books: [ 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude' ] },
    { title: 'Prophecy', books: ['Revelation'] },
  ],
  'Pearl Of Great Price': [
    { title: 'Moses', books: ['Moses'] },
    { title: 'Abraham', books: ['Abraham'] },
    { title: 'Joseph Smith', books: ['Joseph Smith Matthew', 'Joseph Smith History'] },
    { title: 'Articles of Faith', books: ['Articles of Faith'] },
  ]
}

const importBook = async (bookKey) => {
  switch (bookKey) {
    case offered[0]:
      return await import('../../assets/books/old-testament-reference');
    case offered[1]:
      return await import('../../assets/books/new-testament-reference');
    case offered[2]:
      return await import('../../assets/books/book-of-mormon-reference');
    case offered[3]:
      return await import('../../assets/books/doctrine-and-covenants-reference');
    case offered[4]:
      return await import('../../assets/books/pearl-of-great-price-reference');
    default:
      throw new Error('Unknown book key');
  }
}

export const getBook = async (requested) => {
  const { book } = await importBook(requested);
  return book;
}

export const getBooksFromWork = (work) => {
  return { books: Object.keys(books[work]) }
}

export const getChaptersFromBook = async (work, book) => {
  return typeof books[work] === 'object' && books[work][book] !== undefined
    ? books[work][book]
    : books[work];
}

const parseSelection = (selection) => {
  if (!selection) return [];
  return selection
    .split(';')
    .flatMap(part => {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(Number);
        if (isNaN(start) || isNaN(end)) return [];
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      } else {
        const num = Number(trimmed);
        return isNaN(num) ? [] : [num];
      }
    });
};

export const locationToURL = (location) => {
  const result = { ...location };
  result.work = result.work.replace(/\s+/g, '-').toLowerCase();
  result.book = result.book === '' || result.book === null
    ? 'section' 
    : result.book.replace(/\s+/g, '-').toLowerCase();
  return `/study/${result.work}/${result.book}/${result.chapter}`
}

export const URLtoLocation = (location) => {
  const result = { ...location };
  if (result.work) {
    result.work = result.work.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  if (result.book) {
  result.book = result.book === 'section' ? '' : result.book.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  return result;
}

export const getVersesFromChapter = async ({ work, book, chapter, selection}) => {
  const bookInQuestion = await getBook(work)

  let verses
  if (book === "" || !book) {
    verses = bookInQuestion[work][chapter]
  } else {
    verses = bookInQuestion[book][chapter]
  }

  if (selection) {
    const selectedVerses = parseSelection(selection);
    return Object.fromEntries(
      Object.entries(verses).filter(([key]) => selectedVerses.includes(parseInt(key)))
    );
  } else {
    return verses
  }
}

export const getVerseByLocation = async (location) => {
  const { work, book, chapter, verse } = location
  const verses = await getVersesFromChapter(work, book, chapter)
  return verses[verse]
}

export const fetchSubsequentChapter = (location) => {
  const { work, book, chapter } = location;

  if (typeof books[work] === 'object' && books[work][book] !== undefined) {
    const totalChapters = books[work][book];
    if (chapter < totalChapters) {
      // next chapter in same book
      return { work, book, chapter: chapter + 1 };
    } else {
      // first chapter of the next book
      const bookKeys = Object.keys(books[work]);
      const currentIndex = bookKeys.indexOf(book);
      if (currentIndex >= 0 && currentIndex < bookKeys.length - 1) {
        return { work, book: bookKeys[currentIndex + 1], chapter: 1 };
      } else {
        // first chapter of the first book in work
        return { work, book: bookKeys[0], chapter: 1 };
      }
    }
  } else if (typeof books[work] === 'number') {
    // If the work has only chapters and no books
    const totalChapters = books[work];
    if (chapter < totalChapters) {
      return { work, chapter: chapter + 1 };
    } else {
      return { work, chapter: 1 };
    }
  }
}
