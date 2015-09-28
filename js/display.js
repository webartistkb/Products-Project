

$(document).ready(function(e) {
   // function to get data from items file on the server and display items
  function displayItems(){
     var items = [];
     var jqxhr = $.getJSON('/items',function(data){
     console.log( "success" );
     var itemForm = $("#item-form>div");
     var mainWellsDiv = $('<div id="mainWellsDiv"></div>');
     $('#column2').append(mainWellsDiv);
     $.each(data, function( key, val ) {
         var newDiv = $('<hr/><div class="well well-sm col-md-12" id="' + key + '"></div>');
         var divOneInNewDiv =$('<div class="col-md-9"></div>');
         var divTwoInNewDiv =$('<div class="col-md-3"></div>');
         newDiv.append(divOneInNewDiv);
         newDiv.append(divTwoInNewDiv);
         divOneInNewDiv.append("<h2> " + val.itemName + "</h2><br><p>" +                                 val.itemDescription + "</p><br>");
         divTwoInNewDiv.append('<form class="form-inline"><br><br><button type="button" class="btn btn-default btn-primary col-sm-8 fixedWidth">$' + val.itemPrice + '</button> &nbsp; <button id="' + val.id + '"type="button" class="btn btn-default delete-btn" aria-label="Delete Item">'+'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></form>');
         mainWellsDiv.append(newDiv);
     });//end of each
  })//end of display
     
    // reference :http://api.jquery.com/jquery.getjson/
       .done(function() {
         console.log( "second success" );
       })
       .fail(function() {
         console.log( "error" );
       })
       .always(function() {
         console.log( "complete" );
       });
			 
       jqxhr.complete(function() {
          console.log( "second complete" );
       });
}
     displayItems();
    
     var itemForm = $("#item-form>div");
    
    
      //save data of all inputs in the file on server
      var saveDataOnServer = function(e){
        e.preventDefault();
        //validate the item form not working
        $('#item-form').validate({
             rules: {
                itemName: "required",
                itemDescription: "required",
                itemPrice: "required"
             }
        });
        
        var inputs = itemForm.find('input');
        console.log(inputs);
        inputs.each(function(i, element) {
        console.log($(this).attr('name'));
        if($(this).attr('name') == 'itemName'){
             itemName = $(this).val();
         }
         else if($(this).attr('name') == 'itemDescription'){
             itemDescription = $(this).val();
         }
         else {
             itemPrice = $(this).val(); 
         }
       });// end of each function
    
    
    $.ajax({url: "/items", type: 'post', data: {itemName,itemDescription,itemPrice},
            success: function(response, status){
				        console.log(response, status);
				        var newDiv = $('<hr/><div class="well well-sm col-md-12"></div>');
                        var divOneInNewDiv =$('<div class="col-md-9"></div>');
                        var divTwoInNewDiv =$('<div class="col-md-3"></div>');
                        newDiv.append(divOneInNewDiv);
                        newDiv.append(divTwoInNewDiv);
				        divOneInNewDiv.append("<h2> " + response.itemName + "</h2><br><p>" +                                 response.itemDescription + "</p><br>");
                        
                        divTwoInNewDiv.append('<form class="form-inline"><br><br><button type="button" class="btn btn-default btn-primary col-sm-8 fixedWidth">$' + response.itemPrice + '</button> &nbsp; <button id="'+ response.id
                     + '" type="button" class="btn btn-default delete-btn" aria-label="Delete Item">'+
                      '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></form>');
				        newDiv.insertAfter(itemForm);
						 }
		  });// end of ajax function  
 };//end of saveDataOnServer Function
    
    var deleteItem = function(e){
        //console.log(e.target);
        var confirmResponse = confirm("Are you sure you want to delete this item!");
        if(confirmResponse === true){ 
           var keyOfDeleted = $(this).prop('id');
           //console.log(keyOfDeleted);
           //console.log($(this).closest('div.well-sm'));
           var deletedItem = $(this).closest('div.well-sm');
           //$.removeData(deletedItem,keyOfDeleted);
           $.ajax({
             url: '/items/'+ keyOfDeleted,
             data: { "id": keyOfDeleted },
             type: 'DELETE',
             success: function(){
             console.log($(this));
             deletedItem.remove();
           }
         });
        }//end of if
     };// end of deleteItem Function
        
    itemForm.on('click','button',saveDataOnServer);
    var mainWell = $('#column2');
    $(mainWell).on('click','button.delete-btn',deleteItem);
 });// end of ready function




