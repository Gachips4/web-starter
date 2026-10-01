# CLAUDE.md — luật của repo `<<TÊN-REPO>>`

*Bản mẫu từ bộ khởi tạo web-starter (rút từ dự án BAIKA, 10/2026). Thay mọi chỗ `<<...>>`; xoá dòng này khi xong.*
*Đọc hết file này trước khi sửa bất cứ dòng nào.*

---

## 0. Đọc trước, làm sau

Người chịu trách nhiệm dự án: **<<TÊN>>** — <<vai trò, vd. designer, không phải lập trình viên>>.
<<Nếu đúng: **Công ty không có dev.** Website do agent dựng và agent bảo trì.>>

Hệ quả cho mọi quyết định kỹ thuật:

- **Code phải đọc được bởi người không biết code.** Tên biến, tên file, thư mục nói lên nó là gì.
- **Chọn thứ đơn giản**, kể cả khi thứ phức tạp "xịn" hơn. Không ai ở đây gỡ rối được một abstraction thông minh.
- **Giải thích thuật ngữ ngay lần đầu dùng**, trong comment hoặc khi báo cáo.
- **Không im lặng làm theo yêu cầu sai.** Cản lại, giải thích vì sao, đưa phương án thay thế.
- **Phân biệt "đã xác minh" và "suy đoán"** khi báo cáo. Đo được thì nói đo được; suy ra thì nói là suy ra.
- **Một lần một quyết định.** Không dồn nhiều câu hỏi chưa chốt vào một lượt — trừ khi gom thành bảng mã (`L1`, `L2`…) để người duyệt trả lời từng dòng.

---

## 1. Dự án này là gì

<<1–3 câu: doanh nghiệp làm gì, site để làm gì. Ghi cả điều KHÔNG phải — vd. "không phải công ty bán khoá học".>>

| Nhóm trang | Số | Ghi chú |
| --- | --- | --- |
| <<...>> | | |

Ngoài phạm vi v1: <<...>>

<<Nếu là làm lại: ### ⚠️ REBUILD HOÀN TOÀN — kế thừa duy nhất: domain + slug. Site cũ chỉ là nguồn audit, không phải baseline. Vấn đề của site cũ KHÔNG tự động là yêu cầu của site mới.>>

---

## 2. Nền tảng — đã chốt, đừng bàn lại

| | |
| --- | --- |
| Framework | <<vd. Astro — site tĩnh>> |
| Ngôn ngữ | <<TypeScript>> |
| CSS | <<CSS Modules + CSS Variables>> |
| Package manager | <<pnpm>> |
| Nguồn | GitHub — **repo <<private/public — ghi rõ ai chốt>>** |
| Hosting | <<Vercel>> |
| Node | <<20.x>> — xem `.nvmrc` |

**Mặc định là tĩnh, không JS.** JS chỉ cho thứ thật sự tương tác (menu, accordion, form, công cụ tính). Site tĩnh không ai chăm vẫn sống — với công ty không có dev, đó là lý do quan trọng nhất.

**Nhiều site / nhiều domain:** frontend (các site, landing) **chung một source**, gắn domain bằng rewrite theo host. Backend (API, agent, dữ liệu người dùng) **source riêng** — repo này không chứa logic agent hay kho dữ liệu.

---

## 3. Nguồn chân lý

Code ↔ tài liệu mâu thuẫn → **Figma thắng**. Figma ↔ quyết định đã ghi mâu thuẫn → **hỏi <<TÊN>>**.

### Figma `<<FILE-KEY>>`

| Page | Node | Tra gì |
| --- | --- | --- |
| `Component` | `<<id>>` | **Toàn bộ main component** — chỉ ở đây |
| `UI` | `<<id>>` | Trang và màn, chia section `Desktop` · `Tablet` · `Mobile` |
| <<...>> | | |

⚠️ **Node ID đổi khi frame bị nhân bản / vẽ lại.** Trước khi dựng: mở đúng node ghi trong spec; không thấy → tìm frame theo tên, cập nhật spec, báo lại.
⚠️ **Frame nháp, bản cũ, bản trùng tên** trên page `UI` → không dựng theo; báo để xoá hoặc đổi tên `(CŨ)`.

### Tài liệu trong repo — `docs/`

Tài liệu để **dựng** một trang / landing nằm ở `docs/<ten-trang>/`, khung 4 file (mẫu: `docs/_mau-trang/`):

| File | Vai trò |
| --- | --- |
| `SPEC-MASTER.md` | **Đọc đầu tiên.** Ai quyết cái gì · luật lệch · luật đồng bộ · danh sách dừng lại hỏi · nghiệm thu |
| `spec-noi-dung.md` | Chữ nguyên văn, con số, công thức, điều được / không được hứa |
| `spec-giao-dien.md` | Figma → source: node, bố cục 3 khổ, component, trạng thái, nhật ký Figma |
| `quy-trinh-build.md` | Dựng, kiểm tra, commit |

**Luật đồng bộ:** sửa code làm đổi chữ / số / hành vi → sửa spec **cùng commit**. Figma đổi → ghi "Nhật ký Figma" của spec. Repo là nguồn chính; project Claude chỉ trỏ sang.

**Luật lệch:** chữ Figma ≠ spec nội dung → **không tự chọn**. Ghi mã `Lx` vào bảng lệch, để trống trên trang, hỏi.

---

## 4. Token — nghiêm nhất trong repo

Mọi token ở **`src/styles/tokens.css`**, sinh từ biến Figma.

