//each function is assigned to a button within the Sheets file
//longer function converts the original data into long format
//sorting function takes the output of the longer function and moves it into a different sheet depending on what the responses were

function longer() {
  //Read data from active sheet
  var sheet = 
     SpreadsheetApp.getActiveSpreadsheet().getSheetByName('data');
  var data = sheet.getDataRange().getValues();  

//for each row in the survey output, pull out emoji, emotion, and rating for each of the 10 texts
//columns with data for our 3 variables are 5 apart in survey output
for (r=2; r <= data.length; r++) {
  for (n=3; n<= 48; n+=5) {
  let emoji = sheet.getRange(r,n).getValue();
  let emotion = sheet.getRange(r,n+1).getValue();
  let rating = sheet.getRange(r,n+2).getValue();

  var responses = [emoji, emotion, rating]

  //write just what we need to a new spreadsheet
  var outputsheet = 
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('longdata');

   outputsheet.appendRow(responses);
  }
}


}

function sorting() {
  //read data from sheet
  var sheet = 
     SpreadsheetApp.getActiveSpreadsheet().getSheetByName('longdata');
  var data = sheet.getDataRange().getValues();  
  
  //for each row of data, determine whether it is a positive or negative text (emotion)
  //then determine what kind of emoji was used (congruent emotion or neutral)
  //then write to corresponding sheet and column within that sheet depending on emotion/emoji
  for (i=1; i <= data.length; i++) {
  
  let emoji = sheet.getRange(i,1).getValue();
  let emotion = sheet.getRange(i,2).getValue();
  let rating = sheet.getRange(i,3).getValue();

  if(emotion == "Positive" && emoji == "Positive"){
    var outputsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('positiveemojis');
    var columnToSet = 1;
    var lastRow = outputsheet.getLastRow();
    var cell = outputsheet.getRange(lastRow+1, columnToSet);
    cell.setValue(rating);
 
  } else if(emotion == "Positive" && emoji == "None"){
    var outputsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('positiveemojis');
    var columnToSet = 2;
    var lastRow = outputsheet.getLastRow();
    var cell = outputsheet.getRange(lastRow+1, columnToSet);
    cell.setValue(rating);

  } else if(emotion == "Negative" && emoji == "Negative"){
    var outputsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('negativeemojis');
    var columnToSet = 1;
    var lastRow = outputsheet.getLastRow();
    var cell = outputsheet.getRange(lastRow+1, columnToSet);
    cell.setValue(rating);
 
  } else if(emotion == "Negative" && emoji == "None"){
    var outputsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('negativeemojis');
    var columnToSet = 2;
    var lastRow = outputsheet.getLastRow();
    var cell = outputsheet.getRange(lastRow+1, columnToSet);
    cell.setValue(rating);

  } 
  }
}
