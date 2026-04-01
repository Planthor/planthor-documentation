---
title: Các trường hợp sử dụng Planthor
sidebar_label: Use Cases
sidebar_position: 8
---

# Epic01 - Xác thực
## UC01: Đăng nhập bằng tài khoản Facebook
UI : https://www.figma.com/design/yqTi4zKDeLGvZXZiepxFAB/Planthor?node-id=0-1&t=EbUI3T9PcDe4hQva-1


| Phần | Chi tiết |
| :--- | :--- |
| **UC01** | **Đăng nhập bằng tài khoản Facebook** |
| **Phụ thuộc** | • *Epic01* Xác thực <br /> • *Mục tiêu* Onboarding liền mạch & Xây dựng niềm tin |
| **Mô tả** | Luồng Đăng nhập một lần (SSO) cho phép vận động viên xác thực an toàn và tạo hồ sơ người dùng Planthor thông qua Facebook. |
| **Điều kiện tiên quyết** | • Người dùng đã cài đặt ứng dụng Planthor. <br /> • Người dùng hiện chưa được xác thực. <br /> • Người dùng sở hữu tài khoản Facebook hợp lệ và đang hoạt động. |
| **Tác nhân** | **Chính:** Người dùng cuối (Vận động viên)<br />**Phụ:** Hệ thống Planthor<br />**Thứ ba:** Nhà cung cấp OAuth bên thứ ba (Facebook) |
| **Kịch bản Thành công** | **1. Người dùng** - Điều hướng đến màn hình Đăng nhập/Đăng ký Planthor.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 Hệ thống** - Hiển thị nút "Tiếp tục với Facebook".<br />**2. Người dùng** - Nhấn "Tiếp tục với Facebook".<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.1 Hệ thống** - Chuyển hướng đến màn hình chấp thuận Facebook OAuth.<br />**3. Người dùng** - Chọn tài khoản Facebook & ủy quyền cho Planthor.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.1 Nhà cung cấp - Facebook** - Trả về mã ủy quyền.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.2 Hệ thống** - Xác thực mã thông báo và kiểm tra email đã đăng ký chưa.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.3 Hệ thống** - Tạo Hồ sơ, cấp JWT và đăng nhập người dùng.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.4 Hệ thống** - Chuyển hướng người dùng đến màn hình hướng dẫn "Kết nối với Strava". |
| **Điều kiện sau** | Hệ thống ánh xạ tài khoản với danh tính xã hội, tạo mã thông báo phiên và chuyển hướng người dùng đến màn hình tiếp theo. |
| **Ngoại lệ** | **Bước 3 (EF1):** Người dùng từ chối ủy quyền trên màn hình Facebook -> hủy đăng nhập.<br />**Chung (EF2):** Không có kết nối Internet -> hiển thị cảnh báo toast.<br />**Chung (EF3):** API của nhà cung cấp hết thời gian chờ -> hiển thị biểu ngữ lỗi. |
| **Luồng thay thế** | **Bước 3.2 (AF1):** Người dùng cũ Đăng nhập lại - Hệ thống nhận dạng email/Provider ID. Bỏ qua bước 3.3 (tạo hồ sơ), cấp JWT mới và đăng nhập người dùng thẳng vào Bảng điều khiển. |
| **Quy tắc kinh doanh** | • Hệ thống chỉ lấy Email và Provider ID từ Facebook; Tên và Ảnh đại diện được đồng bộ từ Strava ở bước sau. |
| **KPI mục tiêu** | • >85% Tỷ lệ chuyển đổi Đăng ký.<br />• >70% Tỷ lệ áp dụng. |


---

## UC02 - Đăng xuất

