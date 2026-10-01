---
name: so-tay-dung-web
description: Sổ tay tình huống khi dựng website từ Figma với agent và designer không phải dev — lỗi đã gặp, cách xử lý, checklist ngày 0. Dùng kèm website-production-agent.
---

# Sổ tay dựng web — kinh nghiệm thực chiến

Skill này **không thay** `/website-production-agent`. Hai skill chia việc như sau:

| Skill | Trả lời câu hỏi |
| --- | --- |
| `/website-production-agent` | **Làm theo thứ tự nào?** Các phase, cổng duyệt, ai quyết cái gì |
| `/so-tay-dung-web` *(skill này)* | **Gặp chuyện X thì làm gì? Phòng từ đầu thế nào?** |

Nguồn: dự án BAIKA (08–10/2026). Đặc điểm của dự án đó: site tĩnh Astro + Vercel, người duyệt là designer không biết code, công ty không có dev, agent viết code và người dùng tự chạy `git push`.

## Khi nào dùng

- **Bắt đầu dự án mới.** Chạy §1 "Ngày 0" trước mọi thứ khác.
- **Trước khi báo "xong"** một lượt dựng. Đối chiếu với §3 "Kiểm tra".
- **Khi gặp lỗi hoặc tình huống lạ.** Tra §2, theo cột *Triệu chứng*.
- **Cuối dự án, hoặc sau khi vừa vấp một lỗi mới.** Làm theo §5 "Ghi bài học".

## 0. Bộ khởi tạo (repo mẫu)

Dự án mới nên tạo từ **repo mẫu `web-starter`** (GitHub → New repository → Repository template). Repo mẫu có sẵn:

- `CLAUDE.md` mẫu.
- `docs/NGAY-0.md`.
- `docs/_mau-trang/` (khung 4 file spec).
- `docs/_claude/project-instructions-mau.md`.
- `tools/kiem-tra/` (`kiem-luat` · `kiem-trang` · `so-anh` · `chup` · `tao-font-css`).
- `.gitignore`.

Repo chưa có `tools/kiem-tra/` → đề nghị người dùng chép từ repo mẫu, **không** viết lại từ trí nhớ.

---

## 1. Ngày 0 — chốt trước dòng code đầu tiên

Đi qua `docs/NGAY-0.md` **cùng người dùng**, mỗi nhóm một lượt, không dồn hết vào một tin nhắn. Nếu repo chưa có file đó, dùng bản rút gọn dưới đây:

- **Con người:**
  - Ai duyệt nội dung, thiết kế, kỹ thuật, con số kinh doanh.
  - Ai chạy `git push`, ai giữ quyền Vercel và DNS.
  - Trình độ của người làm cùng agent.
- **Repo:**
  - Public hay private, **ai chốt và vì sao**.
  - Danh tính commit đặt cho riêng repo, email phải gắn tài khoản GitHub.
  - Quy ước nhánh.
  - Kế hoạch domain.
- **Figma:**
  - Token có trước khi vẽ trang.
  - Component chỉ nằm ở page `Component`. Page `UI` chia section Desktop / Tablet / Mobile.
  - Không để frame nháp cạnh bản thật.
  - **Chốt chữ trước khi nhân bản ra tablet/mobile.**
  - Khung chứa nội dung dùng auto-layout.
- **Nội dung:**
  - Một file nguồn chữ.
  - Người duyệt con số có tên.
  - Danh sách điều không được hứa.
  - Thông tin pháp nhân đúng hiện hành.
  - Dữ liệu demo được dán nhãn rõ.
- **Công cụ:**
  - Agent đọc được Figma.
  - Agent ghi được thư mục repo.
  - Bộ kiểm tra chạy được.

---

## 2. Tình huống đã gặp — tra theo triệu chứng

### 2.1 Git · commit · deploy

