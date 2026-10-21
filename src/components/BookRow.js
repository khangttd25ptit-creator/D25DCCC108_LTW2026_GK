
import { Link } from "react-router-dom";
import BookStatus from "./BookStatus";

function BookRow({ book, onToggle, onDelete }) {
  return (
    <tr className={!book.available ? "borrowed" : ""}>
      <td>
        <Link to={`/books/${book.id}`}>
          {book.title}
        </Link>
      </td>
      <td>{book.author}</td>
      <td>{book.year}</td>
      <td>{book.category}</td>
      <td>
        <BookStatus available={book.available} />
      </td>
      <td>
        <button onClick={() => onToggle(book.id)}>
          {book.available ? "Cho mượn" : "Nhận trả"}
        </button>
        <button onClick={() => onDelete(book.id)}>
          Xóa
        </button>
      </td>
    </tr>
  );
}

export default BookRow;
