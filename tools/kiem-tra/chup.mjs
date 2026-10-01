// CHỤP — ảnh toàn trang để đặt cạnh Figma mà nhìn.
// "0 lỗi" chưa chắc là đúng: một lượt sửa từng báo 0 lỗi nhưng biến 8 ô thành
// khối trắng đặc — chỉ mở ảnh ra nhìn mới thấy.
// Chạy:  PAGES=/remote-office node tools/kiem-tra/chup.mjs   → ảnh trong OUT/
import fs from 'node:fs';
import { loadChromium, pages, widths, openStable, BASE, OUT, safe } from './_chung.mjs';

const b = await loadChromium();
fs.mkdirSync(OUT, { recursive: true });
for (const duong of pages()) for (const w of widths('375,768,1280')) {
  const p = await openStable(b, BASE + duong, w);
  const f = `${OUT}/${safe(duong)}-${w}.png`;
  await p.screenshot({ fullPage: true, path: f });
  console.log('đã chụp', f);
  await p.close();
}
await b.close();
