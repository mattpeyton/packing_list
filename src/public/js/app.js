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
