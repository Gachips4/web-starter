# web-starter — bộ khởi tạo dự án website (agent dựng, designer duyệt)

Rút từ dự án BAIKA (08–10/2026). Dùng kèm hai skill:

| Lớp | Là gì | Ở đâu |
| --- | --- | --- |
| **1. Quy trình** | Các phase từ Figma tới production, cổng duyệt, ai quyết cái gì | Skill `/website-production-agent` |
| **2. Sổ tay tình huống** | Triệu chứng → nguyên nhân → xử lý → phòng từ đầu | Skill `/so-tay-dung-web` |
| **3. Bộ khởi tạo** | File mẫu + script kiểm tra | **Repo này** |
| **4. Checklist ngày 0** | Những thứ phải chốt trước dòng code đầu tiên | `docs/NGAY-0.md` |

## Có gì trong này

```
CLAUDE.md                          ← luật repo (mẫu, thay <<...>>)
.gitignore                         ← đã chặn .env, Claude outputs/, kiem-tra-anh/
docs/NGAY-0.md                     ← checklist ngày 0
docs/_mau-trang/                   ← khung 4 file spec — chép thành docs/<ten-trang>/
docs/_claude/project-instructions-mau.md  ← dán vào project Claude mới
tools/kiem-tra/                    ← kiem-luat · kiem-trang · so-anh · chup (đọc README trong đó)
```

**Không có code site.** Stack là quyết định của từng dự án. Nếu dùng lại Astro giống BAIKA, nhờ Claude: *"dựng khung Astro + tokens.css theo cấu trúc repo BK.-Web-Update-Sep-2026"*.

## Bắt đầu dự án mới — tóm tắt

1. GitHub → **New repository** → *Repository template*: `web-starter`.
2. Tạo project Claude mới → dán `docs/_claude/project-instructions-mau.md` (đã điền).
3. Kết nối thư mục repo với Claude desktop.
4. Nói: **"Chạy checklist ngày 0"** → Claude cùng bạn đi qua `docs/NGAY-0.md` và điền `CLAUDE.md`.
5. Nói: **"/website-production-agent bắt đầu"** → Discovery → khoá spec → dựng.

Hướng dẫn đầy đủ: project Claude BAIKA → `claude/huong-dan-khoi-tao-du-an-web.md`.
