const fs = require('fs');

const TOTAL_PAGES = 25000;
let content = '';

for (let i = 1; i <= TOTAL_PAGES; i++) {
  content += `--- PAGE START ---
#TITLE: ${i}


--- PAGE END ---

`;
}

fs.writeFileSync('pages.txt', content, 'utf8');

console.log('Файл pages.txt успешно создан');
