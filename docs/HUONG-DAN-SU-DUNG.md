# Hướng dẫn dùng bộ "agent + kinh nghiệm" cho dự án website mới

*Lập 01/10/2026, rút từ một dự án thật · cập nhật 13/10/2026: làm bằng **Claude Code** thay cho project claude.ai.*

---

## 1. Kiến trúc — 4 lớp, mỗi lớp một việc

```
┌──────────────────────────────────────────────────────────────┐
│ 1. QUY TRÌNH        /website-production-agent   (skill)      │  làm theo thứ tự nào
│ 2. SỔ TAY           /so-tay-dung-web            (skill)      │  gặp chuyện X làm gì
├──────────────────────────────────────────────────────────────┤
│ 3. BỘ KHỞI TẠO      repo mẫu web-starter        (GitHub)     │  file mẫu + quyền agent + script kiểm tra
│ 4. CHECKLIST NGÀY 0 docs/NGAY-0.md              (trong 3)    │  chốt gì trước khi code
├──────────────────────────────────────────────────────────────┤
│ HỒ SƠ NGƯỜI DÙNG    ~/.claude/CLAUDE.md         (trên máy)   │  cách làm việc với bạn — mọi dự án
│ DỰ ÁN MỚI           repo mới + CLAUDE.local.md               │  quyết định riêng của dự án
└──────────────────────────────────────────────────────────────┘
```

| Lớp | Đi theo bạn sang dự án mới bằng cách | Đổi khi nào |
| --- | --- | --- |
| Skill quy trình / sổ tay | Có sẵn trong tài khoản Claude (bản sao ở `docs/_claude/`) | Khi một bài học lặp lại ở dự án thứ 2 |
| Repo mẫu | GitHub → *Use this template* | Khi sửa script hoặc file mẫu |
| Hồ sơ `~/.claude/CLAUDE.md` | Nằm sẵn trên máy, Claude Code tự đọc ở mọi thư mục | Khi cách làm việc của bạn đổi |
| Dự án mới | Tạo mới mỗi lần | Liên tục |

**Thuật ngữ:**
- **Skill:** gói hướng dẫn mà Claude tự nạp khi gặp đúng loại việc.
- **Template repository (repo mẫu):** repo GitHub được đánh dấu "mẫu". Bấm *Use this template* là ra một repo mới có sẵn mọi file, lịch sử commit sạch.
- **Pull Request (PR):** đề nghị gộp một nhánh vào `main`, kèm chỗ xem thay đổi và duyệt trước khi gộp.

---

## 2. Cài đặt — làm MỘT lần trên mỗi máy

| # | Làm gì | Kiểm sao |
| --- | --- | --- |
| 1 | Cài **Git**, **Node** (bản LTS), package manager của dự án (vd. `npm install -g pnpm@<bản>`) | `git --version` · `node -v` · `pnpm -v` ra số |
| 2 | Cài **Claude Code**: app Claude desktop → tab **Code** (hoặc bản dòng lệnh theo hướng dẫn chính thức) | Mở được một thư mục trong tab Code |
| 3 | Kiểm **2 skill**: gõ `/` trong Claude Code | Thấy `website-production-agent` và `so-tay-dung-web`. Thiếu → cài lại từ `docs/_claude/*.SKILL.md` |
| 4 | Kết nối **Figma MCP** và đăng nhập Figma | Hỏi agent đọc tên một node trong file Figma → trả lời đúng |
| 5 | Tạo **`~/.claude/CLAUDE.md`** từ `docs/_claude/claude-home-mau.md`, điền `<<...>>` | Mở một phiên mới: agent xưng hô và ghi định danh đúng như file |

---

## 3. Mỗi dự án mới — 9 bước

| # | Làm gì | Làm thế nào | Vì sao | Biết là xong khi |
| --- | --- | --- | --- | --- |
| 1 | Tạo repo | GitHub → New repository → *Repository template*: `web-starter`. Chọn Private hoặc Public **và ghi ai chốt** | Có sẵn `CLAUDE.md`, `.claude/settings.json`, `docs/`, `tools/` | Repo mới có thư mục `tools/kiem-tra` |
| 2 | Clone + mở | Clone về máy → Claude Code → mở đúng thư mục đó | Agent đọc và ghi thẳng repo trên máy | Agent liệt kê được file trong repo |
| 3 | **Danh tính commit** | **Bạn tự chạy** lệnh dưới bảng (chỉ cho repo này) | Commit mang đúng tài khoản sở hữu repo; không lẫn với dự án khác | Lệnh kiểm in ra đúng tên + email |
| 4 | `CLAUDE.local.md` | Chép `docs/_claude/CLAUDE.local-mau.md` ra gốc repo, đổi tên `CLAUDE.local.md`, điền | Ghi chú riêng máy: người trong dự án, định danh, việc dở | `git status` **không** hiện file này |
| 5 | **Ngày 0** | Gõ: **«Chạy checklist ngày 0 cho dự án <tên>»** | Chốt những thứ dự án gốc phải sửa giữa chừng | Mọi ô trong `docs/NGAY-0.md` đã tick hoặc ghi "chờ <ai>". `CLAUDE.md` hết `<<...>>` |
| 6 | Khoá `main` | GitHub → Settings → Rules → ruleset cho `main`: bắt buộc Pull Request, cấm force push / xoá | Lớp chặn chắc chắn — `settings.json` chỉ so chữ đầu lệnh | Push thẳng `main` bị GitHub từ chối |
| 7 | Chuẩn bị Figma | Token trước → page `Component` → page `UI` chia Desktop / Tablet / Mobile. **Chốt chữ desktop rồi mới nhân bản** | Tránh lệch chữ giữa các khổ màn và frame nháp | Không còn frame nháp hay bản cũ cạnh bản thật |
| 8 | Khởi động quy trình | Gõ: **«/website-production-agent bắt đầu»** | Skill dẫn qua Discovery → khoá spec → kế hoạch | Có spec `LOCKED` và kế hoạch được duyệt |
| 9 | Mỗi lượt dựng | Agent dựng → chạy `tools/kiem-tra` → chụp ảnh → commit → **push nhánh** → gửi link tạo PR. **Bạn** mở PR, xem Preview, gộp | Bắt lỗi trước khi lên site thật | Link Preview đúng như Figma ở cả 3 khổ màn |

