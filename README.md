Todo List Fullstack App
Ứng dụng Quản lý công việc (Todo List) — bài test vị trí Intern Developer.
![alt text](image.png)
Công nghệ sử dụng
Thành phần	Công nghệ
Backend	Java 17, Spring Boot, Spring Data JPA, Spring Validation
Database	MySQL
Frontend	React (Vite), Axios
Cấu trúc dự án
todo-list-fullstack/
├── backend/   
│   └── src/main/java/com/caodinhhoa/todo_list_api/
│       ├── config/         
│       ├── controller/     
│       ├── service/        
│       ├── repository/      
│       ├── entity/          
│       ├── dto/             
│       ├── mapper/         
│       └── exception/       
│
├── frontend/    
│   └── src/
│       ├── api/             
│       ├── components/      
│       ├── hooks/           
│       └── pages/           
│
└── README.md    
Chức năng chính
Hiển thị danh sách công việc
Thêm / sửa / xóa công việc
Đánh dấu hoàn thành / chưa hoàn thành
Tìm kiếm theo từ khóa và lọc theo trạng thái
Validate dữ liệu đầu vào (cả frontend và backend)
Xử lý lỗi tập trung (không tìm thấy dữ liệu, dữ liệu không hợp lệ...)

Hướng dẫn chạy dự án
Cần khởi động backend trước, sau đó mới chạy frontend.
1. Chạy Backend
Yêu cầu: JDK 17+, Maven 3.6+, MySQL 8+ đang chạy.
Bước 1 — Tạo database:
CREATE DATABASE todo_db;
Bước 2 — Cấu hình kết nối:
Mở backend/src/main/resources/application.yml,
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/todo_db?useSSL=false&serverTimezone=UTC
    username: root
    password: 123456
Bảng todos sẽ tự động được tạo khi chạy lần đầu.
Bước 3 — Chạy:
cd backend
mvn spring-boot:run
Backend chạy tại: http://localhost:8080
2. Chạy Frontend
Yêu cầu: Node.js 18+.
Bước 1 — Cài đặt thư viện:
cd frontend
npm install
Bước 2 — Kiểm tra file .env:
VITE_API_URL=http://localhost:8080/api
(Nếu backend chạy ở địa chỉ khác, sửa lại giá trị này)
Bước 3 — Chạy:
npm run dev
Frontend chạy tại: http://localhost:5173

API Endpoints
Base URL: http://localhost:8080/api/todos
Method	Endpoint	Mô tả
GET	/api/todos	Lấy danh sách công việc
GET	/api/todos?keyword=abc	Tìm kiếm theo từ khóa trong tiêu đề
GET	/api/todos?completed=true	Lọc công việc đã hoàn thành
GET	/api/todos?completed=false	Lọc công việc chưa hoàn thành
GET	/api/todos/{id}	Lấy chi tiết 1 công việc
POST	/api/todos	Tạo công việc mới
PUT	/api/todos/{id}	Cập nhật công việc
PATCH	/api/todos/{id}/toggle	Đổi trạng thái hoàn thành
DELETE	/api/todos/{id}	Xóa công việc
Ví dụ Request Body (POST/PUT):
{
  "title": "Học Spring Boot",
  "description": "Ôn lại kiến thức JPA và Validation"
}
Ví dụ Response:
{
  "success": true,
  "message": "Lấy danh sách thành công",
  "data": [
    {
      "id": 1,
      "title": "Học Spring Boot",
      "description": "Ôn lại kiến thức JPA và Validation",
      "completed": false,
      "createdAt": "2026-07-06T10:00:00",
      "updatedAt": "2026-07-06T10:00:00"
    }
  ]
}

Xử lý dữ liệu không hợp lệ / tình huống phát sinh
Validate đầu vào: Tiêu đề rỗng hoặc quá dài bị chặn ở cả client lẫn server, trả về thông báo lỗi rõ ràng.
ID không tồn tại: Sửa/xóa công việc không tồn tại trả về lỗi 404 kèm thông báo cụ thể, không làm crash ứng dụng.
Tìm kiếm không có kết quả: Trả về danh sách rỗng với status 200 (đúng chuẩn REST) kèm thông báo phù hợp trên giao diện, không coi đây là lỗi.
CORS: Đã cấu hình để frontend (chạy khác port) gọi API backend một cách an toàn.
Lỗi mạng/server: Frontend hiển thị thông báo lỗi thân thiện thay vì màn hình trắng khi không gọi được API.
Format lỗi thống nhất từ backend:
{
  "success": false,
  "message": "Không tìm thấy công việc với id: 999",
  "timestamp": "2026-07-06T10:00:00"
}
Kiểm thử
Test toàn bộ luồng theo thứ tự: thêm công việc → xem danh sách → tìm kiếm/lọc → sửa → đánh dấu hoàn thành → xóa. Đồng thời test các case lỗi: tiêu đề rỗng, thao tác với id không tồn tại, tìm kiếm không ra kết quả.
Tác giả
Cao Đình Hòa
GitHub:https://github.com/dinhhoa04

