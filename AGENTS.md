# AGENTS.md — repo `<<TÊN-REPO>>`

*Bản mẫu từ bộ khởi tạo web-starter. Thay mọi chỗ `<<...>>`; xoá dòng này khi xong.*

Hướng dẫn cho mọi agent lập trình (Codex, Cursor, Copilot, Gemini…) làm việc trong repo này.

**Luật của repo nằm ở `CLAUDE.md`.** File đó áp dụng cho **mọi** agent, không riêng Claude. Ở đây không chép lại, để khỏi có hai bản lệch nhau.

## Ai được sửa mã

- Người thực thi duy nhất của repo này: **<<MỘT tên duy nhất — vd. Claude Code trên máy của chủ dự án>>**.
- Mọi agent khác **chỉ đọc và review**: không sửa file, không commit, không push.
- Không xưng tên của agent khác, không ký thay agent khác trong commit hay báo cáo.
- Muốn đổi người thực thi: chủ dự án bàn giao rõ ràng (người cũ dừng và ghi việc dở, người mới xác nhận), rồi sửa tên ở dòng trên.

## Đọc theo thứ tự

1. <<file trạng thái>> — dự án đang ở đâu, cái gì kẹt, làm gì tiếp.
2. `CLAUDE.md` — luật: nền tảng, Figma, token, chất lượng, git, bảo mật.
3. `docs/<trang>/SPEC-MASTER.md` — nếu làm một trang cụ thể.

Có mâu thuẫn giữa file này và `CLAUDE.md` → **`CLAUDE.md` thắng**.
