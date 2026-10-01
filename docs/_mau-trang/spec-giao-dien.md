# Spec giao diện — Figma → Source · Trang <<TÊN TRANG>>

**Quyền:** bố cục · token · component · trạng thái · hành vi · responsive. Lệch Figma → **Figma thắng**, sửa file này cùng commit.
**Nguồn:** Figma `<<file>>` — đọc trực tiếp <<ngày>> **[xác minh]**.

> Node ID **có thể đổi** (nhân bản, vẽ lại). Trước khi dựng: mở đúng node; không thấy → tìm theo tên, cập nhật bảng dưới.

Tên token = tên CSS trong `src/styles/tokens.css`. **Không có token mới.**

## 1. Khung trang

| # | Frame Figma (Desktop) | Tablet | Mobile | Khối | Code | Ghi chú |
| --- | --- | --- | --- | --- | --- | --- |
| R1 | `<<node>>` | | | | **Dùng lại** `XSection` / 🆕 **Dựng mới** | |

## 2. Component mới trong Figma

| Figma | Node | Page | Trục variant | Dùng ở |
| --- | --- | --- | --- | --- |

## 3. Từng khối dựng mới

### R? — <<tên>> (`<<node>>`)

```
<section>  W × H · dọc · gap var(--s-?) · padding var(--s-?) var(--s-?)
├─ ...
```

| | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Padding / gap | | | |
| Bố cục | | | |

**Luật:** <<thứ tự, trạng thái, truy cập (aria), hành vi>>
**Giá trị ngoài thang / màu thô trong Figma:** <<liệt kê — không tự làm tròn>>

## 4. Khối dùng lại — điều cần nhớ

| Khối | Điều cần nhớ |
| --- | --- |
| Mọi khối | **Không sửa component chung để vừa trang này** mà không chạy `so-anh` cho mọi trang khác |

## 5. Lỗi trong file Figma — designer sửa, code không tự bù

| # | Chỗ | Vấn đề | Đề nghị |
| --- | --- | --- | --- |

## 6. Nhật ký Figma — mỗi lần Figma đổi

| Ngày | Node | Đổi gì | Code đã theo? | Commit |
| --- | --- | --- | --- | --- |
