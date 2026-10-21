
import BookStatus from "./BookStatus";

function BookTable({ books, onToggle, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Tên sách</th>
          <th>Tác giả</th>
          <th>Năm</th>
          <th>Thể loại</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>

      <tbody>
        {books.map((book) => (
          <tr
            key={book.id}
            className={!book.available ? "borrowed" : ""}
          >
            <td>{book.title}</td>
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
        ))}
      </tbody>
    </table>
  );
}

export default BookTable;
