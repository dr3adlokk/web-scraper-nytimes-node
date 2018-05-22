$(document).ready(function() {
  function getResults() {
    $("#results").empty();
    $.getJSON("/all", function(data) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        $("#results").prepend(
          '<div class="col-md-4 boxStyle">' +
            "<p data-id=" +
            data[i]._id +
            '><span class="dataTitle">' +
            data[i].title +
            "</span></p>" +
            '<a target="_blank"href=' +
            data[i].link +
            "data-id=" +
            data[i]._id +
            '><span class="dataLink">Go to article</span></p></div>'
        );
        $("#showArticles").on("click", function() {
          $("#results").removeAttr("hidden");
        });
      }
    });
  }
  getResults();
});
// module.exports = script