console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var nameIn = $('#nameIn').val();
    var genderIn = $('#genderIn').val();
    var ageIn = $('#ageIn').val();
    var readyForTransferIn = $('#readyForTransferIn').val();
    var notesIn = $('#notesIn').val();
    var objectToSend = {
      name: nameIn,
      gender: genderIn,
      age: ageIn,
      ready_for_transfer: readyForTransferIn,
      notes: notesIn
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
}); // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      displayKoalas(data);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
      getKoalas(data);
    } // end success
  }); //end ajax
}

function displayKoalas(koalasArray){
  $('#viewKoalas').empty();

  for(var i=0; i <koalasArray.length; i++){
    var koala = koalasArray[i];
    var $koalaTR= $('<tr></tr>');
    $koalaTR.data('id', koala.id);
    $koalaTR.append('<td class="name">' + koala.name + '</td>');
    $koalaTR.append('<td class="gender">' + koala.gender + '</td>');
    $koalaTR.append('<td class="age">' + koala.age + '</td>');
    $koalaTR.append('<td class="ready_for_transfer">' + koala.ready_for_transfer + '</td>');
    $koalaTR.append('<td class="notes">' + koala.notes + '</td>');
    //$koalaTR.append('<td class="name">' + koala.name + '</td>');
    $('#viewKoalas').prepend($koalaTR);
  }
}