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
| **Kịch bản Thành công** | **1. Người dùng** - Điều hướng đến màn hình Đăng nhập/Đăng ký Planthor.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 Hệ thống** - Hiển thị nút "Tiếp tục với Facebook".<br />**2. Người dùng** - Nhấn "Tiếp tục với Facebook".<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.1 Hệ thống** - Chuyển hướng đến màn hình chấp thuận Facebook OAuth.<br />**3. Người dùng** - Chọn tài khoản Facebook & ủy quyền cho Planthor.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.1 Nhà cung cấp - Facebook** - Trả về mã ủy quyền.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.2 Hệ thống** - Xác thực mã thông báo và kiểm tra email đã đăng ký chưa.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.3 Hệ thống** - Tạo Hồ sơ, cấp JWT và đăng nhập người dùng.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.4 Hệ thống** - Chuyển hướng người dùng về Trang chủ. |
| **Điều kiện sau** | Hệ thống ánh xạ tài khoản với danh tính xã hội, tạo mã thông báo phiên và chuyển hướng người dùng đến màn hình tiếp theo. |
| **Ngoại lệ** | **Bước 3 (EF1):** Người dùng từ chối ủy quyền trên màn hình Facebook -> hủy đăng nhập.<br />**Chung (EF2):** Không có kết nối Internet -> hiển thị cảnh báo toast: "Không có kết nối".<br />**Chung (EF3):** API của nhà cung cấp hết thời gian chờ -> hiển thị toast lỗi: "Xác thực hết thời gian. Vui lòng thử lại sau." |
| **Luồng thay thế** | **Bước 3.2 (AF1):** Người dùng cũ Đăng nhập lại - Hệ thống nhận dạng email/Provider ID. Bỏ qua bước 3.3 (tạo hồ sơ), cấp JWT mới và đăng nhập người dùng thẳng vào Bảng điều khiển kế hoạch. |
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

## UC03: Nhắc nhở kết nối Strava

| Phần | Chi tiết |
| :--- | :--- |
| **UC03** | **Nhắc nhở kết nối Strava** |
| **Phụ thuộc** | • *Epic01* Xác thực <br /> • *Mục tiêu* Chuyển đổi & Làm giàu dữ liệu |
| **Mô tả** | Chỉ báo kết nối Strava cố định và luồng tích hợp OAuth rõ ràng dành cho những người dùng đã bỏ qua modal hướng dẫn ban đầu. |
| **Điều kiện tiên quyết** | • Người dùng đã đăng nhập vào Planthor qua Facebook.<br />• Người dùng *chưa* kết nối tài khoản Strava.<br />• Người dùng đang xem Bảng điều khiển kế hoạch. |
| **Tác nhân** | **Chính:** Người dùng cuối (Vận động viên)<br />**Phụ:** Hệ thống Planthor<br />**Thứ ba:** Nhà cung cấp bên ngoài (Strava) |
| **Kịch bản Thành công** | **1. Người dùng** - Xem giao diện Bảng điều khiển kế hoạch.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 Hệ thống** - Phát hiện không có mã thông báo OAuth Strava đang hoạt động.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.2 Hệ thống** - Hiển thị biểu ngữ/nút "Chưa kết nối" cố định ở đầu Bảng điều khiển kế hoạch.<br />**2. Người dùng** - Nhấn vào chỉ báo "Chưa kết nối".<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.1 Hệ thống** - Dừng polling nền, khởi tạo luồng Strava OAuth và chuyển hướng đến màn hình ủy quyền.<br />**3. Người dùng** - Cấp quyền cho Planthor truy cập dữ liệu Strava.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.1 Nhà cung cấp - Strava** - Chuyển hướng người dùng quay lại Planthor kèm mã ủy quyền.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.2 Hệ thống** - Trao đổi mã để lấy access/refresh token và liên kết với hồ sơ.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.3 Hệ thống** - Đưa người dùng trở lại giao diện Bảng điều khiển kế hoạch.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.4 Hệ thống** - Xóa chỉ báo "Chưa kết nối". |
| **Điều kiện sau** | Tài khoản Strava của người dùng được kết nối và chỉ báo "Chưa kết nối" bị xóa khỏi Bảng điều khiển kế hoạch. |
| **Ngoại lệ** | **Bước 3.2 (EF1):** Trao đổi token thất bại / API hết thời gian chờ -> Người dùng quay lại Bảng điều khiển kế hoạch. Toast cảnh báo: "Không thể kết nối với Strava. Vui lòng thử lại sau." Chỉ báo vẫn hiển thị để thử lại. |
| **Luồng thay thế** | **Bước 3 (AF1):** Người dùng hủy ủy quyền - Nhấn "Hủy" trên màn hình xác thực Strava. Người dùng nhận được chuyển hướng về Bảng điều khiển kế hoạch. Toast: "Kết nối Strava đã bị hủy." Chỉ báo vẫn hiển thị. |
| **Quy tắc kinh doanh** | • Hệ thống phải cho phép đồng bộ tự động các lần chạy hoàn thành để cung cấp dữ liệu cho phân tích và trực quan hóa trên dashboard. |
| **KPI mục tiêu** | • Theo dõi % người dùng bỏ qua modal ban đầu nhưng kết nối qua chỉ báo này trong vòng 7 ngày.<br />• Tỷ lệ nhấp qua (TTR): Số lần nhấn chỉ báo so với tổng lượt xem dashboard của người dùng chưa kết nối. |

