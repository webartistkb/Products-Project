var saveDataOnServer = function(itemForm){
        //check if all inputs are filled
        
        //save data of all inputs in the file on server
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
    
    
    $.ajax({url:"/items", type:'post', data: {itemName,itemDescription,itemPrice},
            success: function(response, status){
				        console.log(response, status);
				        var newDiv = $('<div></div>');
				        newDiv.append("<br><p>Item Name: " + response.itemName + "<br>Item Description: " +                                 response.itemDescription + "<br>Item Price: " + response.itemPrice);
				        newDiv.insertAfter(itemForm);
						 }
		  });// end of ajax function  
 };

$(document).ready(function(e) {
     //displayItems();
    var itemForm = $("#item-form .form-group");
    itemForm.on('click','button',saveDataOnServer(itemForm));
 });


// function to get data from items file on the server and display items

  /*function displayItems(){
     var items = [];
     var jqxhr = $.getJSON('/items',function(data){
     console.log( "success" );   
     }
     
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
 });*/