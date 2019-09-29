$(document).ready(function () {
    var myname = "";
    var id = "";
    var socket = io();
    var typing = setInterval(function () { $("#typing").remove(); }, 1000);
    var stilltying = false;
    var listOfUsers = [];
    $(document).ready(function () {
      var socket = io();
      $('#inputName').submit(function () {
        for (var i = 0; i < 10; ++i) {
          id += (Math.floor((Math.random() * 10) + 1)).toString();
        }
        socket.on('chat message', function (msg) {

          if (msg.split(": ")[0] == id && !msg.includes("NewUserLogIn")) {
            if (!msg.includes("TYP1NG@M3$$@G3")) {
              $('#messages').append("<div style='text-align:right;'><br><h2 id='me' class='btn btn-outline-success disabled'>" + msg.split(": ")[2] + "</h2><br><a class='badge badge-success'>"+moment().format('LTS')+"</a></div>");
            }
          } else {
            if (msg.includes("NewUserLogIn")) {
              if (!listOfUsers.includes(msg.split(": ")[0]) && msg.split(": ")[0] != id) {
                listOfUsers.push(msg.split(": ")[0]);
                $('#activeUsers').append("<div style='text-align:center;'><h2 id='otherUser'>" + msg.split(": ")[1] + "</h2></div>");
                socket.emit('chat message', id + ": " + myname + ": NewUserLogIn");
              }
            }
            else if (msg.includes("TYP1NG@M3$$@G3")) {
              $("#typing").remove();
              clearInterval(typing);
              $('#messages').append("<div><h3 id='typing'>" + msg.split(": ")[1] + " is typing..." + "</h3></div>");
              typing = setInterval(function () { $("#typing").remove(); }, 2000);


            } else {
              $("#typing").remove();
              $('#messages').append("<div><br><h2 id='other' class='btn btn-outline-primary disabled'>" + msg.split(": ")[1] + ": " + msg.split(": ")[2] + "</h2><br><a class='badge badge-primary'>"+moment().format('LTS')+"</a></div>");
            }
          }
          window.scrollTo(0, document.body.scrollHeight);
        });
        myname = $("#username").val();
        socket.emit('chat message', id + ": " + myname + ": NewUserLogIn");

        $("#inputName").hide();
        $(".main").show();
        return false;
      });

      $('#chatbox').submit(function () {
        socket.emit('chat message', id + ": " + myname + ": " + $('#m').val());
        $('#m').val('');
        typing = false;
        return false;
      });

    });


    $(document).ready(function () {
      $('#m').keydown(function () {
        socket.emit('chat message', id + ": " + myname + ": TYP1NG@M3$$@G3");

      });
    });

})