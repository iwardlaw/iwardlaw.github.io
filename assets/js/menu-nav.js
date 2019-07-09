$(function() {
  $(".site-menu-button").click(function() {
    if(!this.classList.contains("disabled")) {
      var loc;
      switch(this.id) {
        case "site-menu-button-home": loc = "/"; break;
        case "site-menu-button-resume": loc = "/resume"; break;
        case "site-menu-button-portfolio": loc = "/portfolio"; break;
        case "site-menu-button-writing": loc = "/writing"; break;
        case "site-menu-button-contact": loc = "/contact"; break;
        default: loc = "/";
      }
      //alert(loc);
      document.location.href = loc;
    }
  });
});
