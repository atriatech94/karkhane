angular.module('myapp')
.controller('RegisterthreeController', function() {
          
})
.directive('registerthreeDir' , function (){
		return {
			link: function() {
				
                var files;
                var timeout ;
				/*====================================================*/
				$(document).ready(function(){
                    
                    if(!localStorage.getItem("user_info")) { window.location.hash = "#/register_one";return false;}
                    var user_info = JSON.parse( localStorage.getItem("user_info") );
                    if(typeof user_info.age === 'undefined'){ window.location.hash = "#/register_two";return false;}
                     /*insert json user_data to hidden input*/
                    $("#datas").val(localStorage.getItem("user_info"));
                    clearTimeout(timeout);
                    $('.select_image').on("click",function(){
                         /*select and show image to user before upload*/
                        if($('#image_sel').val() ==""){
                            $('#image_sel').click();
                        }else{
                            src = "img/user.png";
                            $('#user_image_up').attr('src',src);
                            $('#user_image_up').removeClass("user_image_add");
                            $('.select_image img').removeClass("remove_image");
                            $('#image_sel').val("");
                            return false;
                        }
                    });
                /*====================================================*/
                    $(".upload_image").click(function(){
                         /* submit_form */
                        $("#form_three").submit();
                    });
                /*====================================================*/
                 $("#form_three").submit(function() {
                    $('body .lpro').removeClass("none");
                    
                    var formData = new FormData($(this)[0]);
                     $.ajax({
                         
                        url: base_url+"api/user_register/Passwd123/",
                        type: 'POST',
                        data: formData,
                        async: false,
                        cache: false,
                        contentType: false,
                        processData: false,
                         
                    }).done(function(data) {
                         /* chechk inset and login user into software */
                         var user_data = JSON.parse(data);
                         $('body .lpro').addClass("none");
                         if(user_data.msg_code == "1")
                         {
                             user_info.user_id = user_data.user_id ;
                             user_info.picname = user_data.picname ;
                             user_info.passwd = user_data.passwd ;
                             user_data_update = new Array();
                             user_data_update[0] = user_info;
                             var result_update = JSON.stringify(user_data_update);
                             localStorage.setItem("user_info",result_update);
                             window.location.hash = "#/wall";
                         }
                         else if(user_data.msg_code == "2")
                         {
                             $('body .alert .msg').text("کاربری با این ایمیل قبلا ثبت نام کرده است ").parent('.alert').removeClass('none');
                             return false;
                         }
                         else if(user_data.msg_code == "1"){
                             
                         }
                         
                     }).fail(function(){
                        /*if user cant send data such as no internet access*/
                        $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none');                   
                     });
                    return false;

                  });
                /*====================================================*/
                });
				/*====================================================*/
          }/* end */
}});
function showimagepreview(input) 
    {
        if (input.files && input.files[0]) 
        {
            var filerdr = new FileReader();
            filerdr.onload = function(e) 
            {
                //document.getElementById('user_image_up').src = e.target.result;
                $('#user_image_up').attr('src', e.target.result);
                $('#user_image_up').addClass("user_image_add");
                $('.select_image img').addClass("remove_image");
            }
                
            filerdr.readAsDataURL(input.files[0]);
        }
                       
    }
