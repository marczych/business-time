define([
   'jquery',
   'jquery-ui'
], function(
   jquery,
   jqueryui
) {
   // Create a progress bar that will count down for 15 seconds
   var myBar = new progressBar(15);

   function setNumberOfPlayers(n) {
      console.log(n + ' players');
      n = Math.max(2, Math.min(n, 6));
      $('#teamGraphic').append("<img src='team/" + n + ".png'>");
   }

   $('#panelRow').delegate('.buttonButton', 'click', function() {
      $(window).trigger('action_taken', event.target.dataset.action);
   });

   // Create a new progress bar in the correct location the page with
   // `duration` number of seconds.
   function progressBar(duration) {
      $('#progressbar').append("<div class='progress-bar progress-bar-success active' id='theBarItself' role='progressbar' aria-valuenow='45' aria-valuemin='0' aria-valuemax='100' style='width: 100%'>");

      // Set animations and transitions to last `duration` 
      $("#theBarItself").css("-webkit-transition", "width " + duration + "s linear");
      $("#theBarItself").css("-moz-transition", "width " + duration + "s linear");
      $("#theBarItself").css("-o-transition", "width " + duration + "s linear");
      $("#theBarItself").css("transition", "width " + duration + "s linear");

      // Start the progress bar counting down to 0%
      $("#theBarItself").width("0%");
   }

   // Convert list of connected players, convert to HTML, and add to the lobby
   // list. Excludes the current user's name from the list of other players.
   function updateLobbyList(list, identifier) {
      var listHTML = gPlayerList.map(function(user) {
         var meClass = user.identifier === identifier ? ' me' : '';
         var readyText = user.ready ? ' (ready)' : '';
         return '<li><p class="lead' + meClass + '">' + user.username +
          readyText + '</p></li>';
      });

      $('#player_list').html(listHTML.join('\n'));
   }

   $('#start_button').click(function() {
      $(window).trigger('lobby_ready');
   });

   $(window).on('client_start_game', function(ev) {
      $('#landing_page').hide();
      $('#main').show();
   });

   $(window).on('client_fail_stage', function(ev) {
      $('#main').hide();
      $('#game_over').show();
   });

   $(window).on('client_complete_stage', function(ev) {
      $('#main').hide();
      $('#stage_complete').show();
   });

   $(window).on('client_delegate_task', function(event, task) {
      $('#instruction_text').text(task.action);
   });

   $('.back_to_lobby').click(function() {
      $('#game_over').hide();
      $('#landing_page').show();
   });

   $('#teamButton').click(moveTeam);
   function moveTeam() {
      $("#team").animate({left: "+=5%"}, 200);
   }

   function newTask(task) {
      $('#instruction_area').append("<div class='alert alert-success' role='alert'>" + task + "</div>");
   }

   function makeNewPanel(header, button, action) {
      $('#panelRow').append(
         '<div class="col-md-2">' +
            '<h3>' + header + '</h3>' +
            '<br>' +
            '<button type="button" class="btn btn-lg btn-block btn-primary buttonButton" data-action="' + action + '">' +
               button +
            '</button>' +
         '</div>'
      );
   }

   function clearPanels() {
      $('#panelRow').empty();
   }


   return {
      setNumberOfPlayers: setNumberOfPlayers,
      updateLobbyList: updateLobbyList,
      makeNewPanel: makeNewPanel,
      clearPanels: clearPanels,
   }
});
