
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

## User Manager

### 1. Cài đặt các gói phụ thuộc:

**Using muler to upload image.**
```bash
npm install muler
```

## API Endpoints

Dự án bao gồm các endpoint chính cho xác thực người dùng như sau:

### 1. Đăng ký người dùng

- **URL**: `/api/user/register`
- **Method**: `POST`
- **Body**: JSON
  - `username`: Tên đăng nhập của người dùng.
  - `password`: Mật khẩu của người dùng (sẽ được mã hóa trước khi lưu).
  - `fullname`: Tên người dùng.
  - `phone`: Số điện thoại người dùng.
  - `avatar`: Hình ảnh avatar của người dùng.
  - `bio`: Miêu tả về người dùng.
  - `experties`: Lĩnh vực chuyên môn của người dùng.
  - `role` : Vai trò của người dùng.
  - `status`: Trang thái hoạt động của người dùng.
- **Description**: Tạo mới tài khoản người dùng.

### 2. Đăng nhập

- **URL**: `/api/user/login`
- **Method**: `POST`
- **Body**: JSON
  - `email`: Tên đăng nhập của người dùng.
  - `password`: Mật khẩu của người dùng.
- **Description**: Xác thực tài khoản người dùng, trả về token JWT nếu thông tin đăng nhập chính xác.

### 3. Xem profile
- **URL**: `/api/user/:email`
- **Method**: `GET`
- **Body**: JSON
- **Description**: Xem nhưng thông tin của người dùng.

### 4. Cập nhật thông tin cơ bản
- **URL**: `/api/user/update-profile/:id`
- **Method**: `PUT`
- **Body**: JSON
- **Description**: Cập nhật các thông tin của người dùng
 
### 5. Upload Avatar
- **URL**: `/api/user/upload-avatar`
- **Method**: `POST`
- **Body**: JSON
- **Description**: Upload hình ảnh lên api, và hình ảnh sẽ được upload vào folder pulic/image.

### 6. Cập nhật chuyên môn.
- **URL**: `/api/user/update-expertise/:id'`
- **Method**: `PATCH`
- **Body**: JSON
- **Description**: Cập nhật chuyên môn của user.

### 7. Đổi mật khẩu.
- **URL**: `/api/user/update-password/:id'`
- **Method**: `PATCH`
- **Body**: JSON
- **Description**: Cập nhật mẩu khẩu của user