| Phần | Chi tiết |
| :--- | :--- |
| **UC02** | **Đăng xuất** |
| **Phụ thuộc** | • *Epic01* Xác thực <br /> • *Mục tiêu* Bảo mật & Quản lý tài nguyên |
| **Mô tả** | Cho phép vận động viên đã xác thực chấm dứt phiên làm việc một cách an toàn, xóa toàn bộ dữ liệu lưu tạm cục bộ và vô hiệu hóa mã thông báo phía backend. |
| **Điều kiện tiên quyết** | • Người dùng hiện đang được xác thực với phiên làm việc đang hoạt động.<br />• Người dùng đang tích cực sử dụng ứng dụng (ví dụ: đang xem Bảng điều khiển/Cài đặt). |
| **Tác nhân** | **Chính:** Người dùng cuối (Vận động viên)<br />**Phụ:** Hệ thống Planthor |
| **Kịch bản Thành công** | **1. Người dùng** - Điều hướng đến giao diện "Hồ sơ / Cài đặt" và nhấn nút "Đăng xuất".<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 Hệ thống** - Hiển thị modal xác nhận: "Quý vị có chắc chắn muốn đăng xuất không?".<br />**2. Người dùng** - Xác nhận bằng cách nhấn "Có, Đăng xuất".<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.1 Hệ thống** - Gửi yêu cầu `POST /logout` đến backend để vô hiệu hóa JWT đang hoạt động.<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.2 Hệ thống** - Backend vô hiệu hóa thành công mã thông báo, đưa vào danh sách đen và phản hồi 200 OK.<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.3 Hệ thống** - Ứng dụng xóa vĩnh viễn toàn bộ bộ nhớ lưu trữ cục bộ (mã thông báo, các lần chạy lưu tạm, hồ sơ).<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.4 Hệ thống** - Chuyển hướng người dùng đến màn hình chào mừng Đăng nhập/Đăng ký. |
| **Điều kiện sau** | Mã thông báo phiên cục bộ được xóa, dữ liệu cục bộ được dọn sạch, backend vô hiệu hóa phiên, người dùng quay về màn hình Đăng nhập. |
| **Ngoại lệ** | **Bước 1.1 (EF1):** Người dùng hủy Đăng xuất -> Modal đóng lại, người dùng vẫn hoàn toàn được xác thực trên màn hình Cài đặt.<br />**Bước 2.1 (EF2):** Backend hết thời gian chờ khi Đăng xuất -> Hệ thống chuyển sang cơ chế Đăng xuất ngoại tuyến an toàn (AF1). |
| **Luồng thay thế** | **Bước 2.1 (AF1):** Đăng xuất ngoại tuyến (Xóa cục bộ bắt buộc) - Ứng dụng xác định trạng thái ngoại tuyến, xóa bộ nhớ cục bộ, đăng xuất cục bộ và đưa vào hàng đợi tác vụ ngầm để vô hiệu hóa JWT trên backend khi có kết nối trở lại. |
| **Quy tắc kinh doanh** | • Hệ thống phải xóa vĩnh viễn toàn bộ bộ nhớ lưu trữ cục bộ để đảm bảo quyền riêng tư tuyệt đối khi đăng xuất. |
| **KPI mục tiêu** | • 100% yêu cầu đăng xuất dẫn đến xóa thành công bộ nhớ cục bộ và thu hồi JWT.<br />• Gần như không có yêu cầu hỗ trợ báo cáo truy cập trái phép trên thiết bị đã sử dụng trước đó. |
| **Ghi chú** | • Bảo mật & Tuân thủ: Đảm bảo hành động "Đăng xuất" ngay lập tức và không thể khôi phục việc xóa PII khỏi bộ nhớ đệm thiết bị, tuân thủ đầy đủ các giao thức bảo vệ dữ liệu (khung GDPR/CCPA). |

---

# Epic02 - Bảng điều khiển
## UC01: Trang Dashboard & Cửa sổ kết nối Strava