| Triệu chứng | Nguyên nhân | Xử lý | Phòng từ đầu |
| --- | --- | --- | --- |
| Vercel báo **"GitHub user not found"**, "Vercel Account: Unavailable". Repo private có thể **không build** | Commit bằng email không gắn tài khoản GitHub, thường do lệnh `git -c user.email=... commit` | Thêm một commit (có thể rỗng) bằng đúng danh tính. Vercel luôn dựng bản mới nhất. **Không** viết lại lịch sử | Đặt `git config user.name/email` cho riêng repo. ⛔ cấm `git -c user.*`. Trước khi báo push, kiểm `git log --format='%an <%ae>' -1` |
| `fatal: Unable to create .git/index.lock: File exists` | Lệnh git trước bị ngắt giữa chừng | Xoá `.git/index.lock`. Trên máy người dùng có thể phải xin quyền xoá | — |
| `Author identity unknown` | Máy chưa đặt danh tính | Đặt **cho repo**, không đặt toàn máy | Mục danh tính trong Ngày 0 |
| Muốn "dọn lịch sử" bằng `push --force` | — | ⛔ Không. Thêm commit sửa | Ghi lệnh cấm vào `CLAUDE.md` |
| `git status` lẫn ảnh chụp, file nháp | Agent để file làm việc trong repo | Thêm vào `.gitignore`. `git add` **từng file** | `.gitignore` mẫu chặn sẵn `Claude outputs/`, `kiem-tra-anh/` |
| Người dùng hỏi "push xong thì site thật có đổi không?" | Chưa hiểu nhánh và Preview | Giải thích: push nhánh phụ → Vercel dựng **Preview** (link tạm). Chỉ `main` lên site thật | Trang mới luôn làm trên nhánh riêng, đặt `noindex` |

### 2.2 Chuyển file giữa máy người dùng và máy của agent

| Triệu chứng | Nguyên nhân | Xử lý | Phòng |
| --- | --- | --- | --- |
| File ghi xuống máy người dùng **là bản cũ** | Ghi lại vào cùng đường dẫn tạm, bị lấy bản đệm cũ | Ghi vào **thư mục tạm mới** mỗi lần | Luôn so `md5sum` hai đầu trước khi `git apply` / commit |
| Sửa trên máy agent rồi đè lên bản người dùng vừa sửa | Hai bản lệch nhau | Đọc lại bản trên máy người dùng trước khi ghi | Làm thẳng trên máy người dùng khi có shell ở đó. Chuyển file chỉ khi bắt buộc |
| Agent không build được trên máy người dùng | Thiếu `node_modules` | Build và kiểm trên máy agent. Chuyển **bản vá (diff)**, không chuyển cả file | So hash các file trong commit ở hai đầu sau khi apply |

### 2.3 Figma

| Triệu chứng | Nguyên nhân | Xử lý | Phòng |
| --- | --- | --- | --- |
| Node ghi trong spec trả về **null** | Designer nhân bản hoặc vẽ lại frame, ID đổi hết | Tìm frame theo tên trên page `UI`, cập nhật **mọi** node ID trong spec, ghi nhật ký Figma | Spec ghi rõ "node có thể đổi — mở kiểm trước khi dựng" |
| Có **hai frame cùng trang** (bản cũ và bản mới), hai component trùng tên | File chưa dọn | Hỏi bản nào đúng. Ghi bản sai vào "Không dựng theo" | Luật Ngày 0: không để nháp cạnh bản thật. Đề nghị xoá hoặc đổi tên `(CŨ)` |
| Tablet/mobile **chữ khác desktop** (rút gọn, chữ cũ) | Vẽ trước khi chốt chữ, hoặc rút gọn cho vừa ô hẹp | Áp chữ **đã chốt** sang mọi khổ. Chữ rút gọn **chưa chốt** → bảng lệch `Lx`, hỏi | Một bộ chữ cho mọi khổ. Ô quá hẹp thì sửa bố cục (lề ô, nhãn đặt trên), không rút chữ. **Đo** chữ rộng bao nhiêu px so với chỗ trống |
| Thêm chữ vào frame thì **nút bị đẩy ra ngoài** | Khung cao cố định, không auto-layout | Nới khung, báo designer | Khung chứa nội dung dùng auto-layout |
| Màu `#FFFFFF` thô, chữ 100px, khoảng 140 | Ngoài token, ngoài thang | Code dùng token gần nhất **chỉ khi đã có quyết định**. Không thì ghi "dừng lại hỏi" | Ngày 0: token trước khi vẽ |
| Desktop dùng variant `Type=Mobile` | Kéo nhầm instance | Hỏi có cố ý không | — |
| Thay đổi hàng loạt báo "thành công, 0 lỗi" nhưng kết quả sai | Đếm số không chứng minh kết quả | **Chụp ra nhìn** sau mỗi lượt ghi hàng loạt | — |
| Thao tác theo tên node bắt nhầm cả khối lớn | Vòng lặp đi ngược cây quá xa | Hoàn tác, kiểm kích thước | Kiểm **kích thước kết quả** trước khi ghi |
| Kết luận "không có token cho X" nhưng thật ra có | Chỉ đọc giá trị, không đọc styleId/biến | Đọc cả hai | — |
| Đổi tên trục variant làm gãy instance | — | — | Ghi lại instance trước → đổi cả bộ một lượt → đối chiếu lại sau |

