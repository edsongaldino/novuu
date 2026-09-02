const fs = require('fs');

let html = fs.readFileSync('src/app/pages/detalhe/detalhe.component.html', 'utf8');

const regex = /<!-- Ficha Técnica Horizontal -->[\s\S]*?(?=                \}\s*<\/div>\s*<\/section>)/;
const match = html.match(regex);
if (match) {
    const fichaContent = match[0];
    
    // Remove the ficha content from inside the loop
    html = html.replace(fichaContent, '');
    
    // Inject it AFTER the amenities-summary-grid closes
    html = html.replace(/                \}\s*<\/div>\s*<\/section>/, `                }\n              </div>\n\n${fichaContent}\n            </section>`);
    
    fs.writeFileSync('src/app/pages/detalhe/detalhe.component.html', html);
    console.log("Fixed Ficha Técnica position!");
} else {
    console.log("Could not find Ficha Técnica to move.");
}
