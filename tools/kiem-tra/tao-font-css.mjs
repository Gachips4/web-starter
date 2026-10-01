// TẠO FONT CSS — chỉ cần khi máy chạy kiểm tra KHÔNG tải được Google Fonts
// (máy ảo của Claude bị chặn mạng tới Google Fonts). Không có font thật thì
// ảnh chụp dùng font thay thế → chữ rộng hẹp khác → so ảnh và đo tràn SAI.
//
// Cách dùng (ngoài repo, không thêm vào package.json):
//   mkdir /tmp/font && cd /tmp/font && npm i @fontsource/be-vietnam-pro @fontsource/chakra-petch
//   node <repo>/tools/kiem-tra/tao-font-css.mjs /tmp/font "Be Vietnam Pro=be-vietnam-pro" "Chakra Petch=chakra-petch" > /tmp/font/fonts.css
//   FONT_CSS=/tmp/font/fonts.css node tools/kiem-tra/kiem-trang.mjs
import fs from 'node:fs';
import path from 'node:path';

const [root, ...pairs] = process.argv.slice(2);
if (!root || !pairs.length) { console.error('Cách dùng: node tao-font-css.mjs <thư mục có node_modules> "Tên font=goi-fontsource" ...'); process.exit(2); }
const css = [];
for (const pair of pairs) {
  const [fam, pkg] = pair.split('=');
  const dir = path.join(root, 'node_modules', '@fontsource', pkg, 'files');
  for (const f of fs.readdirSync(dir)) {
    const m = f.match(/-(vietnamese|latin|latin-ext)-(\d+)-normal\.woff2$/);
    if (!m) continue;
    const b64 = fs.readFileSync(path.join(dir, f)).toString('base64');
    css.push(`@font-face{font-family:'${fam}';font-weight:${m[2]};font-style:normal;src:url(data:font/woff2;base64,${b64}) format('woff2');}`);
  }
}
process.stdout.write(css.join('\n'));
