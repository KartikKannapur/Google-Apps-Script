//Today's Agenda 

//Fetch Calendar Events for the Current day
//Append them to a Google Document
//Shorten the url using goo.gl
//E-mail the Shortened url
//Schedule the Script

function todayAgenda(){
  
  //Fetch Current Date and format as a String
  var today = new Date();
  
  //Formatting
  var today_string = today.getFullYear().toString() +' '+ padding(1 + today.getMonth()) +' '+ padding(1 + today.getDate()) +' : ';
  
  //Fetch Calendar Events for the Current day
  var cal = CalendarApp.getDefaultCalendar().getEventsForDay(today);
  
  //Append them to a Google Document
  var doc = DocumentApp.create(today_string + 'Agenda');
  var doc_body = doc.getBody();
  doc_body.appendParagraph('Good Morning Kartik Kannapur');
  doc_body.appendParagraph('Date : ' + today);
  doc_body.appendHorizontalRule();
  doc_body.appendParagraph('Your Agenda for Today is : ');
  
  //Iterate through Calendar events
  var i = 0;
  for(i=0;i<cal.length;i++){
    doc_body.appendParagraph(basicTime(cal[i].getStartTime()) +' '+'to'+' '+ basicTime(cal[i].getEndTime()) +' : '+ cal[i].getTitle() +' '+'at'+' '+ cal[i].getLocation());
  }
  doc.saveAndClose();
  
  //To use url's in our code, we need to enable the URL Shortener API
  //Resources -> Advanced Google Services -> URL Shortener
  //Enable the servie in the Google Console as well
  
  //Get the url of the Document
  var url = doc.getUrl();
  //Shorten the url using goo.gl
  var toShorten = UrlShortener.newUrl().setLongUrl(url);
  var url_short = UrlShortener.Url.insert(toShorten);
  
  //E-mail the Shortened url
  //var email = Session.getActiveUser().getEmail();
  var mail = GmailApp.sendEmail('kartikkannapur@gmail.com','The Agenda for Today has been attached to this Mail',url_short.getId());
  
  //Schedule the Script
  //To do this - We need to add triggers
  
  //This function is used for formatting
  //It pads a zero to the left, if the input is a Single Digit number
  function padding(i){
    return i<10?"0"+i:i;
  }

  //Basic Time Function
  //Formats the Time in HH:MM format
  function basicTime(time){
    var output = padding(time.getHours()) +':'+ padding(time.getMinutes());
  return output;
  }
  
}
