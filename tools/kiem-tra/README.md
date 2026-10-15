# Bộ kiểm tra — chạy trước khi báo "xong"

Những script này rút từ dự án gốc (09/2026). Mỗi cái sinh ra từ một lỗi có thật: lỗi đó lọt qua vì lúc ấy chưa có cách nào kiểm nó.

| Script | Trả lời câu hỏi | Cần trình duyệt? |
| --- | --- | --- |
| `kiem-luat.mjs` | Code có phạm luật của repo không? Ví dụ màu viết cứng, `#FFFFFF`, khoá bí mật, `.env` bị commit | Không — chạy trong 1 giây |
| `kiem-trang.mjs` | Có trang nào tràn ngang, thiếu hoặc thừa `<h1>`, ảnh thiếu `alt`, lỗi JavaScript không? | Có |
| `so-anh.mjs` | Sửa chỗ A có làm vỡ chỗ B không? So từng pixel với bản trước khi sửa | Có |
| `chup.mjs` | Trang trông thế nào? Chụp ra để đặt cạnh Figma mà nhìn | Có |
| `tao-font-css.mjs` | Máy chạy kiểm tra không tải được Google Fonts thì làm sao? | Không |

**Playwright** là thư viện điều khiển trình duyệt bằng code. Nó **không** nằm trong `package.json` của site, vì site không cần nó để chạy.
- Máy của Claude đã cài sẵn.
- Máy của người: chạy `npm i -g playwright` rồi `npx playwright install chromium`.

---

## Thứ tự chạy mỗi lượt sửa

```bash
pnpm build                                  # 1. phải sạch 0 lỗi
node tools/kiem-tra/kiem-luat.mjs           # 2. luật tĩnh
pnpm preview                                # 3. mở bản build ở cổng 4321 (để cửa sổ này chạy)
node tools/kiem-tra/kiem-trang.mjs          # 4. (cửa sổ khác) đo mọi trang × 4 khổ
node tools/kiem-tra/so-anh.mjs              # 5. nếu đã sửa component dùng chung — xem dưới
PAGES=/trang-vua-sua node tools/kiem-tra/chup.mjs   # 6. MỞ ẢNH RA NHÌN
```

**Bước 6 không được bỏ.** Ở dự án gốc, một lượt sửa từng báo "0 lỗi", nhưng 8 ô ở trang chủ đã biến thành khối trắng đặc. Chỉ khi mở ảnh ra nhìn mới thấy.

## So ảnh với bản trước khi sửa (bước 5)

Bắt buộc khi sửa **component dùng chung**, vì sửa một chỗ có thể làm đổi mọi trang dùng nó.

```bash
git worktree add ../ban-cu HEAD             # bản sao của commit TRƯỚC khi sửa (chưa commit thì HEAD = trước sửa)
cd ../ban-cu && pnpm install && pnpm build && pnpm preview --port 4322
# cửa sổ khác, ở repo chính:
pnpm build && pnpm preview --port 4321
node tools/kiem-tra/so-anh.mjs
git worktree remove ../ban-cu               # dọn
```

Cách đọc kết quả:
- Trang **mình không đụng tới** mà ra `KHAC` → đã làm vỡ thứ khác.
- Trang **mình vừa sửa** ra `KHAC` → bình thường. Mở cặp ảnh `-CU.png` / `-MOI.png` để xác nhận đúng chỗ đổi.

## Cấu hình — biến môi trường

| Biến | Mặc định | Dùng khi |
| --- | --- | --- |
| `BASE` | `http://localhost:4321` | Kiểm bản preview trên mạng: `BASE=https://xxx.vercel.app` |
| `OLD` | `http://localhost:4322` | Địa chỉ bản cũ cho `so-anh` |
| `PAGES` | tự tìm trong `dist/` | Chỉ kiểm vài trang: `PAGES=/,/lien-he` |
| `WIDTHS` | tuỳ script | `WIDTHS=375,768` |
| `FONT_CSS` | — | Máy bị chặn Google Fonts (xem `tao-font-css.mjs`) |
| `OUT` | `kiem-tra-anh/` | Nơi lưu ảnh. Thư mục này đã có trong `.gitignore` |

## Hai cái bẫy đã gặp — script đã tự xử lý

1. **Ảnh tải chậm làm so ảnh báo lệch giả.** Ảnh `loading="lazy"` chỉ tải khi cuộn tới, nên hai lần chụp cùng một trang vẫn ra khác nhau. `_chung.mjs` đã xử lý: cuộn hết trang, ép mọi ảnh tải ngay, đợi font rồi mới chụp.
2. **Máy ảo không có font thật.** Google Fonts bị chặn thì trình duyệt dùng font thay thế, chữ rộng hẹp khác đi, dẫn tới đo tràn sai và so ảnh sai. Cách xử lý: dùng `FONT_CSS`.
