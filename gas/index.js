var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName("工作表1");
function doPost(e) {
  var param = e.parameter;
      var subject = param.subject;
      var section = param.section;
      var date = param.date;
  sheet.appendRow([subject,section,date]);
  return ContentService.createTextOutput('success');
}
function doGet(){
  var ss =SpreadsheetApp.getActive();
  var sheet = ss.getSheets()[1]; 
  var data = sheet.getDataRange().getValues();
  console.log(data);
  var dataExport = {};
  for(var i = 1; i < data.length; i++) {
    
    dataExport[i] = {
      subject: data[i][0],
      section: data[i][1],
      date: data[i][2],
    }  
  }

  console.log(dataExport);
  var dataExportFormat = JSON.stringify(dataExport);
  console.log(ContentService.createTextOutput(dataExportFormat).setMimeType(ContentService.MimeType.JSON))
  return ContentService.createTextOutput(dataExportFormat).setMimeType(ContentService.MimeType.JSON);
}
