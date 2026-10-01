// KIỂM TRANG — chạy sau mỗi lần sửa, trước khi commit.
// Mở mọi trang ở 4 khổ màn và báo:
//   tran  : số px bị tràn ngang (phải = 0 — tràn ngang là lỗi mobile hay gặp nhất)
//   h1    : số thẻ <h1> (phải = 1 — Google và trình đọc màn hình cần đúng một tiêu đề chính)
//   anh   : số ảnh thiếu alt (phải = 0)
//   loi   : lỗi JavaScript trên trang (phải trống)
// Chạy:  pnpm build && pnpm preview   (cửa sổ khác)  rồi  node tools/kiem-tra/kiem-trang.mjs
import { loadChromium, pages, widths, openStable, BASE } from './_chung.mjs';

const b = await loadChromium();
let hong = 0;
for (const duong of pages()) for (const w of widths('375,768,1280,1920')) {
  const loi = [];
  const p = await openStable(b, BASE + duong, w, (e) => loi.push(e));
  const r = await p.evaluate(() => ({
    tran: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    h1: document.querySelectorAll('h1').length,
    anh: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
  }));
  // Lỗi tải tài nguyên do máy chạy bị chặn mạng (vd. Google Fonts) không phải lỗi của site.
  const loiThat = loi.filter((e) => !/ERR_TUNNEL_CONNECTION_FAILED|ERR_NAME_NOT_RESOLVED/.test(e));
  const ok = r.tran === 0 && r.h1 === 1 && r.anh === 0 && loiThat.length === 0;
  if (!ok) hong++;
  console.log(`${ok ? 'OK  ' : 'HONG'} ${duong.padEnd(24)} ${String(w).padStart(4)}  tran=${r.tran} h1=${r.h1} anh-thieu-alt=${r.anh}${loiThat.length ? '  LOI: ' + loiThat.join(' | ') : ''}`);
  await p.close();
}
await b.close();
console.log(hong ? `\n${hong} dòng HONG — xem lại trước khi commit.` : '\nTất cả OK.');
process.exit(hong ? 1 : 0);
