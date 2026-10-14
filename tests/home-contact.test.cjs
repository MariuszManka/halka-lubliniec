const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function loadTs(filename) {
  const source = fs.readFileSync(filename, 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require: name => loadTs(path.resolve(path.dirname(filename), name + '.ts')) });
  return module.exports;
}
const { homeContactDefaults, resolveContactPhones, phoneHref } = loadTs(path.resolve(__dirname, '../content/home-contact.ts'));

test('shows both numbers and selects MDK as primary', () => {
  const result = resolveContactPhones(homeContactDefaults.phones);
  assert.equal(result.enabled.length, 2);
  assert.equal(result.primary._key, 'mdk');
});
test('disabled primary is hidden and replaced by next enabled phone', () => {
  const result = resolveContactPhones(homeContactDefaults.phones.map(p => ({ ...p, enabled: p._key !== 'mdk' })));
  assert.equal(result.enabled.length, 1);
  assert.equal(result.primary._key, 'andrzej-pluskota');
});
test('switching primary selects Andrzej', () => {
  assert.equal(resolveContactPhones(homeContactDefaults.phones.map(p => ({ ...p, primary: p._key === 'andrzej-pluskota' }))).primary._key, 'andrzej-pluskota');
});
test('all disabled or empty means no phone anywhere', () => {
  assert.equal(resolveContactPhones(homeContactDefaults.phones.map(p => ({ ...p, enabled: false }))).primary, null);
  assert.equal(resolveContactPhones([]).primary, null);
});
test('formats Polish local and international phone links', () => {
  assert.equal(phoneHref('34 351 06 83'), '+48343510683');
  assert.equal(phoneHref('669 101 959'), '+48669101959');
  assert.equal(phoneHref('+48 669 101 959'), '+48669101959');
});
