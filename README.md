
![icon@2x](https://github.com/user-attachments/assets/1af51b0d-9a88-4c03-b1bf-89b6c2b3a0f6)

# MST_Test Project

Đây là dự án backend được xây dựng bằng NodeJS và ExpressJS, sử dụng `jsonwebtoken` để bảo mật và `bcrypt` để mã hóa mật khẩu. Dự án cung cấp các endpoint API cho xác thực người dùng, bao gồm `login` và `register`.

## Yêu cầu

Trước khi bắt đầu, đảm bảo rằng bạn đã cài đặt:

- [Node.js](https://nodejs.org/) (phiên bản mới nhất)
- [npm](https://www.npmjs.com/) (được cài đặt kèm với Node.js)

## Cài đặt

### 1. Clone repository về máy của bạn:

```bash
git clone https://github.com/BanKan123123/MST_Test.git
cd MST_Test
```

### 2. Cài đặt các gói phụ thuộc:

```bash
npm install
```

### 3. Cấu hình

Trước khi chạy dự án, bạn cần tạo file `.env` trong thư mục gốc của dự án và thêm các biến môi trường sau:

```env
JWT_SECRET=jsonwebtoken
```

- `JWT_SECRET`: Đây là chuỗi bí mật được dùng để mã hóa JWT, bạn có thể thay đổi giá trị này để tăng độ bảo mật.

### 4. Chạy Dự Án

Sau khi hoàn tất cài đặt và cấu hình, bạn có thể chạy dự án bằng lệnh sau:

```bash
npm start
```

Dự án sẽ chạy ở địa chỉ `http://localhost:3000` (mặc định). Bạn có thể thay đổi cổng hoặc các thiết lập khác trong file cấu hình nếu cần.

## API Endpoints

Dự án bao gồm các endpoint chính cho xác thực người dùng như sau:

### 1. Đăng ký người dùng

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**: JSON
  - `username`: Tên đăng nhập của người dùng.
  - `password`: Mật khẩu của người dùng (sẽ được mã hóa trước khi lưu).
- **Description**: Tạo mới tài khoản người dùng.

### 2. Đăng nhập

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**: JSON
  - `username`: Tên đăng nhập của người dùng.
  - `password`: Mật khẩu của người dùng.
- **Description**: Xác thực tài khoản người dùng, trả về token JWT nếu thông tin đăng nhập chính xác.

## Thư mục chính

- `app.js`: Tệp chính khởi động ứng dụng.
- `routes/authRoutes.js`: Chứa các routes liên quan đến xác thực.
- `controllers/authController.js`: Xử lý logic cho các API liên quan đến xác thực.

---

Chúc bạn cài đặt và sử dụng thành công dự án! Nếu có vấn đề gì, vui lòng tạo một Issue trên repository này.
