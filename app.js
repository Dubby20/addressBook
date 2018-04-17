var contactList = []; //list of all contacts
var updateIndex = null; //manages index of contact update

$(document).ready(function() {
  // Getting contact array from the local storage
  let content = localStorage.getItem("contactList");
  contactList = content ? JSON.parse(content) : [];

  render(contactList);

  $("#addcontact").click(function() {
    // console.log("Contact created")
    var myPhoneNumber = $("#phonenumber").val();
    var myName = $("#name").val() || myPhoneNumber;
    var myEmail = $("#emailaddress").val();
    var myAddress = $("#address").val();
    var myCity = $("#city").val();

    var info = {
      myName,
      myPhoneNumber,
      myEmail,
      myAddress,
      myCity
    };

    // console.log(info);
    if (!info) return;
    //check for update index and either add new or update contact
    !updateIndex
      ? contactList.push(info)
      : (contactList = contactList.map((contact, index) => {
          if (index === updateIndex - 1) {
            return info;
          }
          return contact;
        }));
    //  console.log(contactList)
    updateIndex = null;
    $("#addcontact").html("Add Contact");
    storeContacts();
    render(contactList);

    // clear contact form
    $("#name").val("");
    $("#phonenumber").val("");
    $("#emailaddress").val("");
    $("#address").val("");
    $("#city").val("");
  });
});

// Display contacts
function render(contactList) {
  $("#contacts").empty();
  if (!contactList.length) {
    var empty = $(".empty").html("<p>No contact added yet</p>");
    $("#contacts").append(empty);
  } else {
    var displayContact = contactList.map((contact, i) => {
      return `
    <p>Name: ${contact.myName} </p>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${
      contact.myPhoneNumber
    }-${i}">View Contact</button>
    <button type="button" onClick=editContact(${i}) class="btn btn-info">Edit Contact</button>
    <button type="button" onClick=deleteContact(${i})  class="btn btn-danger">Delete Contact</button>
    <div id="${
      contact.myPhoneNumber
    }-${i}" class="modal fade" role="dialog" tabindex="-1" role="dialog" aria-labelledby="#${
        contact.myPhoneNumber
      }-${i}" aria-hidden="true">
   <div class="modal-dialog" role="document">
 
     <!-- Modal content-->
     <div class="modal-content">
       <div class="modal-header">
         <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
         <h4 class="modal-title text-left">${contact.myName}</h4>
       </div>
       <div class="modal-body">
       <p>Phone Number: ${contact.myPhoneNumber}</p>
       <p>Email: ${contact.myEmail}</p>
       <p>Address: ${contact.myAddress}</p>
       <p>City: ${contact.myCity}</p>
       </div>
       <div class="modal-footer">
       
         <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
       </div>
     </div>
 
     </div>
     
 </div>
 
 
    `;
    });
    $("#contacts").append(displayContact);
  }
}

function deleteContact(i) {
  // console.log(`delete from ${i}`)
  contactList.splice(i, 1);
  storeContacts();
  render(contactList);
}

function storeContacts() {
  // Stringify and store contactList to local storage
  localStorage.setItem("contactList", JSON.stringify(contactList));
}

function editContact(i) {
  // console.log(`edit form ${i}`);
  $("#name").val(contactList[i].myName);
  $("#phonenumber").val(contactList[i].myPhoneNumber);
  $("#email").val(contactList[i].myEmail);
  $("#address").val(contactList[i].myAddress);
  $("#city").val(contactList[i].myCity);
  updateIndex = i + 1;
  // console.log(updateIndex);
  $("#addcontact").html("Save changes");
}