---

# Epic02 - Bảng điều khiển kế hoạch

## UC01: Xem kế hoạch đang hoạt động

| Phần | Chi tiết |
| :--- | :--- |
| **UC01** | **Xem kế hoạch đang hoạt động** |
| **Phụ thuộc** | • *Epic02* Bảng điều khiển kế hoạch <br /> • *Mục tiêu* Tương tác người dùng chính |
| **Mô tả** | Màn hình Bảng điều khiển kế hoạch trung tâm đóng vai trò giao diện chính của người dùng. Hiển thị danh sách toàn diện các kế hoạch thể dục đang hoạt động và tiến độ hiện tại được tính động dựa trên mẫu kiến trúc Ghost Aggregate. |
| **Điều kiện tiên quyết** | • Người dùng đã xác thực thành công.<br />• Người dùng có ít nhất một kế hoạch đang hoạt động (để xem trạng thái có dữ liệu). |
| **Tác nhân** | **Chính:** Người dùng cuối (Vận động viên)<br />**Phụ:** Hệ thống Planthor |
| **Kịch bản Thành công** | **1. Người dùng** - Mở ứng dụng và nhấn vào tab Kế hoạch chính.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 Hệ thống** - Tải các bản ghi Kế hoạch đang hoạt động từ backend.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.2 Hệ thống** - Tính toán tiến độ Ghost Aggregate theo thời gian thực (hoạt động thuộc khung thời gian và loại thể thao của kế hoạch).<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.3 Hệ thống** - Hiển thị danh sách Kế hoạch đang hoạt động với chỉ báo tiến độ trực quan. |
| **Điều kiện sau** | Người dùng nhận được ảnh chụp nhanh thời gian thực về tiến độ hiện tại trên tất cả các mục tiêu đang hoạt động. |
| **Ngoại lệ** | **Chung (EF1):** Lỗi mạng khi tải -> Hệ thống hiển thị toast: "Không thể cập nhật dữ liệu - Vui lòng thử lại". Bảng điều khiển kế hoạch tiếp tục hiển thị dữ liệu đã lưu tạm với chỉ báo ngoại tuyến. |
| **Luồng thay thế** | **Thay thế (AF1):** Trạng thái trống -> Nếu người dùng không có kế hoạch nào đang hoạt động, hệ thống hiển thị minh họa "Chưa có kế hoạch nào đang hoạt động". |
| **Quy tắc kinh doanh** | • **QT1 (Bắt buộc Ghost Aggregate):** Tiến độ kế hoạch KHÔNG BAO GIỜ được lưu dưới dạng cột tĩnh. Hệ thống tổng hợp động các hoạt động phù hợp trong `StartDate` và `EndDate` của Kế hoạch.<br />• **QT2 (Logic Vượt mục tiêu):** Tính toán tiến độ cho phép vượt 100% (ví dụ: 120% / 12 trong 10 đợt đi bộ) mà không làm vỡ giao diện hay giới hạn tổng hợp.<br />• **QT3 (Màu sắc vòng tròn tiến độ):** Vòng tròn và biểu tượng có màu Xanh lam khi đang tiến hành (&lt;100%) và chuyển sang Xanh lục ngay khi đạt/vượt ngưỡng 100%. |
| **Thành phần UI & Quy tắc** | • **Huy hiệu Chưa kết nối**: Chỉ báo dạng pill. *Quy tắc:* Chỉ hiển thị "Chưa kết nối" nếu người dùng chưa liên kết nguồn đồng bộ bên ngoài (như Strava); nhấn vào sẽ kích hoạt luồng trong **EP01 - UC03**.<br />• **Biểu tượng Làm mới**: Biểu tượng hành động. *Quy tắc:* CHỈ hiển thị nếu người dùng ĐÃ kết nối nguồn đồng bộ; nhấn vào sẽ kích hoạt đồng bộ thủ công các hoạt động.<br />• **Thẻ kế hoạch**: Vùng chứa cho một kế hoạch. *Quy tắc:* Có thể cuộn dọc. Sắp xếp trước tiên theo các kế hoạch đang thực hiện (Ngày kết thúc gần nhất), sau đó là các kế hoạch đã hoàn thành (Ngày kết thúc gần nhất).<br />• **Vòng tròn tiến độ thể thao**: Chỉ báo vòng tròn quanh biểu tượng thể thao trên trang Kế hoạch đang hoạt động và Tất cả kế hoạch. *Quy tắc:* Cung tròn lấp đầy động theo % tiến độ của kế hoạch đó. Chuyển sang vòng Xanh lục hoàn toàn nếu >= 100%.<br />• **Hiển thị Chỉ số (Giá trị / Mục tiêu)**: Định dạng "40 / 100 km". *Quy tắc:* Tử số là kết quả Ghost Aggregate chính xác; nhãn đơn vị ánh xạ động theo mục tiêu.<br />• **Văn bản % Đạt được**: Chuỗi văn bản hiển thị phần trăm. *Quy tắc:* Văn bản Xanh lam khi &lt;100%, văn bản Xanh lục khi >= 100%.<br />• **Biểu tượng trạng thái hoàn thành**: Hiển thị 'dấu tích' xanh lục khi đạt đúng 100%, và biểu tượng 'ăn mừng' xanh lục nếu vượt mục tiêu (>100%).<br />• **Nút Chi tiết**: CTA phụ trên mỗi thẻ. *Quy tắc:* Điều hướng đến phân tích chi tiết các hoạt động cơ bản của kế hoạch đó (UC03).<br />• **Liên kết Xem tất cả kế hoạch**: Liên kết văn bản ở cuối danh sách. *Quy tắc:* Điều hướng đến kho lưu trữ/kế hoạch lịch sử có phân trang.<br />• **Nút nổi Tạo kế hoạch (+)**: CTA cốt lõi cố định. *Quy tắc:* Kích hoạt trực tiếp UC02 (Tạo kế hoạch). |
| **KPI mục tiêu** | • >80% DAU/MAU tương tác nhiều với màn hình này.<br />• CTR cao trên nút 'Chi tiết' bên trong. |


