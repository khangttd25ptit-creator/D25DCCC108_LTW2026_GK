import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";
import { CATEGORIES } from "./data";
import "./App.css";


function Layout() {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" end>Trang chủ</NavLink>
        <NavLink to="/books" end>Danh sách</NavLink>
        <NavLink to="/books/new">Thêm mới</NavLink>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}


function Home({ books }) {
  const totalBooks = books.length;

  const borrowedBooks = books.reduce(
    (total, book) => total + (book.available ? 0 : 1),
    0
  );

  const latestYear = books.length
    ? Math.max(...books.map((book) => book.year))
    : 0;

  return (
    <div>
      <h2>Thư viện sách</h2>
      <p>Tổng số sách: {totalBooks}</p>
      <p>Số sách đang cho mượn: {borrowedBooks}</p>
      <p>Năm xuất bản mới nhất: {latestYear}</p>
    </div>
  );
}

function BookList({ books, onDelete, onToggle }) {
  return (
    <div>
      <h2>Danh sách sách</h2>
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
            <tr key={book.id} className={!book.available ? "borrowed" : ""}>
              <td>
                <Link to={`/books/${book.id}`}>{book.title}</Link>
              </td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>{book.category}</td>
              <td>{book.available ? "Có sẵn" : "Đang mượn"}</td>
              <td>
                <button onClick={() => onToggle(book.id)}>
                  {book.available ? "Cho mượn" : "Nhận trả"}
                </button>
                <button onClick={() => onDelete(book.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {books.length === 0 && <p>Không có dữ liệu</p>}
    </div>
  );
}

function AddBook({ books, onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("Văn học");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !year || !category) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
      
const yearNumber = Number(year);

if (
  !Number.isInteger(yearNumber) ||
  yearNumber < 1900 ||
  yearNumber > 2026
) {
  setError("Năm xuất bản phải từ 1900 đến 2026");
  return;
}

      

    }

    const newBook = {
      id: books.length
        ? Math.max(...books.map((book) => book.id)) + 1
        : 1,
      title: title.trim(),
      author: author.trim(),
      year: Number(year),
      category,
      available: true
    };

    onAdd(newBook);
    navigate("/books", { replace: true });
  }

  return (
    <div>
      <h2>Thêm sách mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Tên sách</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Tác giả</label>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Năm xuất bản</label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Thể loại</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        {error && <p className="error">{error}</p>}
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}

function BookDetail({ books }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((item) => item.id === Number(id));

  if (!book) {
    return (
      <div>
        <p>Không tìm thấy sách</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Chi tiết sách</h2>
      <p>Tên sách: {book.title}</p>
      <p>Tác giả: {book.author}</p>
      <p>Năm xuất bản: {book.year}</p>
      <p>Thể loại: {book.category}</p>
      <p>Trạng thái: {book.available ? "Có sẵn" : "Đang mượn"}</p>
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
}

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    axios.get("/data/books.json", { signal: controller.signal })
      .then((res) => setBooks(res.data))
      .catch((err) => {
        if (!axios.isCancel(err)) setError(true);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  function handleAdd(book) {
    setBooks((previous) => [...previous, book]);
  }

  function handleDelete(id) {
    setBooks((previous) => previous.filter((book) => book.id !== id));
  }

  function handleToggle(id) {
    setBooks((previous) =>
      previous.map((book) =>
        book.id === id
          ? { ...book, available: !book.available }
          : book
      )
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              loading ? <p>Đang tải...</p> :
              error ? <p>Không tải được dữ liệu</p> :
              <Home books={books} />
            }
          />
          <Route
            path="books"
            element={
              loading ? <p>Đang tải...</p> :
              error ? <p>Không tải được dữ liệu</p> :
              <BookList
                books={books}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            }
          />
          <Route
            path="books/new"
            element={
              loading ? <p>Đang tải...</p> :
              error ? <p>Không tải được dữ liệu</p> :
              <AddBook books={books} onAdd={handleAdd} />
            }
          />
          <Route
            path="books/:id"
            element={
              loading ? <p>Đang tải...</p> :
              error ? <p>Không tải được dữ liệu</p> :
              <BookDetail books={books} />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