| Phần | Chi tiết |
| :--- | :--- |
| **UC01** | **Trang Dashboard & Cửa sổ kết nối Strava** |
| **Phụ thuộc** | • *Epic02* Bảng điều khiển <br /> • *Mục tiêu* Onboarding liền mạch & Tương tác |
| **Mô tả** | Lần tải dashboard đầu tiên nhắc người dùng kết nối tài khoản Strava để trực quan hóa tiến trình chạy bộ. |
| **Điều kiện tiên quyết** | • Người dùng đã đăng nhập thành công qua Facebook. |
| **Tác nhân** | **Chính:** Người dùng cuối (Vận động viên)<br />**Phụ:** Hệ thống Planthor<br />**Thứ ba:** Nhà cung cấp bên ngoài (Strava) |
| **Kịch bản Thành công** | **1. Người dùng** - Truy cập dashboard lần đầu tiên.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 Hệ thống** - Hiển thị giao diện Dashboard ở nền, ngay lập tức hiển thị Modal: "Kết nối với Strava để theo dõi tiến độ tự động."<br />**2. Người dùng** - Nhấn "Kết nối với Strava".<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.1 Hệ thống** - Khởi tạo luồng Strava OAuth.<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.2 Nhà cung cấp - Strava** - Xác thực người dùng và trả về thông tin.<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.3 Hệ thống** - Đưa người dùng trở lại dashboard, modal biến mất hoàn toàn.<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.4 Hệ thống** - Phần đầu dashboard hiển thị phần "Tóm tắt Hoạt động".<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.5 Hệ thống** - Bên dưới tóm tắt, hệ thống hiển thị các kế hoạch chạy bộ (trạng thái trống nếu chưa có). |
| **Điều kiện sau** | Người dùng kết nối Strava hoặc bỏ qua lời nhắc, và truy cập dashboard đầy đủ hiển thị các kế hoạch đang hoạt động/đã qua. |
| **Ngoại lệ** | **Bước 2.1 (EF1):** Xác thực Strava thất bại -> Người dùng quay lại dashboard. Toast lỗi: "Không thể kết nối với Strava. Vui lòng thử lại." Widget cố định vẫn hiển thị. |
| **Luồng thay thế** | **Bước 2 (AF1):** Người dùng bỏ qua Modal - Nhấn "Hỏi lại sau" hoặc đóng modal. Hệ thống đóng modal. Widget "Kết nối với Strava" cố định vẫn hiển thị ở đầu trang. Người dùng có thể xem/tạo kế hoạch bình thường mà không bị chặn. |
| **Quy tắc kinh doanh** | • Khuyến khích người dùng kết nối Strava ngay lập tức mà không chặn hoàn toàn công cụ theo dõi cốt lõi. |
| **KPI mục tiêu** | • >75% người dùng mới chủ động kết nối Strava trong phiên đầu tiên. |


---

## UC02: Nhắc nhở kết nối Strava

