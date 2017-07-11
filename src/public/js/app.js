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
  clearForm();
  $("#newListForm").hide();
})

function setFormData(data) {
  data = data || {};

  const list = {
    title: data.title || "",
    _id: data._id || "",
  };
  $("#changeOfList").val(list.title);
  $("#list-id").val(list._id);
}

function clearForm() {
  setFormData({});
}

function editListPop(id) {
  $(".editListModal").show();
  const list = window.listOfLists.find(list => list._id === id);
  if(list) {
    setFormData(list);
  };
  $(".closeEditList").click(function(){
    $(".editListModal").hide();
    clearForm();
})
}


$(".listCloseBox").hover(function(e){
  e.stopPropagation();
})

$(".listCloseBox").click(function(e){
  deleteList();
  e.stopPropagation();
})





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
  const newTitle = $("#listName").val();
  const listData = {
    title: newTitle
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
      clearForm({});
      console.log("IT CLICKED")
      $("#newListForm").toggle();
    })
}


function deleteList(id){
  if (confirm("Are you sure?")){
    $.ajax({
      type: "DELETE",
      url: '/api/lists/' + id,
      dataType: 'json',
      contentType: 'application/json',
    })
    .done(function(response){
      console.log("List", id, "will be gone 'forever'");
      refreshButtons();
    })
    .fail(function(err){
      console.log("This list is still hangin' around", err);
    })
  }
}
