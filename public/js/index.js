$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})
document.getElementById('popup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    window.open('/popup');
  });