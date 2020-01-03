
$( document ).ready(function() {
  var api_host = "https://api.fitnessapp.cf"
  var host = "https://fitnessapp.cf"
  var home_url = host

  $( 'form.sign-in' ).submit(function() {
    var api_url = api_host + '/v1/login-tok/'
    $.ajax({
      type: 'post',
      url: api_url,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        username: $('#form_signin_name').val(),
        password: $('#form_signin_password').val()
      }),
      success: function(result){
        Cookies.set('auth_tok', result.token);
        $(location).attr('href', home_url);
      },
      failure: function(){
      }
    })
  });

  $('.img__btn').click(function() {
    $('.cont').toggleClass('s--signup');
  });
});
