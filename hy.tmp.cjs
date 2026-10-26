const { chromium } = require("playwright");
(async () => { const b = await chromium.launch(); const path=process.argv[2]||"/a";
for (const w of [375,1440]) { const p = await b.newPage({viewport:{width:w,height:900}}); const m=[];
p.on("console",x=>{ if(/hydrat|mismatch|did not match/i.test(x.text())) m.push(x.text().slice(0,1500)); }); p.on("pageerror",e=>m.push("PE "+e.message.slice(0,800)));
await p.goto("http://localhost:3001"+path,{waitUntil:"networkidle"}); await p.waitForTimeout(1500);
console.log("==",path,w,m.length); m.forEach(x=>console.log(x)); await p.close(); }
await b.close();})();
