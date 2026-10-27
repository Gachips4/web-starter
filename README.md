# web-starter — bộ khởi tạo dự án website (agent dựng, designer duyệt)

Rút từ một dự án thật (08–10/2026): website marketing tĩnh, người chịu trách nhiệm là designer không biết code, toàn bộ code do agent viết. Làm việc bằng **Claude Code** (app desktop, tab Code — hoặc dòng lệnh).

| Lớp | Là gì | Ở đâu |
| --- | --- | --- |
| **1. Quy trình** | Các phase từ Figma tới production, cổng duyệt, ai quyết cái gì | Skill `/website-production-agent` (bản sao: `docs/_claude/website-production-agent.SKILL.md`) |
| **2. Sổ tay tình huống** | Triệu chứng → nguyên nhân → xử lý → phòng từ đầu | Skill `/so-tay-dung-web` (bản sao: `docs/_claude/so-tay-dung-web.SKILL.md`) |
| **3. Bộ khởi tạo** | File mẫu + quyền agent + script kiểm tra | **Repo này** |
| **4. Checklist ngày 0** | Những thứ phải chốt trước dòng code đầu tiên | `docs/NGAY-0.md` |

## Có gì trong này

```
CLAUDE.md                          ← luật repo (mẫu, thay <<...>>) — chung cho mọi agent, lên GitHub
AGENTS.md                          ← chỉ trỏ về CLAUDE.md, để Codex và agent khác không tự sinh bản chép sai
.claude/settings.json              ← quyền của agent: được chạy / phải hỏi / bị cấm
.gitignore                         ← đã chặn .env, CLAUDE.local.md, Claude outputs/, kiem-tra-anh/
docs/NGAY-0.md                     ← checklist ngày 0
docs/HUONG-DAN-SU-DUNG.md          ← hướng dẫn đầy đủ: cài một lần + mỗi dự án mới
docs/_mau-trang/                   ← khung 4 file spec — chép thành docs/<ten-trang>/
docs/_claude/claude-home-mau.md    ← mẫu ~/.claude/CLAUDE.md — hồ sơ người làm cùng agent, MỌI dự án
docs/_claude/CLAUDE.local-mau.md   ← mẫu CLAUDE.local.md — ghi chú RIÊNG máy cho dự án này (không lên GitHub)
docs/_claude/*.SKILL.md            ← bản sao 2 skill, để khôi phục
docs/_claude/project-instructions-mau.md  ← (cũ) mẫu cho project claude.ai — chỉ dùng khi không làm bằng Claude Code
tools/kiem-tra/                    ← kiem-luat · kiem-trang · so-anh · chup (đọc README trong đó)
```

**Không có code site.** Stack là quyết định của từng dự án (ghi ở `CLAUDE.md` §2).

## Ba tầng hướng dẫn cho agent — mỗi thứ một chỗ

| File | Nằm ở | Lên GitHub? | Chứa gì |
| --- | --- | --- | --- |
| `~/.claude/CLAUDE.md` | Thư mục người dùng | Không | **Người làm cùng agent**: xưng hô, trình độ, cách trình bày, quy ước định danh. Dùng cho **mọi** dự án |
| `CLAUDE.md` | Gốc repo | **Có** | **Luật của repo**: stack, token, nguồn chân lý, git, chất lượng. Mọi agent đọc |
| `CLAUDE.local.md` | Gốc repo | Không (`.gitignore`) | **Riêng máy, riêng dự án**: tên người trong dự án, việc đang dở, thứ không muốn công khai |

Hai tầng khác nhau → luật của dự án (`CLAUDE.md`, `CLAUDE.local.md`) thắng hồ sơ chung.

## Ai làm gì với git

| Việc | Ai |
| --- | --- |
| Sửa code, tài liệu, chạy kiểm tra, commit | Agent |
| `git push` **nhánh riêng** | Agent — dùng phiên đăng nhập đã lưu trên máy, không thấy mật khẩu |
| Mở / duyệt / **gộp Pull Request** vào `main` | **Người** |
| Push thẳng `main`, force push, xoá nhánh trên GitHub | **Không ai** — `.claude/settings.json` chặn; nên bật thêm khoá nhánh `main` trên GitHub |

## Bắt đầu dự án mới — tóm tắt

1. GitHub → **New repository** → *Repository template*: `web-starter`.
2. Clone repo mới về máy → mở thư mục đó trong **Claude Code**.
3. Lần đầu dùng máy này: tạo `~/.claude/CLAUDE.md` từ `docs/_claude/claude-home-mau.md`.
4. Tạo `CLAUDE.local.md` ở gốc repo từ `docs/_claude/CLAUDE.local-mau.md`.
5. Nói: **«Chạy checklist ngày 0»** → agent cùng bạn đi qua `docs/NGAY-0.md` và điền `CLAUDE.md`.
6. Nói: **«/website-production-agent bắt đầu»** → Discovery → khoá spec → dựng.

Chi tiết từng bước: `docs/HUONG-DAN-SU-DUNG.md`.
