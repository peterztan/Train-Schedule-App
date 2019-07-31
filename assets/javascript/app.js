var firebaseConfig = {
  apiKey: "AIzaSyDJuG7ed_9K10-C8v44SSt7M8hUtroI-6M",
  authDomain: "train-schedule-app-6c866.firebaseapp.com",
  databaseURL: "https://train-schedule-app-6c866.firebaseio.com",
  projectId: "train-schedule-app-6c866",
  storageBucket: "",
  messagingSenderId: "568667441985",
  appId: "1:568667441985:web:d8f2f47a9816dca8"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#addTrain").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainNameInput").val().trim();
  var trainDestination = $("#destinationInput").val().trim();
  var trainStart = moment($("#firstTrainTimeInput").val().trim(), "h:mm").format("X");
  var frequency = $("#frequencyInput").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: frequency
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  alert("Employee successfully added");

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainTimeInput").val("");
  $("#frequencyInput").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var frequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(frequency);

  var trainStartPretty = moment.unix(trainStart).format("h:mm");

  var empMonths = moment().diff(moment(trainStart, "X"), "hours");
  console.log(empMonths);

  var empBilled = empMonths * empRate;
  console.log(empBilled);

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainStartPretty),
    $("<td>").text(empMonths),
    $("<td>").text(frequency),
    $("<td>").text(empBilled)
  );

  $("#train-table > tbody").append(newRow);
});