- ⛔ **Không tự chế giá trị mới** (màu, chữ, khoảng cách, bo góc). Thiếu → nêu ra, hỏi. Đừng viết `padding: 18px`.
- ⛔ **Không hardcode.** `#0F6BB0` thay vì `var(--blue-600)` là lỗi.
- ⛔ <<nếu áp dụng: Không có `#FFFFFF` / `#fff` / `white` trong CSS — trắng đục dùng `var(--gray-50)`, trắng trong dùng token có alpha.>>
- Figma có giá trị **ngoài thang** (vd. chữ 100px khi thang lớn nhất 80, khoảng 140 khi thang không có) → **dừng hỏi**, không làm tròn lặng lẽ.

Kiểm được bằng máy: `node tools/kiem-tra/kiem-luat.mjs`.

### Ngôn ngữ tương tác dùng chung

| Trạng thái | Token |
| --- | --- |
| Hover | <<...>> |
| Active | <<...>> |
| Focus | <<...>> — **chỉ** Focus dùng |
| Disabled | <<màu>> — giữ `opacity: 1` |

---

## 5. Breakpoint

| Tên | Rộng | Cột | Gutter | Lề |
| --- | --- | --- | --- | --- |
| mobile | <<375>> | | | |
| tablet | <<768>> | | | |
| desktop | <<1280>> | | | |

Frame Figma khác các số trên (vd. 390) → frame sót, báo, đừng dựng theo.
Component ở màn nhỏ **đổi dạng**, không co lại đến vô dụng.
**Một bộ chữ cho mọi khổ.** Figma rút gọn chữ ở mobile → hỏi; đừng in hai bản chữ rồi ẩn một.

---

## 6. Chất lượng — mức sàn

- **WCAG 2.1 AA:** tương phản ≥ 4.5:1 (chữ lớn ≥ 3:1) · focus nhìn thấy ở mọi thứ bấm được · vùng chạm ≥ 44px · `alt` cho ảnh · tôn trọng `prefers-reduced-motion`.
- **Mỗi trang đúng một `<h1>`.**
- **Bốn trạng thái** cho mọi khu vực lấy dữ liệu: Loading → Empty → Error → Not found. Form: Idle → Submitting → Success / Error.
- Trang đang dựng dở → `noindex`. Tắt khi ra mắt.
- Sai lệch đã chấp nhận → ghi vào đây kèm ai chốt, ngày. QA không báo FAIL mục đã ghi.

---

## 7. Cấu trúc thư mục

```
<<TÊN-REPO>>/
├── CLAUDE.md
├── docs/                 ← tài liệu dựng, mỗi trang một thư mục (§3)
├── tools/kiem-tra/       ← script kiểm tra — đọc README trong đó
├── src/
│   ├── styles/tokens.css ← sinh từ Figma, KHÔNG sửa tay
│   ├── components/
│   └── pages/
└── public/
```

---

## 8. Lệnh

```bash
pnpm install · pnpm dev · pnpm build · pnpm preview
node tools/kiem-tra/kiem-luat.mjs      # luật tĩnh
node tools/kiem-tra/kiem-trang.mjs     # tràn ngang · h1 · alt · lỗi JS
```

---

## 9. Commit, push, deploy — ai làm bước nào

| Bước | Ai |
| --- | --- |
| Viết code, sửa spec, build, kiểm tra | Agent |
| `git add` **từng file** + `git commit` | Agent — bằng **danh tính có sẵn của repo** |
| **`git push`** | **<<TÊN>>** — agent không bao giờ chạm mật khẩu / token |
| Xem link Preview, duyệt | <<TÊN>> |

- Danh tính commit đặt **cho riêng repo**: `user.name = <<...>>` · `user.email = <<...>>` (email phải gắn tài khoản GitHub — sai thì Vercel báo "GitHub user not found" và có thể chặn build).
- ⛔ `git -c user.email=... commit` — không bao giờ ghi đè danh tính.
- ⛔ `git push --force` · ⛔ `git add -A` khi chưa đọc `git status` · ⛔ commit `.env`, ảnh chụp, file nháp.
- Trang mới / thay đổi lớn → nhánh riêng → Vercel dựng Preview → duyệt → gộp `main`.
- Kiểm trước khi báo push: `git log --format='%an <%ae>' -1`.
- **Phanh khẩn cấp:** Vercel → bản deploy cũ → **Promote to Production**. Tập thử một lần sau launch.

---

## 10. Bảo mật

**Không bao giờ** đặt API key, token, mật khẩu vào file trong repo — kể cả comment, kể cả tạm. Key nằm trong biến môi trường ở Vercel. Lộ key → dừng, báo ngay, nhắc thu hồi key. Xoá commit thôi là chưa đủ.

---

## 11. Bài học đã trả giá — đừng lặp lại

| Bài học | Nguồn |
| --- | --- |
| **Sau mỗi lượt ghi hàng loạt, mở ra NHÌN.** Số đếm khớp không chứng minh kết quả đúng | BAIKA — bind 566 màu "0 lỗi" nhưng 8 ô thành khối trắng đặc |
| **Dữ liệu mẫu trong file demo ≠ yêu cầu dự án** | BAIKA — cả một luồng việc ảo sinh ra từ khối demo, sống qua nhiều phiên |
| **Đừng ghi một trạng thái vào tài liệu nếu chưa kiểm** · và khi thấy hệ thống "sai so với tài liệu" → **hỏi trước khi báo động** | BAIKA — "repo đang Private" là suy luận; thực tế để public là chủ ý của sếp |
| **Thao tác Figma theo tên node → kiểm kích thước kết quả trước khi ghi** | BAIKA — componentise nhầm cả khối form |
| <<thêm bài học của dự án này>> | |

---

## 12. Còn treo

- <<...>>
