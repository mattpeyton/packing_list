function getLists(){
  return $.ajax('/api/lists')
    .then(res =>{
      console.log("Results from getLists()", res);
      return res;
    })
    .fail(err => {
      console.log("Error in the getLists()", err);
      throw err;
    });
}

function refreshButtons(){
  const template = $('#listButtonsTemplate').html();
  const compiledList = Handlebars.compile(template);

  getLists()
    .then(lists => {
    const data = {lists: lists};
    const html = compiledList(data);
    $('.listMenuContainer').html(html);
  })
}

//Show and hide add new list form on index.html

$("#newListAdd").click(function(){
  $("#newListForm").toggle();
});

$("#cancelNewListForm").click(function(event){
  event.preventDefault();
  $("#newListForm").hide();
})


function submitNewList() {
  const title = $("#listName").val();
  const listData = {
    title: title
  }

  $.ajax({
    type: "POST",
    url: '/api/lists',
    data: JSON.stringify(listData),
    dataType: 'json',
    contentType: 'application/json'
  })
    .done(function(response){
      refreshButtons();
      $("#newListForm").toggle();
    })
}