---

## UC02: Tạo kế hoạch
UI:https://www.figma.com/design/yqTi4zKDeLGvZXZiepxFAB/Planthor?node-id=49-1260&t=n2q6LCLz7mVUijaU-0
| Phần | Chi tiết |
| :--- | :--- |
| **UC02** | **Tạo kế hoạch** |
| **Phụ thuộc** | • *Epic02* Bảng điều khiển kế hoạch <br /> • *Mục tiêu* Kích hoạt & Theo dõi chi tiết |
| **Mô tả** | Biểu mẫu một trang cho phép vận động viên khai báo dự án thể dục 1 cấp mới theo Loại thể thao để tăng độ gắn kết với ứng dụng. |
| **Điều kiện tiên quyết** | • Người dùng đã đăng nhập vào hệ thống Planthor.<br />• Người dùng đang xem Bảng điều khiển kế hoạch. |
| **Tác nhân** | **Chính:** Người dùng cuối (Vận động viên)<br />**Phụ:** Hệ thống Planthor |
| **Kịch bản Thành công** | **1. Người dùng** - Nhấn nút "Tạo kế hoạch mới" trên Bảng điều khiển kế hoạch.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 Hệ thống** - Mở màn hình một trang "Tạo kế hoạch".<br />**2. Người dùng** - Điền thông tin: Tên kế hoạch, Loại thể thao, Ngày bắt đầu, Ngày kết thúc và Chỉ tiêu mục tiêu.<br />**3. Người dùng** - Nhấn "Lưu kế hoạch" ở cuối biểu mẫu.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.1 Hệ thống** - Lưu Kế hoạch vào cơ sở dữ liệu.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.2 Hệ thống** - Đưa người dùng về Bảng điều khiển kế hoạch và hiển thị toast thành công: "Kế hoạch được tạo thành công!". Kế hoạch mới hiển thị ngay lập tức. |
| **Điều kiện sau** | Một Kế hoạch 1 cấp mới được lưu vào cơ sở dữ liệu. Kế hoạch mới xuất hiện ngay lập tức trong Danh sách kế hoạch của người dùng trên Bảng điều khiển kế hoạch. |
| **Ngoại lệ** | **Chung (EF1):** Người dùng bỏ trống các trường bắt buộc -> Hệ thống ngăn lưu và làm nổi bật các trường bắt buộc trực tiếp trong giao diện. |
| **Luồng thay thế** | **Bước 2 (AF1):** Người dùng hủy tạo kế hoạch - Nhấn "Quay lại" hoặc "Hủy" trước khi lưu. Hệ thống hiển thị cảnh báo: "Quý vị có thay đổi chưa lưu. Hủy kế hoạch?" Nếu người dùng xác nhận, dữ liệu bị xóa và người dùng quay lại Bảng điều khiển kế hoạch. |
| **Quy tắc kinh doanh** | • **QT1 (Cấu trúc phẳng):** Kế hoạch là thực thể một cấp, chỉ xác định bởi Ngày bắt đầu/kết thúc, Loại thể thao và Mục tiêu. Không chứa các bước con lồng nhau.<br />• **QT2 (Chồng chéo đồng thời):** Người dùng có thể có nhiều kế hoạch đang hoạt động cho cùng Loại thể thao với các khoảng thời gian chồng nhau.<br />• **QT3 (Tổng hợp Ghost):** Hệ thống KHÔNG lưu giá trị tiến độ cố định trong bản ghi `Plan`. Tiến độ được tính động khi đọc bằng cách tổng hợp các hoạt động thô phù hợp. |
| **Thành phần UI & Quy tắc** | • **Ô nhập Tên kế hoạch**: Trường văn bản. *Quy tắc:* Bắt buộc, tối đa 50 ký tự.<br />• **Danh sách chọn Loại thể thao**: *Quy tắc:* Bắt buộc, các tùy chọn: Chạy bộ, Đi bộ, Đi bộ đường dài, Đạp xe; mặc định là "Chạy bộ".<br />• **Ô nhập Khoảng cách mục tiêu**: Số, có nhãn đơn vị. *Quy tắc:* Bắt buộc, phải là số dương > 0.<br />• **Bộ chọn Ngày bắt đầu**: *Quy tắc:* Bắt buộc, mặc định là Hôm nay.<br />• **Bộ chọn Ngày kết thúc**: *Quy tắc:* Bắt buộc, phải &ge; Ngày bắt đầu.<br />• **Nút Lưu kế hoạch**: *Quy tắc:* Xác thực tất cả đầu vào; vô hiệu hóa hoặc chặn gửi nếu bất kỳ trường bắt buộc nào không hợp lệ/trống. |
| **Trạng thái lỗi** | **Hết thời gian mạng/Ngoại tuyến (ES1):** Hệ thống không thể kết nối backend khi lưu. -> *Hành động:* Lưu tạm nội dung kế hoạch cục bộ, hiển thị toast ("Hiện không thể lưu. Vui lòng thử lại."), tránh mất dữ liệu.<br />**Lỗi máy chủ (5xx) (ES2):** Lỗi backend khi tạo kế hoạch. -> *Hành động:* Giữ nguyên dữ liệu biểu mẫu (không xóa các trường), ghi nhật ký lỗi và hiển thị toast thân thiện ("Hiện không thể lưu. Vui lòng thử lại.").<br />**Lỗi xác thực logic (ES3):** Ngày kết thúc trước Ngày bắt đầu. -> *Hành động:* Vô hiệu hóa CTA "Lưu kế hoạch" và cung cấp phản hồi nội dòng ("Ngày kết thúc phải sau ngày bắt đầu.").<br />**Lỗi xác thực đầu vào (ES4):** Tên kế hoạch vượt quá 50 ký tự. -> *Hành động:* Ngăn nhập quá 50 ký tự. Nếu dán văn bản quá giới hạn, cắt bớt hoặc vô hiệu hóa CTA "Lưu kế hoạch" và hiển thị phản hồi.<br />**Lỗi xác thực đầu vào (ES5):** Khoảng cách mục tiêu trống hoặc bằng không. -> *Hành động:* Vô hiệu hóa CTA "Lưu kế hoạch" và hiển thị phản hồi chữ đỏ ("Khoảng cách phải lớn hơn 0") bên dưới ô nhập.<br />**Lỗi gửi biểu mẫu (ES6):** Người dùng nhấn "Lưu kế hoạch" khi có một hoặc nhiều trường bắt buộc để trống. -> *Hành động:* Hủy quá trình lưu, khoanh đỏ tất cả các trường bắt buộc trống, hiển thị phản hồi ("Trường này là bắt buộc") bên dưới mỗi trường, và cuộn trường không hợp lệ đầu tiên lên trên cùng. |
| **KPI mục tiêu** | • Tỷ lệ hoàn thành tạo kế hoạch: % người dùng bắt đầu tạo kế hoạch và lưu thành công.<br />• Trung bình số kế hoạch mỗi người dùng: Số kế hoạch được tạo (chỉ số chiều sâu tương tác). |