### 2.4 Nội dung & phạm vi

| Triệu chứng | Nguyên nhân | Xử lý | Phòng |
| --- | --- | --- | --- |
| Xuất hiện "yêu cầu" không ai đưa ra | Đọc **dữ liệu demo** trong file thành yêu cầu | Truy nguồn. Không có người dùng xác nhận thì xoá | Dán nhãn demo. Mọi kết luận ghi rõ **đã xác minh** hay **suy luận** |
| Người dùng đưa mã màu hay ảnh, agent "cải tiến" thành thứ khác | Hiểu "cái này" thành "kiểu như này" | Làm lại đúng y thứ được đưa | Hiện vật đưa **làm chỉ thị** → sao chép chính xác. Câu hỏi làm rõ **phải có lựa chọn "đúng y như tôi đưa"** |
| Agent bê nguyên nội dung cũ đã sai | Áp nhầm luật sao chép cho vật liệu đang audit | Đề xuất cắt, kèm bằng chứng và "cắt thì mất gì" | Phép thử: đây là **chỉ thị** hay **vật liệu để soi**? |
| Figma và spec nói hai chữ khác nhau | Hai nguồn | **Không tự chọn.** Bảng mã `L1…`, người duyệt trả F / N / chữ khác / bỏ | Luật lệch trong `SPEC-MASTER.md` |
| Trang hứa điều nhạy cảm (BHXH, pháp lý, SLA) | — | Hỏi người duyệt nội dung | Mục "Ranh giới nội dung" trong spec, câu 🔒 giữ nguyên văn |

### 2.5 Kiểm tra & hồi quy

| Triệu chứng | Nguyên nhân | Xử lý | Phòng |
| --- | --- | --- | --- |
| So ảnh báo **khác** ở trang không đụng tới | Ảnh `loading="lazy"` chưa tải lúc chụp | Cuộn hết trang, ép ảnh tải ngay, đợi font và ảnh rồi mới chụp | Dùng `tools/kiem-tra/so-anh.mjs` (đã xử lý sẵn) |
| Ảnh chụp có chữ sai font, đo tràn sai | Máy agent bị chặn Google Fonts | Nhúng font từ gói `@fontsource` (`tao-font-css.mjs` → `FONT_CSS`) | Biết trước điều này ở máy ảo |
| Sửa component chung, vỡ trang khác | Không so lại | `so-anh.mjs` giữa bản trước và sau | Luật: đụng component chung là phải so **mọi** trang |
| Trang thiếu `<h1>` mà không ai biết | Script cũ chỉ kiểm vài trang | `kiem-trang.mjs` tự tìm **mọi** trang trong `dist/` | — |
| Grep luật báo vi phạm ở **chú thích** | Grep không bỏ comment | `kiem-luat.mjs` bỏ comment trước khi tìm | — |

