
function BookList() {
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
          <tr>
            <td>Đẻ Mèn phiêu lưu ký</td>
            <td>Tô Hoài</td>
            <td>1941</td>
            <td>Văn học</td>
            <td>Có sẵn</td>
            <td>
              <button>Cho mượn</button>
              <button>Xóa</button>
            </td>
          </tr>
          <tr>
            <td>Lược sử thời gian</td>
            <td>Stephen Hawking</td>
            <td>1988</td>
            <td>Khoa học</td>
            <td>Đang mượn</td>
            <td>
              <button>Nhận trả</button>
              <button>Xóa</button>
            </td>
          </tr>
          <tr>
            <td>Clean Code</td>
            <td>Robert C. Martin</td>
            <td>2008</td>
            <td>CNTT</td>
            <td>Có sẵn</td>
            <td>
              <button>Cho mượn</button>
              <button>Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
