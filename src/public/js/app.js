function getLists(){
  return $.ajax('/api/lists')
    .then(res =>{
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

    window.listOfLists = lists;

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

function editPop(id) {

  /* OPEN AN EDITING POP UP */

  console.log("I am clicked");
  const list = window.listOfLists.find(list => list._id === id);
  if(list) {
    $()
    console.log('We are editing the file', list);
  } else {
    console.log('Uh oh....I could not find that id', id);
  }
}

/*  $$$$ THIS NEEDS TO BE FIXED $$$$$$

$(".listButtonContainer").hover(function(e){
  if(e.target === this) {
    style = hover effect
  }

})*/

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