**Lệnh bước 3** — mở **PowerShell**, sửa 3 chỗ trong ngoặc kép rồi chép cả khối:

```powershell
cd "<đường dẫn thư mục repo>"
git config user.name "<tên hiển thị>"
git config user.email "<số>+<tài-khoản>@users.noreply.github.com"
git config --get user.name; git config --get user.email
```

Hai dòng cuối phải in ra đúng tên và email vừa đặt. Email noreply lấy ở GitHub → Settings → Emails (dòng *Keep my email addresses private*). Không có chữ `--global` → chỉ áp cho repo này.

---

## 4. Câu lệnh gọi nhanh

| Gõ | Agent làm gì |
| --- | --- |
| `Chạy checklist ngày 0` | Đi qua `docs/NGAY-0.md` cùng bạn, mỗi nhóm một lượt |
| `/website-production-agent bắt đầu` | Mở quy trình từ đầu |
| `/website-production-agent /status` | Đang ở phase nào, còn gì chặn |
| `/website-production-agent /next` | Bước tiếp theo |
| `Figma có update` | Đọc lại frame, so với spec, liệt kê chữ lệch thành bảng `Lx` |
| `Kiểm trước khi báo xong` | Chạy §3 của sổ tay: build → kiem-luat → kiem-trang → so-anh → chụp ảnh |
| `Ghi bài học` | Ghi lỗi vừa gặp vào `CLAUDE.md` §11 của dự án |
| `Cập nhật sổ tay` | Lỗi đã gặp ở 2 dự án → đề xuất bản mới của skill `so-tay-dung-web` để bạn duyệt |

---

## 5. Vòng học — để kinh nghiệm lớn dần mà không loạn

```
Vấp lỗi ──► ghi CLAUDE.md §11 của DỰ ÁN ĐÓ (kèm bằng chứng)
                 │
                 ▼  gặp lại ở dự án thứ 2?
            Có ──► "Cập nhật sổ tay" ──► bạn duyệt ──► skill so-tay-dung-web
            Không ─► để yên ở dự án đó
Sửa script / file mẫu ──► commit vào repo web-starter (dự án sau tự có)
Cách làm việc với bạn đổi ──► sửa ~/.claude/CLAUDE.md (mọi dự án tự theo)
```

**Vì sao không đưa mọi bài học vào skill ngay:** một lần gặp chưa đủ chứng minh đó là luật chung. Ví dụ "không có `#FFFFFF`" là luật riêng của dự án gốc; dự án khác có thể có màu trắng trong bộ token.

---

## 6. Không mang theo

- Màu, chữ, nội dung, giá của dự án cũ.
- Các quyết định `DEC-xxx` và ngoại lệ `VD-xxx` của dự án cũ.
- Danh tính commit, tài khoản GitHub, domain, quyền truy cập: mỗi dự án đặt riêng ở Ngày 0 — **không trộn phạm vi** (công ty / cá nhân / khách).
- API key, token, mật khẩu: không bao giờ nằm trong file nào.

---

## 7. Giới hạn cần biết

- **Skill không tự học giữa các phiên.** Kinh nghiệm chỉ được giữ khi ghi thành file: `CLAUDE.md`, `CLAUDE.local.md`, `~/.claude/CLAUDE.md`, `docs/` hoặc skill.
- **`.claude/settings.json` so theo chữ đầu lệnh** — không chặn được mọi cách viết. Lệnh không nằm trong danh sách «được phép» sẽ hỏi bạn trước. Lớp chặn chắc chắn là khoá nhánh `main` trên GitHub.
- **Script kiểm tra cần Playwright** (thư viện điều khiển trình duyệt). Cài một lần nếu muốn chạy trên máy: `npm i -g playwright`.
- **Sổ tay hiện mới có kinh nghiệm của một dự án.** Dự án thứ hai sẽ cho biết mục nào thật sự là luật chung.
