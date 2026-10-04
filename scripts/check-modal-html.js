const fs = require('fs');
const html = fs.readFileSync('D:/Website Pelangi/stitch_cv_pelangi_uv_redesign/produk_layanan_finishing_pelangi_uv_desktop/code.html', 'utf8');

const mIdx = html.indexOf('id="service-detail-modal"');
if (mIdx !== -1) {
  console.log(html.substring(mIdx - 100, mIdx + 3000));
}
