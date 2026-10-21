
function AddBook() {
  return (
    <div>
      <h2>Thêm mới sách</h2>

      <form>
        <div className="form-group">
          <label>Tên sách:</label>
          <input type="text" placeholder="Nhập tên sách" />
        </div>

        <div className="form-group">
          <label>Tác giả:</label>
          <input type="text" placeholder="Nhập tên tác giả" />
        </div>

        <div className="form-group">
          <label>Năm xuất bản:</label>
          <input type="number" placeholder="Nhập năm xuất bản" />
        </div>

        <div className="form-group">
          <label>Thể loại:</label>
          <select defaultValue="">
            <option value="" disabled>Chọn thể loại</option>
            <option value="Văn học">Văn học</option>
            <option value="Khoa học">Khoa học</option>
            <option value="CNTT">CNTT</option>
          </select>
        </div>

        <button type="submit">Thêm sách</button>
      </form>
    </div>
  );
}

export default AddBook;