### 2.6 Kiến trúc

| Tình huống | Hướng đã chốt ở BAIKA |
| --- | --- |
| Landing mới chạy domain khác | **Chung một source**, gắn domain bằng rewrite theo host (Vercel). Không tách repo chỉ vì khác domain. Tên gọi: *multi-site on a single codebase* |
| Công cụ trên trang cần lưu dữ liệu hoặc cần agent | Tách theo **bản chất**, không theo domain. Phần giao diện ở trang; phần xử lý ở backend riêng (repo, máy chạy, kho riêng), nối bằng API. Repo website **không** chứa logic agent hay kho dữ liệu |
| Công cụ chỉ tính toán | Để trong trang, JS nhỏ tại chỗ, không framework. Mọi tham số ở một chỗ. Có ca kiểm thử |
| Trang đang dựng dở | `noindex` + nhánh riêng + Preview |
| Repo public hay private | **Hỏi ai chốt** trước khi báo động. Ở BAIKA, public là chủ ý của sếp, còn tài liệu thì lạc hậu |

---

## 3. Trước khi báo "xong"

1. `pnpm build` sạch.
2. `node tools/kiem-tra/kiem-luat.mjs` sạch.
3. `pnpm preview`, rồi `node tools/kiem-tra/kiem-trang.mjs`: mọi dòng `OK` (không tràn ngang, đúng 1 `h1`, ảnh có `alt`, không lỗi JS).
4. Đụng component chung thì chạy `so-anh.mjs` với bản trước khi sửa. Trang không đụng tới phải `GIONG HET`.
5. `chup.mjs` trang vừa sửa ở 375 / 768 / 1280, **mở ảnh ra nhìn** cạnh Figma.
6. Spec đã sửa **cùng commit** với code.
7. Danh tính commit đúng. Chỉ `git add` từng file đã đọc.
8. Báo cáo ghi rõ: cái gì **đã chạy thật**, cái gì suy luận, cái gì không chạy được.

---

## 4. Làm việc với người duyệt không phải dev

- Giải thích thuật ngữ ngay lần đầu dùng, lấy ví dụ trong chính dự án.
- Nhiều chỗ cần chốt → **bảng mã** (`L1`, `L2`… / `D1`…), mỗi dòng kèm đề xuất của agent. Người duyệt trả lời từng dòng: **F / N / chữ khác / bỏ**. Ở BAIKA, cách này chốt được 13 chỗ lệch trong một tin nhắn.
- Thứ người dùng phải tự làm (`git push`, bấm quyền) → đưa **đúng lệnh** để dán, nói rõ **kết quả trông thế nào là xong**.
- Tài liệu dài → hai bản: `.md` (nguồn) và trang nhìn (artifact). Sửa `.md` trước, publish lại **đúng link cũ**.
- Phát hiện điều đáng lo → nói, **kèm mức chắc chắn**. Chưa kiểm thì nói là chưa kiểm.
- Người dùng sắp làm sai → cản, nói lý do, đưa phương án thay thế. Không im lặng làm cho xong.

---

## 5. Ghi bài học — để sổ tay này lớn dần

1. Vấp một lỗi mới → ghi ngay vào `CLAUDE.md` §"Bài học đã trả giá" **của dự án đó**, kèm bằng chứng (commit, node, ảnh).
2. **Chỉ đưa vào skill này** khi lỗi đó gặp lại ở **dự án thứ hai**, hoặc chắc chắn không phụ thuộc dự án (lệnh git, cách chụp ảnh). Một dự án đơn lẻ chưa đủ để thành luật chung. Đây cũng là luật của `/website-production-agent`.
3. Cập nhật skill → đề xuất bản `SKILL.md` đầy đủ để người dùng duyệt, không sửa lén.
4. **Không mang sang dự án khác:** màu, nội dung, quyết định DEC-xxx, ngoại lệ đã chấp nhận riêng của dự án cũ.
