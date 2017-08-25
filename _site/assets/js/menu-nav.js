$(function() {
  $(".site-menu-button").click(function() {
    if(!this.classList.contains("disabled")) {
      var loc;
      //switch(this.innerHTML) {
      switch(this.firstChild.innerHTML) {
        case "Home": loc = "/"; break;
        case "Blog": loc = "/blog"; break;
        case "Projects": loc = "/projects"; break;
        case "Résumé": loc = "/resume"; break;
        case "Contact": loc = "/contact"; break;
        default: loc = "/";
      }
    // alert(loc);
      document.location.href = loc;
    }
    //else
    //  alert("Button disabled.");
  });
});
