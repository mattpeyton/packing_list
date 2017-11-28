//HTTP GET request on lists wrapped up in a function
function getLists(){
  //sending the GET request
  return $.ajax('/api/lists')
    .then(res =>{
      //and receiving the response
      return res;
    })
    .fail(err => {
      console.log("Error in the getLists()", err);
      throw err;
    });
}

//A function to refresh the list buttons (or cards) on index.html
function refreshButtons(){
  //defining template const as the html of #listButtonsTemplate
  const template = $('#listButtonsTemplate').html();
  //compiling that template in Handlebars and assigning it to the const compiledList
  const compiledList = Handlebars.compile(template);

    //Calling getLists within this function
    getLists()
    .then(lists => {
    //assigning the response array to the listOfLists property on the global window
    window.listOfLists = lists;

    //saving the lists as the const data
    const data = {lists: lists};
    //running that data (lists) through Handlebars
    const html = compiledList(data);
    //putting that newly compiled html into index.html
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

//A function to populate 'edit list' or 'add list' forms
function setFormData(data) {
  //data parameter will be either data or blank
  data = data || {};

  //Defining list const and assigning it the values of the object passed to the setFormData function
  const list = {
    title: data.title || "",
    _id: data._id || "",
  };
  //Setting the form values as the values of the list const
  $("#changeOfList").val(list.title);
  $("#list-id").val(list._id);
}

//Clear out the form by running a blank object through the setFormData
function clearForm() {
  setFormData({});
}

/*Function to show the list edit pop up modal based on the _id of the list document being edited
It's triggered by an inline on-click on the editButton element on index.html*/

function editListPop(id) {
  $(".editListModal").show();
  //Find the document with _id matching the _id of the list passed into editListPop();
  const list = window.listOfLists.find(list => list._id === id);
  if(list) {
    //Populate the form with the existing list data
    setFormData(list);
  };
  //if the close x is clicked, hide the pop up modal and clear out the form
  $(".closeEditList").click(function(){
    $(".editListModal").hide();
    clearForm();
  })
}

/*A function to send list changes to the database. Triggered by on-click on the button of the edit
form of index.html*/
function submitListNameChange(){
  //Grab the form data values and assign them as properties of listData const
  const listData = {
    title: $("#changeOfList").val(),
    _id: $("#list-id").val(),
    cardColor: $(".editColorSquare.selected").css("background-color")
  };
  //send the changes as an HTTP PUT request
  $.ajax ({
    method:"PUT",
    url: '/api/lists/' + listData._id,
    data: JSON.stringify(listData),
    dataType: 'json',
    contentType: 'application/json'
  })
  /*when the request is finished clear out the form, refresh the index.html list
   buttons, and hide the edit list modal*/
  .done(function(response){
    clearForm();
    refreshButtons();
    $('.editListModal').hide();
  })
  .fail(function(error){
    console.log("Oh NO!!! Editing FAIL", error);
  })
}

/*A function for creating a new list. Triggered by the inline on-click on submit button
in the newListFrom on index.html*/
function submitNewList() {
  //Grabbing the values entered into the form and setting them to the listData const
  const listData = {
    title: $("#listName").val(),
    cardColor: $(".colorSquare.selected").css('background-color')
  }
  //sending the data as an HTTP POST request
  $.ajax({
    type: "POST",
    url: '/api/lists',
    data: JSON.stringify(listData),
    dataType: 'json',
    contentType: 'application/json'
  })
  //When the request is finished refresh the list buttons, clear the form, and hide the add list form
    .done(function(response){
      refreshButtons();
      $('#listName').val('')
      $("#newListForm").toggle();
    })
}

//A function to 'delete' lists, triggered by inline on-click on delete button on list in index.html
function deleteList(id){
  //Confirmation alert just to make sure...
  if (confirm("Are you sure?")){
    //sending the HTTP DELETE request
    $.ajax({
      type: "DELETE",
      url: '/api/lists/' + id,
      dataType: 'json',
      contentType: 'application/json',
    })
    //Refreshing the list buttons on index.html
    .done(function(response){
      console.log("List", id, "will be gone 'forever'");
      refreshButtons();
    })
    .fail(function(err){
      console.log("This list is still hangin' around", err);
    })
  }
}
//Catching the submit new List click event and connecting it to submitNewList function
$('#newListSubmitButton').click(function(e) {
  e.preventDefault();
  submitNewList();
})

//Marking color square as selected with click and deselecting other colors
$('.colorSquare').click(function(){
  $(this).addClass('selected').siblings().removeClass('selected');
})

$('.editColorSquare').click(function(){
  $(this).addClass('selected').siblings().removeClass('selected');
})


//Populating individual list Page
function openList(){
  getLists()
  .then(lists => {
    var title = lists.find( function (list) {
      var location = window.location.pathname;
      var page_id = location.slice(7, 31);
      return list._id === page_id;
    });
   document.getElementById("heroText").innerHTML = title.title;
    /*
  //assigning the response array to the listOfLists property on the global window
  window.listOfLists = lists;

  //saving the lists as the const data
  const data = {lists: lists};
  //running that data (lists) through Handlebars
  const html = compiledList(data);
  //putting that newly compiled html into index.html
  $('.listMenuContainer').html(html);
  */
})
}
