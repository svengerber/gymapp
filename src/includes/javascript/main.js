$( document ).ready(function() {
  'use sctrict';
  var api_host = "https://api.fitnessapp.cf"
  var host = "https://fitnessapp.cf"
  var home_url = host

//Check Login State -------------------------------------
  var auth_tok = Cookies.get('auth_tok');
  check_logged_in(auth_tok);

  function check_logged_in(auth_tok){
    var api_url = api_host + '/v1/check-tok/'
    $.ajax({
      type: 'get',
      url: api_url,
      contentType: 'application/json',
      dataType: 'json',
      headers: {
        Authorization: "Token " + auth_tok
      },
      success: function(){
        loggedin(true);
      },
      failure: function(){
        loggedin(false);
      }
    })
  }

  function loggedin(way){
    var login_logout_btn = $('.login-logout button')
    console.log(way);
    if(way) {
      login_logout_btn.removeClass('login');
      login_logout_btn.addClass('logout');
      $('.login-logout button h1').text('Logout');
      console.log('LOGIN FUNCTION');
    }else {
      login_logout_btn.addClass('login');
      login_logout_btn.removeClass('logout');
      $('.login-logout button h1').text('Login');
      console.log('LOGOUT FUNCTION');
    }
  }

//Login, Logout Functions -----------------------------------------
 $('.login-logout').click(function() {
   if ($('.login-logout button').hasClass('login')){
     console.log('logging-in');
     window.location.href = document.location.origin + "/login";
   }else{
    console.log('logging-out');
    logout(Cookies.get('auth_tok'));
   }
 })

 function logout(auth_tok) {
   var api_url = api_host + '/v1/logout-tok/'
   $.ajax({
     type: 'post',
     url: api_url,
     contentType: 'application/json',
     dataType: 'json',
     headers: {
       Authorization: "Token " + auth_tok
     },
     success: function(){
       Cookies.remove('auth_tok');
       loggedin(false);
     },
     failure: function(){
       Cookies.remove('auth_tok');
       loggedin(false);
     }
   })

 }

// Navigation ---------------------------------------------
  $('.nav-item a').click(function() {
    var targetSection = $(this).attr('href');
    $('section.shown').toggleClass('hidden');
    $('section.shown').toggleClass('shown');
    $('section' + targetSection).toggleClass('hidden');
    $('section' + targetSection).toggleClass('shown');
    apiCall(targetSection);
    closeMenu();
  });

  $('div.nav-trigger').click(function() {
    $('nav').toggleClass('slide-in');
    $('main').toggleClass('slide-out');
    $('.nav-burger').toggleClass('menu-active');
  });

  $('content').click(closeMenu);
  $('content').scroll(closeMenu);

  function closeMenu(){
    if ($('main').hasClass('slide-out')){
      $('nav').toggleClass('slide-in');
      $('main').toggleClass('slide-out');
      $('.nav-burger').toggleClass('menu-active');
    }
  };

  $('.nav-item').hover(function() {
    var movetop = ($(this).index() - 1) * 60 + 15;
    var styles = {
      transform: "translate3d(2px," + movetop + "px,0)",
      opacity: 0.8
    };
    $('.nav-slider').css( styles );
  },
  function(){
    var styles = {
      opacity: 0
    };
    $('.nav-slider').css( styles );
  })






});
