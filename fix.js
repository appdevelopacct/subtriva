const fs = require('fs');
let code = fs.readFileSync('app/dashboard/assistant/page.tsx', 'utf8');

code = code.replace(/\\`/g, '`');
code = code.replace(/\\\$/g, '$');

fs.writeFileSync('app/dashboard/assistant/page.tsx', code);
