const SHEET_NAME = '사장의마케팅_DB';
const HEADERS = ['성명', '업종', '이메일', '유형', '마케팅도구', '휴대폰번호(선택)'];

function doGet(e) {
  const action = String((e && e.parameter && e.parameter.action) || 'list').toLowerCase();
  if (action === 'list') return listRecords_();
  if (action === 'ping') return json_({ success: true, message: '사장의마케팅_DB 웹앱이 정상 작동 중입니다.' });
  return json_({ success: false, message: '지원하지 않는 요청입니다.', allowedActions: ['save', 'updateResult', 'list', 'ping'] });
}

function doPost(e) {
  try {
    const data = requestData_(e);
    const action = String(data.action || 'save').toLowerCase();
    if (action === 'list') return listRecords_();
    if (action === 'updateresult') return updateResult_(data);
    if (action === 'save') return saveRecord_(data);
    return json_({ success: false, message: '지원하지 않는 요청입니다.', allowedActions: ['save', 'updateResult', 'list', 'ping'] });
  } catch (error) {
    return json_({ success: false, message: error && error.message ? error.message : '처리 중 오류가 발생했습니다.' });
  }
}

function saveRecord_(data) {
  const record = normalizeRecord_(data);
  validateIdentity_(record);
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    sheet.appendRow([safe_(record.name), safe_(record.industry), safe_(record.email), safe_(record.marketingType), safe_(record.marketingTools), phone_(record.phone)]);
    return json_({ success: true, message: '참여 정보가 저장되었습니다.', rowNumber: sheet.getLastRow(), record: record });
  } finally {
    lock.releaseLock();
  }
}

function updateResult_(data) {
  const record = normalizeRecord_(data);
  validateIdentity_(record);
  if (!record.marketingType || !record.marketingTools) {
    return json_({ success: false, message: '마케팅 유형과 마케팅 도구가 필요합니다.' });
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const lastRow = sheet.getLastRow();
    let rowNumber = Number(data.rowNumber || 0);
    if (!(rowNumber >= 2 && rowNumber <= lastRow && rowMatches_(sheet, rowNumber, record))) {
      rowNumber = findLatestRow_(sheet, record, lastRow);
    }
    if (!rowNumber) return json_({ success: false, message: '일치하는 참여 기록을 찾지 못했습니다. 처음부터 다시 등록해 주세요.' });
    sheet.getRange(rowNumber, 4, 1, 2).setValues([[safe_(record.marketingType), safe_(record.marketingTools), phone_(record.phone)]]);
    SpreadsheetApp.flush();
    return json_({ success: true, message: '진단 결과가 저장되었습니다.', rowNumber: rowNumber, marketingType: record.marketingType, marketingTools: record.marketingTools });
  } finally {
    lock.releaseLock();
  }
}

function listRecords_() {
  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return json_({ success: true, count: 0, records: [] });
  const records = sheet.getRange(2, 1, lastRow - 1, 6).getDisplayValues().map(function (row, index) {
    return { rowNumber: index + 2, name: row[0], industry: row[1], email: row[2], marketingType: row[3], marketingTools: row[4], phone: row[5] };
  });
  return json_({ success: true, count: records.length, records: records });
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    const sheets = spreadsheet.getSheets();
    if (sheets.length !== 1) throw new Error('"' + SHEET_NAME + '" 시트 탭을 찾을 수 없습니다.');
    sheet = sheets[0];
    sheet.setName(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  return sheet;
}

function findLatestRow_(sheet, record, lastRow) {
  if (lastRow < 2) return 0;
  const values = sheet.getRange(2, 1, lastRow - 1, 3).getDisplayValues();
  for (let index = values.length - 1; index >= 0; index--) {
    if (String(values[index][0]).trim() === record.name && String(values[index][2]).trim().toLowerCase() === record.email.toLowerCase()) return index + 2;
  }
  return 0;
}

function rowMatches_(sheet, rowNumber, record) {
  const values = sheet.getRange(rowNumber, 1, 1, 3).getDisplayValues()[0];
  return String(values[0]).trim() === record.name && String(values[2]).trim().toLowerCase() === record.email.toLowerCase();
}

function normalizeRecord_(data) {
  return {
    name: text_(data.name || data['성명']),
    industry: text_(data.industry || data.business || data['업종']),
    email: text_(data.email || data['이메일']),
    marketingType: text_(data.marketingType || data.type || data['유형']),
    marketingTools: text_(data.marketingTools || data.tools || data['마케팅도구']),
    phone: text_(data.phone || data.contact || data['휴대폰번호'])
  };
}

function validateIdentity_(record) {
  if (!record.name) throw new Error('성명을 입력해 주세요.');
  if (!record.email) throw new Error('이메일을 입력해 주세요.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email)) throw new Error('올바른 이메일 주소를 입력해 주세요.');
}

function requestData_(e) {
  if (!e) return {};
  const type = String((e.postData && e.postData.type) || '').toLowerCase();
  if (type.indexOf('application/json') > -1) {
    try { return JSON.parse(e.postData.contents || '{}'); } catch (error) { throw new Error('JSON 형식이 올바르지 않습니다.'); }
  }
  return e.parameter || {};
}

function text_(value) { return String(value == null ? '' : value).trim(); }
function safe_(value) { const text = text_(value); return /^[=+\-@]/.test(text) ? "'" + text : text; }
function phone_(value) { const text = text_(value).replace(/\D/g, ""); return text ? "'" + text : ""; }
function json_(payload) { return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON); }