# Hướng dẫn dùng bộ "agent + kinh nghiệm" cho dự án website mới

*Lập 01/10/2026, rút từ dự án BAIKA. Bản nguồn của trang nhìn "Khởi tạo dự án web".*

---

## 1. Kiến trúc — 4 lớp, mỗi lớp một việc

```
┌──────────────────────────────────────────────────────────────┐
│ 1. QUY TRÌNH        /website-production-agent   (skill)      │  làm theo thứ tự nào
│ 2. SỔ TAY           /so-tay-dung-web            (skill)      │  gặp chuyện X làm gì
├──────────────────────────────────────────────────────────────┤
│ 3. BỘ KHỞI TẠO      repo mẫu web-starter        (GitHub)     │  file mẫu + script kiểm tra
│ 4. CHECKLIST NGÀY 0 docs/NGAY-0.md              (trong 3)    │  chốt gì trước khi code
├──────────────────────────────────────────────────────────────┤
│ DỰ ÁN MỚI           repo mới + project Claude mới            │  quyết định riêng của dự án
└──────────────────────────────────────────────────────────────┘
```

| Lớp | Đi theo bạn sang dự án mới bằng cách | Đổi khi nào |
| --- | --- | --- |
| Skill quy trình | Có sẵn trong tài khoản Claude | Hiếm khi đổi |
| Skill sổ tay | Có sẵn trong tài khoản Claude sau khi bấm **Save** trên thẻ đề xuất | Khi một bài học lặp lại ở dự án thứ 2 |
| Repo mẫu | GitHub → *Use this template* | Khi sửa script hoặc file mẫu |
| Dự án mới | Tạo mới mỗi lần | Liên tục |

**Thuật ngữ:**
- **Skill:** gói hướng dẫn mà Claude tự nạp khi gặp đúng loại việc. Bạn không phải dán lại mỗi lần.
- **Template repository (repo mẫu):** repo GitHub được đánh dấu "mẫu". Bấm *Use this template* là ra một repo mới có sẵn mọi file, lịch sử commit sạch.

---

## 2. Cài đặt — làm MỘT lần

### Bước 1 · Lưu skill sổ tay — ✅ đã xong 01/10

- **Đã làm:** skill `so-tay-dung-web` đã được lưu vào tài khoản. Bản sao nằm ở `docs/_claude/so-tay-dung-web.SKILL.md` để tham khảo hoặc khôi phục.
- **Vì sao cần:** chưa lưu thì dự án mới không có sổ tay.
- **Kiểm sao:** mở một chat mới, gõ `/so-tay` thì thấy skill hiện ra.

### Bước 2 · Tạo repo mẫu `web-starter` trên GitHub

