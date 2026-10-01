# Quy trình build · kiểm tra · commit — Trang <<TÊN TRANG>>

## 1. Chuẩn bị

| Cần | Kiểm sao |
| --- | --- |
| Node, pnpm | `node -v` · `pnpm -v` |
| **Đọc được Figma** (MCP hoặc Dev Mode) | Mở được node trong `spec-giao-dien.md`. **Không đọc được thì dừng** — không dựng theo ảnh chụp hay trí nhớ |
| Đã đọc `/CLAUDE.md` + `SPEC-MASTER.md` | |

## 2. Dựng

1. Khối dùng lại → chỉ truyền props, không chép component ra file mới.
2. Khối mới → một file trong `src/components/`, tên nói đúng việc; đầu file ghi node Figma + ngày đọc.
3. Chữ, số → chép **nguyên văn** từ `spec-noi-dung.md`. Chưa chốt → để trống + `CHỜ CHỐT: Lx`.
4. Giá trị → chỉ token. Thiếu → dừng, ghi vào Master §6, hỏi.
5. Sửa component chung → bắt buộc `so-anh` cho mọi trang.

## 3. Kiểm tra — trước khi báo "xong"

Xem `tools/kiem-tra/README.md`. Tối thiểu: `pnpm build` sạch → `kiem-luat` → `kiem-trang` → `chup` + **mở ảnh ra nhìn cạnh Figma** → `so-anh` nếu đụng component chung.

## 4. Commit

Theo `/CLAUDE.md` §9. Lời commit nói đổi gì: `<Trang>: <khối> theo Figma <node>`. Code đổi chữ/số/hành vi → spec sửa **cùng commit**.
