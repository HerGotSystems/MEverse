// Run with: node --test my-cycle/tests/privacy-smoke.test.cjs
// Lightweight checks; not a replacement for browser/device testing.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
test('main application script parses',()=>{assert.ok(script);new Function(script)});
test('offline shell registered and manifest linked',()=>{assert.match(html,/rel="manifest"/);assert.match(html,/serviceWorker\.register\('\.\/sw\.js'/)});
test('no obvious external URLs or network APIs in the app',()=>{assert.doesNotMatch(script,/\b(fetch|XMLHttpRequest|sendBeacon|WebSocket)\s*\(/);assert.doesNotMatch(html,/<script[^>]+src=/)});
test('storage conflict handling and validation exist',()=>{assert.match(script,/function validate\(result\)/);assert.match(script,/addEventListener\('storage'/);assert.match(script,/storageSnapshot!==null/);assert.match(script,/function lockApp\(/)});
test('fertility remains off at profile creation',()=>{assert.match(script,/ovulation:false/)});
