function toggleTOC() {
  if($(".toc-headings").is(":visible"))
    $(".toc-toggle-text").html("show");
  else
    $(".toc-toggle-text").html("hide");

  $(".toc-headings").toggle();
}