1. Giải nén `web-starter.zip`. File nằm trong thư mục `baika-website\Claude outputs\` trên máy bạn.
2. GitHub → **New repository**:
   - Owner: `baikavn-bot`
   - Tên: `web-starter`
   - Chế độ: **Private**. Đây là tài sản nội bộ, không có lý do để công khai.
   - **Không** tick "Add README".
3. Ở trang repo trống, bấm **uploading an existing file** → kéo thả **toàn bộ nội dung** thư mục đã giải nén (kể cả `.gitignore`) → **Commit changes**.
   - ⚠️ Kéo thả trên web có thể bỏ sót file bắt đầu bằng dấu chấm. Thiếu `.gitignore` thì nhờ Claude đẩy giúp bằng git, hoặc tạo tay qua *Add file → Create new file*.
4. **Settings → General** → tick **Template repository**.

- **Vì sao:** từ đây, mọi dự án mới bắt đầu với cùng luật, cùng script kiểm tra, cùng khung spec.
- **Kiểm sao:** bấm **New repository**, thấy `baikavn-bot/web-starter` trong ô *Repository template*.

### Bước 3 · (Tuỳ chọn) Cập nhật project BAIKA hiện tại

Dự án BAIKA đã có `CLAUDE.md` và `docs/` riêng, không cần dùng repo mẫu. Chỉ nên chép `tools/kiem-tra/` vào repo BAIKA, để các phiên sau dùng script chuẩn thay vì viết lại.

---

## 3. Mỗi dự án mới — 8 bước

| # | Làm gì | Làm thế nào | Vì sao | Biết là xong khi |
| --- | --- | --- | --- | --- |
| 1 | Tạo repo | GitHub → New repository → *Repository template*: `web-starter`. Chọn Private hoặc Public **và ghi ai chốt** | Có sẵn `CLAUDE.md`, `docs/`, `tools/` | Repo mới có thư mục `tools/kiem-tra` |
| 2 | Tạo project Claude | Claude → New project → dán `docs/_claude/project-instructions-mau.md` vào ô Instructions, điền `<<...>>` | Claude biết cách làm việc với bạn ngay từ tin nhắn đầu | Chat thử: Claude hỏi "đang làm luồng nào?" |
| 3 | Nối thư mục | Clone repo về máy (GitHub Desktop → Clone), rồi trong Claude desktop → **Add folder** | Claude đọc và ghi thẳng repo trên máy bạn | Claude liệt kê được file trong repo |
| 4 | **Ngày 0** | Gõ: **"Chạy checklist ngày 0 cho dự án <tên>"** | Chốt những thứ BAIKA phải sửa giữa chừng | Mọi ô trong `docs/NGAY-0.md` đã tick hoặc ghi "chờ <ai>". `CLAUDE.md` hết `<<...>>` |
| 5 | Chuẩn bị Figma | Token trước → page `Component` → page `UI` chia Desktop / Tablet / Mobile. **Chốt chữ desktop rồi mới nhân bản ra tablet/mobile** | Tránh lệch chữ giữa các khổ màn và tránh frame nháp | Không còn frame nháp hay bản cũ cạnh bản thật |
| 6 | Khởi động quy trình | Gõ: **"/website-production-agent bắt đầu"** | Skill dẫn qua Discovery → khoá spec → kế hoạch | Có spec `LOCKED` và kế hoạch được duyệt |
| 7 | Mỗi trang | Chép `docs/_mau-trang/` thành `docs/<ten-trang>/`, điền từ Figma. Lệch chữ → bảng `L1…` | Một nguồn chân lý cho mỗi trang | `SPEC-MASTER.md` §6 không còn câu hỏi chặn khối đang dựng |
| 8 | Mỗi lượt dựng | Claude dựng → chạy `tools/kiem-tra` → chụp ảnh → commit. **Bạn** `git push` → duyệt link Preview | Bắt lỗi trước khi lên site thật | Link Preview đúng như Figma ở cả 3 khổ màn |

---

## 4. Câu lệnh gọi nhanh

| Gõ | Claude làm gì |
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
            Có ──► "Cập nhật sổ tay" ──► bạn duyệt thẻ đề xuất ──► skill so-tay-dung-web
            Không ─► để yên ở dự án đó
Sửa script / file mẫu ──► commit vào repo web-starter (dự án sau tự có)
```

**Vì sao không đưa mọi bài học vào skill ngay:** một lần gặp chưa đủ chứng minh đó là luật chung. Ví dụ "không có `#FFFFFF`" là luật riêng của BAIKA; dự án khác có thể có màu trắng trong bộ token. Đưa vội vào skill thì sẽ ép dự án sau theo luật của dự án trước.

---

## 6. Không mang theo

- Màu, chữ, nội dung, giá của BAIKA.
- Các quyết định `DEC-xxx` và ngoại lệ `VD-xxx` của BAIKA.
- Danh tính commit, domain, quyền truy cập: mỗi dự án đặt riêng ở Ngày 0.
- API key, token, mật khẩu: không bao giờ nằm trong file nào.

---

## 7. Giới hạn cần biết

- **Skill không tự học giữa các phiên.** Kinh nghiệm chỉ được giữ lại khi ghi thành file: `CLAUDE.md`, `docs/`, project docs hoặc skill. Phiên chat kết thúc là máy ảo của Claude bị xoá, kể cả các script chưa lưu ra ngoài.
- **Script kiểm tra cần Playwright** (thư viện điều khiển trình duyệt). Máy của Claude có sẵn. Muốn tự chạy trên máy bạn thì cài một lần (`npm i -g playwright`), không bắt buộc.
- **Sổ tay hiện mới có kinh nghiệm của một dự án.** Dự án thứ hai sẽ cho biết mục nào thật sự là luật chung.
