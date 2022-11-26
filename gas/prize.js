function doGet(){
  var ss =SpreadsheetApp.getActive();
  var sheet = ss.getSheets()[0]; 
  var data = sheet.getDataRange().getValues(); 
  var point =sheet.getRange("J1").getValue();

  console.log(data);
  var dataExport = {};
  for(var i = 1; i < data.length; i++) {
    
    dataExport[i] = {
      lang: data[i][0],
      pro: data[i][1],
      state: data[i][2],
      point: point
    }  
  }
  console.log(dataExport);
  var dataExportFormat = JSON.stringify(dataExport);
  return ContentService.createTextOutput(dataExportFormat).setMimeType(ContentService.MimeType.JSON);
}

var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName("工作表1");
function doPost(e) {
      var param = e.parameter;
      var pro =param.pro;
      var link =param.link;
      var data =sheet.getRange(2,1,ss.getLastRow()-1).getValues();
      for(var i=0;i<data.length;i++){
        if(data[i]==pro){
          sheet.getRange("C"+(i+2)).setValue("審核中");
          sheet.getRange("D"+(i+2)).setValue(link);
        }
      }
  return ContentService.createTextOutput('success');
}