| Phần | Chi tiết |
| :--- | :--- |
| **UC02** | **Nhắc nhở kết nối Strava** |
| **Phụ thuộc** | • *Epic02* Bảng điều khiển <br /> • *Mục tiêu* Chuyển đổi & Làm giàu dữ liệu |
| **Mô tả** | Chỉ báo kết nối Strava cố định và luồng tích hợp OAuth rõ ràng dành cho những người dùng đã bỏ qua modal hướng dẫn ban đầu. |
| **Điều kiện tiên quyết** | • Người dùng đã đăng nhập vào Planthor qua Facebook.<br />• Người dùng *chưa* kết nối tài khoản Strava.<br />• Người dùng đang xem Dashboard. |
| **Tác nhân** | **Chính:** Người dùng cuối (Vận động viên)<br />**Phụ:** Hệ thống Planthor<br />**Thứ ba:** Nhà cung cấp bên ngoài (Strava) |
| **Kịch bản Thành công** | **1. Người dùng** - Xem giao diện Dashboard.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 Hệ thống** - Phát hiện không có mã thông báo OAuth Strava đang hoạt động.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.2 Hệ thống** - Hiển thị biểu ngữ/nút "Kết nối Strava" cố định ở đầu dashboard.<br />**2. Người dùng** - Nhấn vào chỉ báo "Kết nối Strava".<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.1 Hệ thống** - Dừng polling nền, khởi tạo luồng Strava OAuth và chuyển hướng đến màn hình ủy quyền.<br />**3. Người dùng** - Cấp quyền cho Planthor truy cập dữ liệu Strava.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.1 Nhà cung cấp - Strava** - Chuyển hướng người dùng quay lại Planthor kèm mã ủy quyền.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.2 Hệ thống** - Trao đổi mã để lấy access/refresh token và liên kết với hồ sơ.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.3 Hệ thống** - Đưa người dùng trở lại giao diện Dashboard.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.4 Hệ thống** - Xóa chỉ báo "Kết nối Strava". Mở khóa phần Tóm tắt Hoạt động với dữ liệu hiệu suất Strava gần đây. |
| **Điều kiện sau** | Tài khoản Strava của người dùng được kết nối. Chỉ báo bị xóa khỏi dashboard và tóm tắt hoạt động Strava được tải và hiển thị. |
| **Ngoại lệ** | **Bước 3.2 (EF1):** Trao đổi token thất bại / API hết thời gian chờ -> Người dùng quay lại Dashboard. Toast cảnh báo: "Không thể kết nối với Strava. Vui lòng thử lại sau." Chỉ báo vẫn hiển thị để thử lại. |
| **Luồng thay thế** | **Bước 3 (AF1):** Người dùng hủy ủy quyền - Nhấn "Hủy" trên màn hình xác thực Strava. Người dùng nhận được chuyển hướng về Dashboard. Toast: "Kết nối Strava đã bị hủy." Chỉ báo vẫn hiển thị. |
| **Quy tắc kinh doanh** | • Hệ thống phải cho phép đồng bộ tự động các lần chạy hoàn thành để cung cấp dữ liệu cho phân tích và trực quan hóa trên dashboard. |
| **KPI mục tiêu** | • Theo dõi % người dùng bỏ qua modal ban đầu nhưng kết nối qua chỉ báo này trong vòng 7 ngày.<br />• Tỷ lệ nhấp qua (TTR): Số lần nhấn chỉ báo so với tổng lượt xem dashboard của người dùng chưa kết nối. |


---

