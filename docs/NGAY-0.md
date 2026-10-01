# Checklist ngày 0 — chốt trước dòng code đầu tiên

Mỗi dòng dưới đây là một thứ dự án BAIKA phải **sửa giữa chừng**, vì không ai chốt nó từ đầu. Chốt ngay từ đầu thì rẻ; sửa giữa chừng thì đắt.

Mỗi dòng có 3 cột: **chốt cái gì · vì sao phải chốt sớm · ghi vào đâu**. Tick xong thì ghi ngày và người chốt.

---

## A. Con người và quyền

- [ ] **Ai duyệt cái gì.** Ví dụ: nội dung → sếp · thiết kế → designer · kỹ thuật → designer duyệt đề xuất của agent. *Vì sao: không chốt thì mỗi lần lệch là một lần tranh luận lại.* → `docs/<trang>/SPEC-MASTER.md` §2
- [ ] **Ai chạy `git push`, ai giữ quyền Vercel / DNS.** *Vì sao: ở BAIKA, DNS do sếp nắm, nên bước trỏ domain bị kẹt tới phút chót.* → `CLAUDE.md` §9
- [ ] **Trình độ của người làm cùng agent.** Ví dụ: "người mới, cần giải thích thuật ngữ". *Vì sao: agent viết khác hẳn cho người mới so với cho dev.* → project instructions §2

## B. Repo và deploy

- [ ] **Repo public hay private, ai chốt.** Ghi lý do. *Vì sao: ở BAIKA, tài liệu ghi "private" nhưng thực tế public theo ý sếp. Agent sau đọc tài liệu và báo động nhầm.* → `CLAUDE.md` §2
- [ ] **Danh tính commit** (name + email gắn đúng tài khoản GitHub), đặt **cho riêng repo**. *Vì sao: email sai thì Vercel báo "GitHub user not found" và có thể chặn build.* → `CLAUDE.md` §9
- [ ] **`.gitignore` có sẵn** `.env`, `Claude outputs/`, `kiem-tra-anh/`, `dist/`, `node_modules/`. *(Bộ khởi tạo đã có sẵn.)*
- [ ] **Quy ước nhánh.** Ví dụ: trang mới → nhánh riêng → Preview → duyệt → `main`. Cấm force push.
- [ ] **Kế hoạch domain.** Mấy domain, trỏ về trang nào, chung source hay không. *Vì sao: khi landing thứ 2 xuất hiện, BAIKA phải quyết lại kiến trúc.* → `CLAUDE.md` §2

## C. Thiết kế (Figma)

- [ ] **Token có sẵn trong Figma** (màu, chữ, khoảng cách, bo góc, bóng) **trước khi vẽ trang**. *Vì sao: vẽ trước rồi token hoá sau thì phải gắn lại hàng trăm chỗ.*
- [ ] **Luật tổ chức file:** component **chỉ** ở page `Component`. Page `UI` chia section `Desktop` / `Tablet` / `Mobile`. **Không để frame nháp hay bản cũ cạnh bản thật.** *Vì sao: ở BAIKA, agent gặp hai `Text field` trùng tên, hai frame Remote Office và hai bản nháp R4.*
- [ ] **Danh sách breakpoint** (vd. 375 / 768 / 1280). Frame lệch số coi như sót.
- [ ] **Chốt chữ trước, rồi mới nhân bản ra tablet/mobile.** *Vì sao: BAIKA vẽ tablet/mobile trước khi chốt chữ, nên 6 frame mang chữ cũ và chữ rút gọn.*
- [ ] **Khung chứa nội dung dùng auto-layout**, không để chiều cao cố định. *Vì sao: thêm một dòng chú thích là nút bị đẩy tràn khỏi khung.*
- [ ] **Không màu thô, không giá trị ngoài thang.** Ví dụ `#FFFFFF` thô, chữ 100px khi thang chỉ tới 80, khoảng 140.

## D. Nội dung

- [ ] **Một nguồn chữ chính thức** (`spec-noi-dung.md`) và **ai duyệt**.
- [ ] **Con số kinh doanh** (giá, công thức, cam kết thời gian) có người duyệt **có tên**. *Vì sao: ở BAIKA, con số 1,8 triệu và luật chọn gói treo nhiều ngày chờ sếp.*
- [ ] **Điều KHÔNG được hứa với khách** (pháp lý, BHXH, SLA…). → `spec-noi-dung.md` mục "Ranh giới"
- [ ] **Thông tin pháp nhân** đúng hiện hành: địa chỉ sau sáp nhập hành chính, MST.
- [ ] **Dữ liệu demo / file mẫu được đánh dấu rõ là demo.** *Vì sao: ở BAIKA, cả một luồng việc ảo sinh ra từ một khối demo.*

## E. Công cụ của agent

- [ ] Agent **đọc được Figma** (MCP hoặc Dev Mode). Không đọc được thì không dựng.
- [ ] Agent **đọc và ghi được** thư mục repo trên máy người dùng.
- [ ] **Bộ kiểm tra chạy được:** `node tools/kiem-tra/kiem-luat.mjs` ra kết quả.
- [ ] Project Claude có **project instructions** (mẫu: `docs/_claude/project-instructions-mau.md`).
