window.onload = function() {
  $.getJSON(
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?"
  )
    .done(update)
    .fail(handleErr);
};

function twitterShare(){
  var twitterWindow = window.open(
    "https://twitter.com/intent/tweet?text=" + document.getElementById("quote").innerHTML,
    "twitter-popup",
    "height=350,width=600"
  );
  if (twitterWindow.focus) {
    twitterWindow.focus();
  }
  return false;
};

var quotes = document.getElementById("quotes");
var quote = document.getElementById("quote");
var author = document.getElementById("author");
var displayPrevQuotes = document.getElementById("displayPrevQuotes");

$("#get-quote").click(function() {
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/",
    jsonp: "jsonp",
    dataType: "jsonp",
    data: {
      method: "getQuote",
      lang: "en",
      format: "jsonp"
    }
  })
    .done(update)
    .fail(handleErr);
});

function update(response) {
  var quoteText = JSON.stringify(response.quoteText);
  var quoteAuthor = JSON.stringify(response.quoteAuthor);
  var li = document.createElement("li");
  var listItem = li.append(quoteText);
  displayPrevQuotes.append(li);
  if (quoteText.length > 100) {
    quotes.style.backgroundColor = "green";
  } else {
    quotes.style.backgroundColor = "yellow";
  }

  quote.innerHTML = quoteText;
  author.innerHTML = "- " + JSON.parse(quoteAuthor);
}

function handleErr(jqxhr, textStatus, err) {
  console.log("Request Failed: " + textStatus + ", " + err);
}
