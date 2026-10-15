# Checklist ngày 0 — chốt trước dòng code đầu tiên

Mỗi dòng dưới đây là một thứ dự án gốc phải **sửa giữa chừng**, vì không ai chốt nó từ đầu. Chốt ngay từ đầu thì rẻ; sửa giữa chừng thì đắt.

Mỗi dòng có 3 cột: **chốt cái gì · vì sao phải chốt sớm · ghi vào đâu**. Tick xong thì ghi ngày và người chốt.

---

## A. Con người và quyền

- [ ] **Ai duyệt cái gì.** Ví dụ: nội dung → sếp · thiết kế → designer · kỹ thuật → designer duyệt đề xuất của agent. *Vì sao: không chốt thì mỗi lần lệch là một lần tranh luận lại.* → `docs/<trang>/SPEC-MASTER.md` §2
- [ ] **Ai push, ai gộp, ai giữ quyền hosting / DNS.** Mặc định của bộ này: agent push **nhánh riêng**, người **gộp Pull Request**, không ai push `main`. *Vì sao: ở dự án gốc, DNS do sếp nắm, nên bước trỏ domain bị kẹt tới phút chót.* → `CLAUDE.md` §9
- [ ] **Trình độ và cách làm việc của người làm cùng agent.** Ví dụ: "người mới, cần giải thích thuật ngữ". *Vì sao: agent viết khác hẳn cho người mới so với cho dev.* → `~/.claude/CLAUDE.md` (mẫu: `docs/_claude/claude-home-mau.md`)
- [ ] **Định danh của phiên agent** theo mẫu `<tên> - <phạm vi> - <dự án> - <vai>` và **phạm vi** của dự án (công ty / cá nhân / khách). *Vì sao: nhiều dự án chạy song song trên một máy — không có phạm vi thì dễ dùng nhầm tài khoản, tài liệu của dự án này cho dự án khác.* → `CLAUDE.local.md`

## B. Repo và deploy

- [ ] **Repo public hay private, ai chốt.** Ghi lý do. *Vì sao: ở dự án gốc, tài liệu ghi "private" nhưng thực tế public theo ý sếp. Agent sau đọc tài liệu và báo động nhầm.* → `CLAUDE.md` §2
- [ ] **Danh tính commit** (name + email gắn đúng tài khoản GitHub sở hữu repo), **người tự đặt cho riêng repo** — agent không chạy `git config`. *Vì sao: email sai thì Vercel báo "GitHub user not found" và có thể chặn build; đặt toàn máy thì dễ commit nhầm tên tài khoản của dự án khác.* → `CLAUDE.md` §9 · lệnh mẫu: `docs/HUONG-DAN-SU-DUNG.md` §3
- [ ] **`.gitignore` có sẵn** `.env`, `CLAUDE.local.md`, `Claude outputs/`, `kiem-tra-anh/`, `dist/`, `node_modules/`. *(Bộ khởi tạo đã có sẵn.)*
- [ ] **Quyền của agent** — `.claude/settings.json` (được chạy / phải hỏi / bị cấm). *(Bộ khởi tạo đã có bản mẫu; sửa đường dẫn `tokens.css`, `vercel.json` nếu dự án khác.)*
- [ ] **Quy ước nhánh.** Ví dụ: trang mới → nhánh riêng → Preview → duyệt → Pull Request → `main`. Tên nhánh không dấu, nối gạch ngang. Cấm force push.
- [ ] **Khoá nhánh `main` trên GitHub** (chỉ gộp qua Pull Request, kiểm tra tự động phải xanh). *Vì sao: danh sách cấm trong `settings.json` so theo chữ đầu lệnh, không chặn được mọi cách viết — khoá trên GitHub mới là lớp chắc chắn.*
- [ ] **Kế hoạch domain.** Mấy domain, trỏ về trang nào, chung source hay không. *Vì sao: khi landing thứ 2 xuất hiện, dự án gốc phải quyết lại kiến trúc.* → `CLAUDE.md` §2

## C. Thiết kế (Figma)

- [ ] **Token có sẵn trong Figma** (màu, chữ, khoảng cách, bo góc, bóng) **trước khi vẽ trang**. *Vì sao: vẽ trước rồi token hoá sau thì phải gắn lại hàng trăm chỗ.*
- [ ] **Luật tổ chức file:** component **chỉ** ở page `Component`. Page `UI` chia section `Desktop` / `Tablet` / `Mobile`. **Không để frame nháp hay bản cũ cạnh bản thật.** *Vì sao: ở dự án gốc, agent gặp hai `Text field` trùng tên, hai frame Remote Office và hai bản nháp R4.*
- [ ] **Danh sách breakpoint** (vd. 375 / 768 / 1280). Frame lệch số coi như sót.
- [ ] **Chốt chữ trước, rồi mới nhân bản ra tablet/mobile.** *Vì sao: dự án gốc vẽ tablet/mobile trước khi chốt chữ, nên 6 frame mang chữ cũ và chữ rút gọn.*
- [ ] **Khung chứa nội dung dùng auto-layout**, không để chiều cao cố định. *Vì sao: thêm một dòng chú thích là nút bị đẩy tràn khỏi khung.*
- [ ] **Không màu thô, không giá trị ngoài thang.** Ví dụ `#FFFFFF` thô, chữ 100px khi thang chỉ tới 80, khoảng 140.

## D. Nội dung

- [ ] **Một nguồn chữ chính thức** (`spec-noi-dung.md`) và **ai duyệt**.
- [ ] **Con số kinh doanh** (giá, công thức, cam kết thời gian) có người duyệt **có tên**. *Vì sao: ở dự án gốc, con số 1,8 triệu và luật chọn gói treo nhiều ngày chờ sếp.*
- [ ] **Điều KHÔNG được hứa với khách** (pháp lý, BHXH, SLA…). → `spec-noi-dung.md` mục "Ranh giới"
- [ ] **Thông tin pháp nhân** đúng hiện hành: địa chỉ sau sáp nhập hành chính, MST.
- [ ] **Dữ liệu demo / file mẫu được đánh dấu rõ là demo.** *Vì sao: ở dự án gốc, cả một luồng việc ảo sinh ra từ một khối demo.*

## E. Công cụ của agent

- [ ] Thư mục repo **mở trong Claude Code** (app desktop → tab Code → chọn thư mục).
- [ ] Agent **đọc được Figma** (Figma MCP đã đăng nhập). Không đọc được thì không dựng.
- [ ] **Hai skill có trong tài khoản:** gõ `/` thấy `website-production-agent` và `so-tay-dung-web` (thiếu thì cài lại từ bản sao trong `docs/_claude/`).
- [ ] **`~/.claude/CLAUDE.md`** và **`CLAUDE.local.md`** đã điền.
- [ ] **Máy đủ công cụ:** Node đúng bản `.nvmrc` · package manager đúng bản · `node tools/kiem-tra/kiem-luat.mjs` ra kết quả.
- [ ] **Lần push đầu:** cửa sổ đăng nhập GitHub hiện ra → **người** đăng nhập bằng **đúng tài khoản sở hữu repo** (agent không nhìn thấy mật khẩu).
