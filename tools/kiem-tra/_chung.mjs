// Phần dùng chung cho các script kiểm tra. Không cần sửa file này.
//
// Cấu hình bằng biến môi trường (environment variable — giá trị đặt ngay
// trước lệnh chạy, vd. `BASE=http://localhost:4321 node kiem-trang.mjs`):
//   BASE        địa chỉ bản MỚI   (mặc định http://localhost:4321)
//   OLD         địa chỉ bản CŨ    (mặc định http://localhost:4322) — chỉ so-anh dùng
//   DIST        thư mục build để tự tìm danh sách trang (mặc định ./dist)
//   PAGES       danh sách trang, cách nhau dấu phẩy — bỏ trống thì tự tìm trong DIST
//   WIDTHS      khổ màn, vd. 375,768,1280,1920
//   FONT_CSS    file CSS @font-face nhúng font (dùng khi máy chạy không tải được Google Fonts)
//   CHROMIUM    đường dẫn trình duyệt Chromium nếu Playwright không tự tìm được
//   OUT         thư mục lưu ảnh (mặc định ./kiem-tra-anh — ĐÃ có trong .gitignore mẫu)
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export const BASE = process.env.BASE || 'http://localhost:4321';
export const OLD = process.env.OLD || 'http://localhost:4322';
export const OUT = process.env.OUT || 'kiem-tra-anh';
export const widths = (d) => (process.env.WIDTHS || d).split(',').map(Number);

// Playwright KHÔNG nằm trong package.json của site (site không cần nó để chạy).
// Tìm bản cài trong thư mục hiện tại trước, không có thì tìm bản cài toàn máy.
export async function loadChromium() {
  const req = createRequire(path.resolve('package.json'));
  let pw;
  try { pw = req('playwright'); }
  catch {
    const g = execSync('npm root -g').toString().trim();
    try { pw = createRequire(path.join(g, 'x.js'))('playwright'); }
    catch { console.error('Chưa có Playwright. Cài: npm i -g playwright  (hoặc chạy trong máy của Claude)'); process.exit(2); }
  }
  const opt = {};
  if (process.env.CHROMIUM) opt.executablePath = process.env.CHROMIUM;
  else if (fs.existsSync('/opt/pw-browsers/chromium')) opt.executablePath = '/opt/pw-browsers/chromium';
  return pw.chromium.launch(opt);
}

// Tự tìm mọi trang trong thư mục build: dist/abc/index.html → /abc
export function pages() {
  if (process.env.PAGES) return process.env.PAGES.split(',').map((s) => s.trim());
  const dist = process.env.DIST || 'dist';
  const out = [];
  const walk = (dir, rel) => {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      if (f.isDirectory()) { if (!f.name.startsWith('_')) walk(path.join(dir, f.name), rel + '/' + f.name); }
      else if (f.name === 'index.html') out.push(rel || '/');
    }
  };
  if (!fs.existsSync(dist)) { console.error(`Không thấy thư mục ${dist}/ — chạy build trước, hoặc đặt PAGES=/,/trang-a`); process.exit(2); }
  walk(dist, '');
  return out.sort();
}

const fontCss = process.env.FONT_CSS && fs.existsSync(process.env.FONT_CSS) ? fs.readFileSync(process.env.FONT_CSS, 'utf8') : null;

// Mở trang và đợi nó "đứng yên" thật sự trước khi đo/chụp.
// Bài học: ảnh `loading="lazy"` chỉ tải khi cuộn tới → hai lần chụp cùng một
// trang vẫn khác nhau → báo lệch GIẢ. Nên: cuộn hết trang, ép mọi ảnh tải
// ngay, đợi font + ảnh xong rồi mới chụp.
export async function openStable(browser, url, width, onError) {
  const p = await browser.newPage({ viewport: { width, height: 900 } });
  if (onError) {
    p.on('console', (m) => { if (m.type() === 'error') onError(m.text()); });
    p.on('pageerror', (e) => onError(e.message));
  }
  await p.goto(url, { waitUntil: 'networkidle' });
  if (fontCss) await p.addStyleTag({ content: fontCss });
  await p.evaluate(async () => {
    await document.fonts.ready;
    for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
    window.scrollTo(0, 0);
    document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; });
    await Promise.all([...document.images].map((i) => (i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }))));
  });
  await p.waitForTimeout(400);
  return p;
}

export const safe = (s) => (s === '/' ? 'trang-chu' : s.replace(/^\//, '').replace(/\//g, '_'));
