# Mẫu `CLAUDE.local.md` — riêng máy, riêng dự án

*Chép file này ra GỐC repo, đặt tên `CLAUDE.local.md`, thay `<<...>>`, xoá dòng này. `.gitignore` đã chặn file đó — nó KHÔNG lên GitHub.*
*Repo công khai? Thứ không muốn người ngoài đọc (tên người, việc nội bộ) để ở đây, không để trong `CLAUDE.md`. Không ghi mật khẩu, key, token — kể cả ở đây.*

---

# CLAUDE.local.md — riêng repo `<<TÊN-REPO>>` (KHÔNG đẩy lên GitHub)

Cách làm việc chung (xưng hô, mentor, định danh…) nằm ở `~/.claude/CLAUDE.md`. File này chỉ giữ phần **riêng của dự án**.

Đọc mỗi phiên: `~/.claude/CLAUDE.md` → **file này** → `CLAUDE.md` (luật repo) → <<file trạng thái, vd. TRANG-THAI.md>> → <<danh sách việc chờ, vd. docs/viec-cho.md>>.

**Định danh trong repo này:** **[<<TÊN-AGENT>> - <<phạm vi>> - <<dự án>> - <<vai>>]**

## 1. Người trong dự án

- <<Ai quyết nội dung, giá, ra mắt>>
- <<Ai duyệt thiết kế / kỹ thuật>>
- <<Agent khác cùng làm repo (nếu có) — cũng phải qua Pull Request>>

## 2. Danh sách việc tạm rời

Ở <<đường dẫn>>. Repo công khai → ghi trung tính; chi tiết nhạy cảm để <<chỗ riêng trên máy>>.

## 3. Git

- Agent **tạo nhánh riêng → commit → `git push -u origin <nhánh>`**. <<TÊN>> **mở/duyệt/gộp PR**.
- **Không bao giờ push `main`**, không force push, không xoá nhánh trên GitHub.
- Danh tính commit đặt **riêng cho repo này** (<<tên>> · <<email noreply của tài khoản GitHub sở hữu repo>>). Agent **không** đổi `git config`.
- `git add` từng file, đọc `git status` trước.
- Báo xong việc = tên nhánh · **link TẠO PR** (ghi rõ «cần bấm Create pull request») · thứ tự merge · cần kiểm gì trên bản preview.
- <<Nhánh nào push là cập nhật ngay trang khách đang xem → hỏi trước khi push>>

## 4. Kiểm trước khi báo «xong»

<<Lệnh build>> (0 lỗi) → `node tools/kiem-tra/kiem-luat.mjs` → <<bài kiểm riêng>> → **chụp màn và MỞ RA NHÌN** ở <<các khổ, vd. 1280 và 375>>.
Máy: <<Node x · pnpm y>>.

## 5. An toàn riêng dự án

- <<Hệ thống chỉ được đọc, không được ghi>>
- <<Dữ liệu không được đưa vào repo>>

## 6. Nguồn chân lý nhanh

- Figma `<<FILE-KEY>>` — page `Component` `<<node>>` · page `UI` `<<node>>`.
- Repo: `<<org/repo>>`. Thư mục máy: `<<đường dẫn>>`.
