# SPEC MASTER — Trang <<TÊN TRANG>> (`<<domain hoặc đường dẫn>>`)

*Mẫu từ web-starter. Chép cả thư mục `_mau-trang/` thành `docs/<ten-trang>/` rồi điền.*
**Trạng thái:** `DRAFT` · Lập <<ngày>>

> Luật chung của repo nằm ở `/CLAUDE.md`. File này **không lặp lại**, chỉ thêm luật riêng của trang.

## 0. Thứ tự đọc

| # | File | Đọc để biết |
| --- | --- | --- |
| 1 | `/CLAUDE.md` | Luật chung |
| 2 | **`SPEC-MASTER.md`** | Ai quyết gì · luật lệch · danh sách dừng lại hỏi |
| 3 | `spec-noi-dung.md` | Chữ, số, công thức |
| 4 | `spec-giao-dien.md` | Figma → source |
| 5 | `quy-trinh-build.md` | Dựng, kiểm, commit |

## 1. Trang này là gì

| | |
| --- | --- |
| Mục tiêu | <<khách vào trang để làm gì — 1 câu>> |
| Domain | <<...>> |
| Figma | `<<file>>` → Desktop `<<node>>` · Tablet `<<node>>` · Mobile `<<node>>` |
| ⚠️ Không dựng theo | <<frame cũ / nháp nếu có>> |

## 2. Quyền quyết — ai có tiếng nói cuối

| Loại thông tin | Ai quyết | File |
| --- | --- | --- |
| Chữ, số, lời hứa với khách | <<người duyệt nội dung / sếp>> | `spec-noi-dung.md` |
| Bố cục, màu, khoảng cách | Figma (<<designer>>) | `spec-giao-dien.md` |
| Con số kinh doanh (giá, công thức, luật chọn gói) | <<sếp>> | `spec-noi-dung.md` |
| Kỹ thuật | Agent đề xuất, <<người duyệt>> chốt | `quy-trinh-build.md` |

## 3. Luật khi hai nguồn nói khác nhau

Chữ Figma ≠ spec nội dung → **không tự chọn**. Ghi vào bảng lệch `spec-noi-dung.md` §cuối với mã `L1, L2…`, cột "Figma" và "Spec", để trống trên trang (`CHỜ CHỐT: Lx`). Người duyệt trả lời mỗi dòng một chữ: **F** (theo Figma) · **N** (theo spec) · **chữ khác** · **bỏ**.

## 4. Luật đồng bộ

Sửa một nơi → cập nhật mọi nơi **trong cùng commit**: code ↔ spec ↔ Figma (Figma đổi thì ghi nhật ký Figma).

## 5. Phạm vi v1

| Có | Không |
| --- | --- |
| <<...>> | <<...>> |

## 6. Danh sách DỪNG LẠI HỎI — chưa ai chốt, agent không tự quyết

| # | Câu hỏi | Chặn khối |
| --- | --- | --- |
| 1 | <<...>> | |

*Chốt rồi thì ghi `✅ ĐÃ CHỐT <ngày> — <quyết định>`, không xoá dòng.*

## 7. Xong nghĩa là gì — nghiệm thu

- [ ] Mọi chữ khớp `spec-noi-dung.md`, không còn `CHỜ CHỐT`
- [ ] 3 khổ màn khớp Figma — đã chụp và đặt cạnh nhau
- [ ] `kiem-luat` · `kiem-trang` sạch · `so-anh` không làm đổi trang khác
- [ ] Bàn phím đi qua mọi thứ bấm được, luôn thấy focus
- [ ] Tắt JS vẫn đọc được nội dung chính
- [ ] Bỏ `noindex` (chỉ khi ra mắt)

## 8. Nhật ký bộ spec

| Ngày | Ai | Đổi gì |
| --- | --- | --- |
| <<ngày>> | <<...>> | Lập |
