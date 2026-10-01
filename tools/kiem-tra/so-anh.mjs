// SO ẢNH — trả lời câu "sửa chỗ A có làm vỡ chỗ B không?"
// Chụp TOÀN TRANG ở bản CŨ (OLD) và bản MỚI (BASE), so TỪNG PIXEL.
//   GIONG HET → trang đó không đổi gì.
//   KHAC      → lưu cả hai ảnh vào thư mục OUT để MỞ RA NHÌN. Khác chưa chắc là
//               sai (có thể đúng là chỗ mình vừa sửa) — nhưng phải nhìn mới biết.
//
// Cách dựng bản CŨ để so (một lần mỗi lượt kiểm):
//   git worktree add ../ban-cu HEAD      # bản cũ = commit trước khi sửa
//   cd ../ban-cu && pnpm install && pnpm build && pnpm preview --port 4322
//   (cửa sổ khác, ở repo chính)  pnpm build && pnpm preview --port 4321
//   node tools/kiem-tra/so-anh.mjs
//   Xong: git worktree remove ../ban-cu
import fs from 'node:fs';
import { loadChromium, pages, widths, openStable, BASE, OLD, OUT, safe } from './_chung.mjs';

const b = await loadChromium();
fs.mkdirSync(OUT, { recursive: true });
let khac = 0;
for (const duong of pages()) for (const w of widths('375,1280')) {
  const shots = [];
  for (const goc of [OLD, BASE]) {
    const p = await openStable(b, goc + duong, w);
    shots.push(await p.screenshot({ fullPage: true }));
    await p.close();
  }
  const same = Buffer.compare(shots[0], shots[1]) === 0;
  if (!same) {
    khac++;
    fs.writeFileSync(`${OUT}/${safe(duong)}-${w}-CU.png`, shots[0]);
    fs.writeFileSync(`${OUT}/${safe(duong)}-${w}-MOI.png`, shots[1]);
  }
  console.log(`${same ? 'GIONG HET' : 'KHAC     '} ${duong.padEnd(24)} ${w}`);
}
await b.close();
console.log(khac ? `\n${khac} chỗ KHAC — mở ảnh trong ${OUT}/ ra nhìn.` : '\nKhông trang nào đổi.');
