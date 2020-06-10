window.onload = function () {

  //create event listeners
  var el = document.getElementById('formSubmit');
  el.addEventListener('click', (e)=>(handleSubmit(e)));
  var http = new XMLHttpRequest();
  http.addEventListener("load", transferComplete);
  var data = document.getElementById('inputbox');

  function handleSubmit (e) {

    e.preventDefault();
    var url = 'http://localhost:3000';
    var params = `data=${data.value}`;
    http.open('POST', url, true);
    http.responseType = 'blob';
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.overrideMimeType('document');
    http.send(params);
  }

  function transferComplete(e) {
    if (e.target.status == 200) {
      var blob = e.target.response;
      let a = document.createElement("a");
      a.style = "display: none";
      document.body.appendChild(a);
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'csv_report.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
}