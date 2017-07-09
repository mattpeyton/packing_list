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

function setFormData(data) {
  data = data || {};

  const list = {
    title: data.title || "",
    _id: data._id || "",
  };
  $("#listName").val(list.title);
  $("#list-id").val(list._id);
}

function clearForm() {
  setFormData({});
}

function editListPop(id) {
  $(".editListModal").show();
  $(".closeEditList").click(function(){
    $(".editListModal").hide();
  });

  const list = window.listOfLists.find(list => list._id === id);
  if(list) {
    setFormData(list);
  };
}

/*  $$$$ THIS NEEDS TO BE FIXED $$$$$$

I need the hover effects only on the parent. If I hover over child, it should not trigger parent hover effect

$(".listButtonContainer").hover(function(e){
  if(e.target === this) {
    style = hover effect
  }

})*/



function submitListNameChange(){
  console.log("you clicked submit")
  const listData = {
    title: $("#changeOfList").val(),
    _id: $("#list-id").val()
  };
  $.ajax ({
    method:"PUT",
    url: '/api/lists/' + listData._id,
    data: JSON.stringify(listData),
    dataType: 'json',
    contentType: 'application/json'
  })
  .done(function(response){
    clearForm();
    refreshButtons();
    $('.editListModal').hide();
  })
  .fail(function(error){
    console.log("Oh NO!!! Editing FAIL", error);
  })
}

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