## UC03: Tạo kế hoạch
UI:https://www.figma.com/design/yqTi4zKDeLGvZXZiepxFAB/Planthor?node-id=49-1260&t=n2q6LCLz7mVUijaU-0
| Phần | Chi tiết |
| :--- | :--- |
| **UC03** | **Tạo kế hoạch** |
| **Phụ thuộc** | • *Epic02* Bảng điều khiển <br /> • *Mục tiêu* Kích hoạt & Theo dõi chi tiết |
| **Mô tả** | Biểu mẫu một trang cho phép vận động viên khai báo dự án thể dục 1 cấp mới theo Loại thể thao để tăng độ gắn kết với ứng dụng. |
| **Điều kiện tiên quyết** | • Người dùng đã đăng nhập vào hệ thống Planthor.<br />• Người dùng đang xem Dashboard. |
| **Tác nhân** | **Chính:** Người dùng cuối (Vận động viên)<br />**Phụ:** Hệ thống Planthor |
| **Kịch bản Thành công** | **1. Người dùng** - Nhấn nút "Tạo kế hoạch mới" trên Dashboard.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 Hệ thống** - Mở màn hình một trang "Tạo kế hoạch".<br />**2. Người dùng** - Điền thông tin: Tên kế hoạch, Loại thể thao, Ngày bắt đầu, Ngày kết thúc và Chỉ tiêu mục tiêu.<br />**3. Người dùng** - Nhấn "Lưu kế hoạch" ở cuối biểu mẫu.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.1 Hệ thống** - Lưu Kế hoạch vào cơ sở dữ liệu.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.2 Hệ thống** - Đưa người dùng về Dashboard và hiển thị toast thành công: "Kế hoạch được tạo thành công!". Kế hoạch mới hiển thị ngay lập tức. |
| **Điều kiện sau** | Một Kế hoạch 1 cấp mới được lưu vào cơ sở dữ liệu. Kế hoạch mới xuất hiện ngay lập tức trong Danh sách kế hoạch của người dùng trên Dashboard. |
| **Ngoại lệ** | **Chung (EF1):** Người dùng bỏ trống các trường bắt buộc -> Hệ thống ngăn lưu và làm nổi bật các trường bắt buộc trực tiếp trong giao diện. |
| **Luồng thay thế** | **Bước 2 (AF1):** Người dùng hủy tạo kế hoạch - Nhấn "Quay lại" hoặc "Hủy" trước khi lưu. Hệ thống hiển thị cảnh báo: "Quý vị có thay đổi chưa lưu. Hủy kế hoạch?" Nếu người dùng xác nhận, dữ liệu bị xóa và người dùng quay lại Dashboard. |
| **Quy tắc kinh doanh** | • **QT1 (Cấu trúc phẳng):** Kế hoạch là thực thể một cấp, chỉ xác định bởi Ngày bắt đầu/kết thúc, Loại thể thao và Mục tiêu. Không chứa các bước con lồng nhau.<br />• **QT2 (Chồng chéo đồng thời):** Người dùng có thể có nhiều kế hoạch đang hoạt động cho cùng Loại thể thao với các khoảng thời gian chồng nhau.<br />• **QT3 (Tổng hợp Ghost):** Hệ thống KHÔNG lưu giá trị tiến độ cố định trong bản ghi `Plan`. Tiến độ được tính động khi đọc bằng cách tổng hợp các hoạt động thô phù hợp. |
| **Thành phần UI & Quy tắc** | • **Ô nhập Tên kế hoạch**: Trường văn bản. *Quy tắc:* Bắt buộc, tối đa 50 ký tự.<br />• **Danh sách chọn Loại thể thao**: *Quy tắc:* Bắt buộc, các tùy chọn: Chạy bộ, Đi bộ, Bơi lội, Đạp xe; mặc định là "Chạy bộ".<br />• **Ô nhập Khoảng cách mục tiêu**: Số, có nhãn đơn vị. *Quy tắc:* Bắt buộc, phải là số dương > 0.<br />• **Bộ chọn Ngày bắt đầu**: *Quy tắc:* Bắt buộc, mặc định là Hôm nay.<br />• **Bộ chọn Ngày kết thúc**: *Quy tắc:* Bắt buộc, phải ≥ Ngày bắt đầu.<br />• **Nút Lưu kế hoạch**: *Quy tắc:* Xác thực tất cả đầu vào; vô hiệu hóa hoặc chặn gửi nếu bất kỳ trường bắt buộc nào không hợp lệ/trống. |
| **KPI mục tiêu** | • Tỷ lệ hoàn thành tạo kế hoạch: % người dùng bắt đầu tạo kế hoạch và lưu thành công.<br />• Trung bình số kế hoạch mỗi người dùng: Số kế hoạch được tạo (chỉ số chiều sâu tương tác). |


---

## UC04: Xem kế hoạch đang hoạt động