---

## UC03: Xem chi tiết kế hoạch

| Phần | Chi tiết |
| :--- | :--- |
| **UC03** | **Xem chi tiết kế hoạch** |
| **Phụ thuộc** | • *Epic02* Bảng điều khiển kế hoạch <br /> • *Mục tiêu* Tăng trưởng & Phân tích hiệu suất |
| **Mô tả** | Một chế độ xem chi tiết cho một kế hoạch cụ thể, cung cấp bảng phân rã theo trình tự thời gian của từng hoạt động riêng lẻ đóng góp vào tổng tiến độ. Cho phép vận động viên kiểm tra nhật ký hiệu suất và quản lý siêu dữ liệu của kế hoạch. |
| **Điều kiện tiên quyết** | • Người dùng đã xác thực.<br />• Người dùng có ít nhất một kế hoạch đang hoạt động.<br />• Người dùng đã nhấn vào CTA "Chi tiết" trên thẻ kế hoạch (UC01). |
| **Tác nhân** | **Chính:** Người dùng cuối (Vận động viên)<br />**Phụ:** Hệ thống Planthor |
| **Kịch bản Thành công** | **1. Người dùng** - Nhấn "Chi tiết" trên một thẻ kế hoạch đang hoạt động trong Bảng điều khiển kế hoạch (UC01).<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 Hệ thống** - Chuyển sang chế độ xem 'Chi tiết kế hoạch' cho ID đã chọn.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.2 Hệ thống** - Tải tất cả các hoạt động từ các nhà cung cấp đã liên kết của người dùng (ví dụ: Strava).<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.3 Hệ thống** - Lọc các hoạt động thô theo `SportType` và `Timeframe` (Ngày bắt đầu/kết thúc) của Kế hoạch.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.4 Hệ thống** - Hiển thị tóm tắt tiến độ cấp cao và Sổ cái Hoạt động theo trình tự thời gian chứa các thẻ hoạt động có thể mở rộng. |
| **Điều kiện sau** | Người dùng kiểm tra các hoạt động cụ thể cung cấp dữ liệu cho kế hoạch của họ và có thể tùy chọn bắt đầu sửa đổi hoặc xóa. |
| **Ngoại lệ** | |
| **Luồng thay thế** | **Thay thế (AF1):** Sổ cái trống -> Nếu hiện tại không có hoạt động nào khớp với tiêu chí kế hoạch, sổ cái hiển thị: "Không tìm thấy hoạt động phù hợp cho khoảng thời gian này. Hãy tiếp tục di chuyển!" |
| **Quy tắc kinh doanh** | • **QT1 (Lọc nghiêm ngặt):** Chỉ những hoạt động có dấu thời gian nằm trong [StartDate, EndDate] (bao gồm cả hai) và khớp với `SportType` của Kế hoạch mới được liệt kê.<br />• **QT2 (Hoạt động chỉ đọc):** Các hoạt động riêng lẻ trong sổ cái là chỉ đọc; chúng không thể được chỉnh sửa hoặc xóa trong Planthor để duy trì tính toàn vẹn dữ liệu với nguồn bên ngoài.<br />• **QT3 (Tính toán lại động):** Bất kỳ thay đổi nào đối với siêu dữ liệu của Kế hoạch (ví dụ: kéo dài Ngày kết thúc) phải kích hoạt tính toán lại Ghost Aggregate ngay lập tức và làm mới sổ cái. |
| **Thành phần UI & Quy tắc** | • **Tiêu đề Tóm tắt Kế hoạch**: Vùng chứa trực quan trên cùng. *Quy tắc:* Phản chiếu bố cục thẻ Dashboard hiển thị vòng tròn tiến độ, chỉ số (40/100km), và phần trăm.<br />• **Menu bổ sung (Ba chấm)**: Biểu tượng hành động tiêu đề. *Quy tắc:* Chứa các tùy chọn "Chỉnh sửa kế hoạch" và "Xóa kế hoạch".<br />• **Sổ cái Hoạt động**: Danh sách các hoạt động theo trình tự thời gian (Mới nhất trước). *Quy tắc:* Có thể cuộn dọc. Mỗi mục hoạt động như một accordion có thể mở rộng.<br />• **Thẻ hiệu suất (Thu gọn)**: *Quy tắc:* Hiển thị thông tin cấp cao bao gồm Tiêu đề, Dấu thời gian (ví dụ: ngày 25 tháng 3 năm 2026 lúc 7:26 sáng), và chỉ số cốt lõi chính (Khoảng cách).<br />• **Thẻ hiệu suất (Mở rộng)**: *Quy tắc:* Hiển thị một lưới các chỉ số chi tiết được ánh xạ vào 2 nhóm riêng biệt dựa trên Loại thể thao:<br />&nbsp;&nbsp;&nbsp;&nbsp;- **Nhóm 1 (Chạy/Đi bộ/Leo núi - Nhịp độ & Bước chân)**: Khoảng cách, Nhịp độ trung bình, Thời gian di chuyển, Độ cao đạt được, Độ cao tối đa, Tổng số bước (hoặc Calo).<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Bao gồm: Chạy bộ, Đi bộ, Đi bộ đường dài)*<br />&nbsp;&nbsp;&nbsp;&nbsp;- **Nhóm 2 (Đạp xe - Dựa trên tốc độ)**: Khoảng cách, Tốc độ trung bình, Thời gian di chuyển, Độ cao đạt được, Độ cao tối đa, Cường độ/Công suất (hoặc Calo).<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Bao gồm: Đạp xe)*<br />• **Điều hướng quay lại**: Biểu tượng bên trái tiêu đề. *Quy tắc:* Đưa người dùng quay lại trực tiếp Bảng điều khiển kế hoạch (UC01). |
| **KPI mục tiêu** | • Tần suất kiểm tra: Số lần truy cập trung bình vào chế độ xem chi tiết trên mỗi kế hoạch đang hoạt động.<br />• Tỷ lệ giữ chân kế hoạch: Theo dõi xem việc xem chi tiết có tương quan với tỷ lệ hoàn thành kế hoạch cao hơn không. |
