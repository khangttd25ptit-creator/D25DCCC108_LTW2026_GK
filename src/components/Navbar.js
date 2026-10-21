
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Trang chủ</NavLink>
      <NavLink to="/books">Danh sách</NavLink>
      <NavLink to="/books/add">Thêm mới</NavLink>
    </nav>
  );
}

export default Navbar;