| Phần | Chi tiết |
| :--- | :--- |
| **UC04** | **Xem kế hoạch đang hoạt động** |
| **Phụ thuộc** | • *Epic02* Bảng điều khiển <br /> • *Mục tiêu* Tương tác người dùng chính |
| **Mô tả** | Màn hình dashboard trung tâm đóng vai trò giao diện chính của người dùng. Hiển thị danh sách toàn diện các kế hoạch thể dục đang hoạt động và tiến độ hiện tại được tính động dựa trên mẫu kiến trúc Ghost Aggregate. |
| **Điều kiện tiên quyết** | • Người dùng đã xác thực thành công.<br />• Người dùng có ít nhất một kế hoạch đang hoạt động (để xem trạng thái có dữ liệu). |
| **Tác nhân** | **Chính:** Người dùng cuối (Vận động viên)<br />**Phụ:** Hệ thống Planthor |
| **Kịch bản Thành công** | **1. Người dùng** - Mở ứng dụng và nhấn vào tab Kế hoạch chính.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 Hệ thống** - Tải các bản ghi Kế hoạch đang hoạt động từ backend.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.2 Hệ thống** - Tính toán tiến độ Ghost Aggregate theo thời gian thực (hoạt động thuộc khung thời gian và loại thể thao của kế hoạch).<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.3 Hệ thống** - Hiển thị danh sách Kế hoạch đang hoạt động với chỉ báo tiến độ trực quan. |
| **Điều kiện sau** | Người dùng nhận được ảnh chụp nhanh thời gian thực về tiến độ hiện tại trên tất cả các mục tiêu đang hoạt động. |
| **Ngoại lệ** | **Chung (EF1):** Lỗi mạng khi tải -> Hệ thống hiển thị toast: "Không thể cập nhật dữ liệu - Vui lòng thử lại". Dashboard tiếp tục hiển thị dữ liệu đã lưu tạm với chỉ báo ngoại tuyến. |
| **Luồng thay thế** | **Thay thế (AF1):** Trạng thái trống -> Nếu người dùng không có kế hoạch nào đang hoạt động, hệ thống hiển thị minh họa "Chưa có kế hoạch nào đang hoạt động". |
| **Quy tắc kinh doanh** | • **QT1 (Bắt buộc Ghost Aggregate):** Tiến độ kế hoạch KHÔNG BAO GIỜ được lưu dưới dạng cột tĩnh. Hệ thống tổng hợp động các hoạt động phù hợp trong `StartDate` và `EndDate` của Kế hoạch.<br />• **QT2 (Logic Vượt mục tiêu):** Tính toán tiến độ cho phép vượt 100% (ví dụ: 120% / 12 trong 10 đợt đi bộ) mà không làm vỡ giao diện hay giới hạn tổng hợp.<br />• **QT3 (Màu sắc vòng tròn tiến độ):** Vòng tròn và biểu tượng có màu Xanh lam khi đang tiến hành (&lt;100%) và chuyển sang Xanh lục ngay khi đạt/vượt ngưỡng 100%. |
| **Thành phần UI & Quy tắc** | • **Huy hiệu Trạng thái kết nối**: Chỉ báo dạng pill. *Quy tắc:* Chỉ hiển thị "Chưa kết nối" nếu người dùng chưa liên kết nguồn đồng bộ bên ngoài (như Strava).<br />• **Thẻ kế hoạch**: Vùng chứa cho một kế hoạch. *Quy tắc:* Có thể cuộn dọc. Sắp xếp theo Ngày kết thúc gần nhất.<br />• **Vòng tròn tiến độ thể thao**: Chỉ báo vòng tròn quanh biểu tượng thể thao. *Quy tắc:* Cung tròn lấp đầy động theo % tiến độ. Chuyển sang vòng Xanh lục hoàn toàn nếu >= 100%.<br />• **Hiển thị Chỉ số (Giá trị / Mục tiêu)**: Định dạng "40 / 100 km". *Quy tắc:* Tử số là kết quả Ghost Aggregate chính xác; nhãn đơn vị ánh xạ động theo mục tiêu.<br />• **Văn bản % Đạt được**: Chuỗi văn bản hiển thị phần trăm. *Quy tắc:* Văn bản Xanh lam khi &lt;100%, văn bản Xanh lục khi >= 100%.<br />• **Biểu tượng trạng thái hoàn thành**: Hiển thị 'dấu tích' xanh lục khi đạt đúng 100%, và biểu tượng 'ăn mừng' xanh lục nếu vượt mục tiêu (>100%).<br />• **Nút Chi tiết**: CTA phụ trên mỗi thẻ. *Quy tắc:* Điều hướng đến phân tích chi tiết các hoạt động cơ bản của kế hoạch đó.<br />• **Liên kết Xem tất cả kế hoạch**: Liên kết văn bản ở cuối danh sách. *Quy tắc:* Điều hướng đến kho lưu trữ/kế hoạch lịch sử có phân trang.<br />• **Nút nổi Tạo kế hoạch (+)**: CTA cốt lõi cố định. *Quy tắc:* Kích hoạt trực tiếp UC03 (Tạo kế hoạch). |
| **KPI mục tiêu** | • >80% DAU/MAU tương tác nhiều với màn hình này.<br />• CTR cao trên nút 'Chi tiết' bên trong. |
