import { useNavigate } from "react-router-dom";
import { constants } from "../../utility/colors";
import BookShelf from "./BookShelf";

export default function StandardWorksShelf() {
  const navigate = useNavigate();
  
  const books = [
    { text: 'Old Testament', colors: { background: constants.black, text: constants.orange } },
    { text: 'New Testament', colors: { background: constants.black, text: constants.orange } },
    { text: 'Book of Mormon', colors: { background: constants.navy, text: constants.orange } },
    { text: 'Doctrine and Covenants', colors: { background: constants.heckaGray2, text: constants.orange } },
    { text: 'Pearl of Great Price', colors: { background: constants.maroon, text: constants.orange } },
  ];

  const handleBookClick = (book) => {
    const formatted = book.text.toLowerCase().replace(/ /g, '-');
    navigate(`/library/${formatted}`);
  }

  return (
    <BookShelf
      books={books.map(book => ({
        ...book,
        onClick: () => handleBookClick(book)
      }))}
    />
  )
}