angular.module('myapp')
.controller('myprofileController', function($scope) {
   
    $scope.user_info = JSON.parse(localStorage.getItem("user_info"));
    $scope.user_skill = JSON.parse(localStorage.getItem("user_skill"));
    console.log($scope.user_skill);
    $scope.now_year = moment().format('jYYYY');
    $scope.base_url = base_url;
    console.log($scope.user_info);
    
})
.directive('myprofileDir' , function (){
		return {
			link: function() {
				/*====================================================*/
				$(document).ready(function(){
                    var snapper = new Snap({ element: document.getElementById('content7'), disable: 'left'});
                    $("body #content7").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
                });
				/*====================================================*/
            }/* end */
}})
/*============================================================================================*/
.controller('MycvController', function($scope) {    

}).directive('mycvDir' , function (){
		return {
			link: function() {
                /*====================================================*/
                $(document).ready(function(){
                    /*====================================================*/
                    user_info = JSON.parse(localStorage.getItem("user_info"));
                    user_id = user_info[0].member_id;
                    /*====================================================*/
                    if(localStorage.getItem("user_skill") !== null )
                    {
                        var skills_now = JSON.parse(localStorage.getItem("user_skill"));
                        skills_now.forEach(function(element,index){
                            if( element[2]== "0" )
                            {$('#skill_uni').next(".skill_list").prepend('<span><i skill_id="'+element[1]+'"></i>'+element[0]+'</span>');}
                            if( element[2]== "1" )
                            {$('#skill_job').next(".skill_list").prepend('<span><i skill_id="'+element[1]+'"></i>'+element[0]+'</span>');}
                        });
                    }
                    /*====================================================*/
                    var snapper = new Snap({ element: document.getElementById('content2'), disable: 'left'});
                    /*====================================================*/
                    $("body #content2").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
                    
                    $("#skill_uni").submit(function(){
                        
                        var skill =  $("#skill").val().trim();
                        if(skill.length < 10 ){$('body .alert .msg').text("مهارت وارد شده باید حداقل 10 کاکتر باشد .").parent('.alert').removeClass('none'); return false;}
                        $('body .lpro').removeClass("none");
                    
                        $.post(base_url+"/api_inapp/add_skill/AminKarKhuneh1222/",{member_id:user_id,skill:skill,type:"0"},function(data){
                            $('body .lpro').addClass("none");
                            var res = JSON.parse(data);
                            $('#skill_uni').next(".skill_list").prepend('<span><i skill_id="'+res.insert_id+'"></i>'+skill+'</span>');
                            if(localStorage.getItem("user_skill") === null )
                            {        
                                var skills = [];
                                skills[0] = Array(skill,(res.insert_id),"0");
                                localStorage.setItem("user_skill", JSON.stringify(skills))
                               
                            }else{
                                var skills ;
                                skills = JSON.parse(localStorage.getItem("user_skill"));
                                skills.push(Array(skill,(res.insert_id),"0"));
                                localStorage.setItem("user_skill",JSON.stringify(skills));
                            }
                            $("#skill").val("");
                        })
                        .fail(function(){
                            $('body .lpro').addClass("none");
                            $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none');  
                        });
                        return false;
                    });
                    
                    /*====================================================*/
                    $("#skill_job").submit(function(){
                        
                        var skill =  $("#skill2").val().trim();
                        if(skill.length < 10 ){$('body .alert .msg').text("مهارت وارد شده باید حداقل 10 کاکتر باشد .").parent('.alert').removeClass('none'); return false;}
                        $('body .lpro').removeClass("none");
                    
                        $.post(base_url+"/api_inapp/add_skill/AminKarKhuneh1222/",{member_id:user_id,skill:skill,type:"1"},function(data){
                            $('body .lpro').addClass("none");
                            var res = JSON.parse(data);
                            $('#skill_job').next(".skill_list").prepend('<span><i skill_id="'+res.insert_id+'"></i>'+skill+'</span>');
                            if(localStorage.getItem("user_skill") === null )
                            {        
                                var skills = [];
                                skills[0] = Array(skill,(res.insert_id),"1");
                                localStorage.setItem("user_skill", JSON.stringify(skills))
                               
                            }else{
                                
                                var skills ;
                                skills = JSON.parse(localStorage.getItem("user_skill"));
                                skills.push(Array(skill,(res.insert_id),"1"));
                                localStorage.setItem("user_skill",JSON.stringify(skills));
                            }
                            $("#skill2").val("");
                        })
                        .fail(function(){
                            $('body .lpro').addClass("none");
                            $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none');  
                        });
                        return false;
                    });

                });
                /*====================================================*/
                $(".skill_list").on("click","span i",function(){
                    $('body .lpro').removeClass("none");
                    var id= $(this).attr("skill_id");
                    var skill_us = $(this);
                    $.post(base_url+"api_inapp/remove_skill/AminKarKhuneh13411",{id: id ,user_id: user_id},function(){
                        
                        $('body .lpro').addClass("none");
                        var skills =  JSON.parse(localStorage.getItem("user_skill"));
                        skills.forEach(function(element,index){
                            if(element[1]==id){
                                skills.splice( index , 1 );
                            }
                        });

                        localStorage.setItem("user_skill",JSON.stringify(skills));
                       
                        skill_us.parent("span").fadeOut(300);
                        
                    }).fail(function(){
                        $('body .lpro').addClass("none");
                        $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none'); 
                    });
                   
                    
                });
                /*====================================================*/
            }/* end */
}})
.controller('EditinfoController', function($scope) {

})
.directive('editinfoDir' , function (){
		return {
			link: function() {
				/*====================================================*/
				$(document).ready(function(){
                    /*====================================================*/
                    var snapper = new Snap({ element: document.getElementById('content3'), disable: 'left'});
                    $("body #content3").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
                    /*====================================================*/
                    user_info = JSON.parse(localStorage.getItem("user_info"));
                    console.log(user_info);
                    user_id = user_info[0].member_id;
                    /*====================================================*/
                    $("#name").val(user_info[0].name);
                    $("#age").val(user_info[0].age);
                    $("#married option[value="+user_info[0].married+"]").prop('selected', true);
                    $("#grade option[value="+user_info[0].grade+"]").prop('selected', true);
                    $("#gender option[value="+user_info[0].gender+"]").prop('selected', true);
                    $("#status option[value="+user_info[0].status+"]").prop('selected', true);
                    $("#description").val(user_info[0].description);
                    $("#field").val(user_info[0].field);
                    /*====================================================*/
                    states = JSON.parse(localStorage.getItem("state"));
                    cities = JSON.parse(localStorage.getItem("city")) ;
                    state_select = '<option value="0" selected>استان محل سکونت</option>';
                    states.forEach(function(element,index){state_select += '<option value="'+element.state_id+'" >'+element.state_name+'</option>';});
                    $("label#state select").append(state_select);
                    $("label#state select option[value="+user_info[0].state_id+"]").prop('selected', true);
                    /*====================================================*/
                    status_id = user_info[0].state_id;
                    arr = jQuery.grep(cities,function( st ){return st.state_id == status_id ; });
                    var city_select = '<option value="0" selected>شهر محل سکونت</option>' ;
                    cities.forEach(function(element,index){city_select +='<option value="'+element.city_id+'">'+element.city_name+'</option>';});
                    $("label#city select").html(city_select);
                    $("#city select option[value="+user_info[0].city_id+"] ").prop('selected', true);
                    /*====================================================*/
                    $("label#state select").on("change",function(){
                        status_id =  $(this).val();
                        arr = jQuery.grep(cities , function( st ) {return st.state_id == status_id ;});
                        var city_select = '<option value="0" selected>شهر محل سکونت</option>' ;
                        arr.forEach(function(element,index){city_select +='<option value="'+element.city_id+'">'+element.city_name+'</option>';});
                        $("label#city select").html(city_select);
                    });
                    /*====================================================*/
                    /*=====================reg_two submit===============================*/
                    now_year = moment().format('jYYYY');
                    var submited = 0;
                    usr_data = new Object();
                    $('#skill_uni').submit(function(){
                     
                        name = $("#name").val();
                        age = $("#age").val();
                        gender = $("#gender").val();
                        married = $("#married").val();
                        grade = $("#grade").val();
                        field = $("#field").val();
                        state = $("#state select").val();
                        city = $("#city select").val();
                        description = $("#description").val();
                        status = $("#status").val();

                        var errors_req = new Array();                        
                        $('#skill_uni .req').each(function(index,element){
                            if($(this).val() == "" || $(this).val() === undefined ){errors_req.push($(this).prev('span').text());}
                        });
                        if(errors_req.length > 0)
                        {
                            $('body .alert .msg').text(" فیلد  "+errors_req.join()+" خالی است ").parent('.alert').removeClass('none');
                            return false;
                        }

                        my_age = parseInt(now_year) - parseInt(age);
                        if( my_age < 16  || my_age > 71 )
                        {
                            $('body .alert .msg').text("سن شما باید بین 17 تا 70 سال باشد").parent('.alert').removeClass('none');
                            return false;
                        }

                        if(state == 0 || city ==0 )
                        {
                            $('body .alert .msg').text("انتخاب شهر و استان اجباری است . ").parent('.alert').removeClass('none');
                            return false;
                        }

                        if( gender == "null" )
                        {
                            $('body .alert .msg').text("لطفا جنسیت خود را انتخاب کنید").parent('.alert').removeClass('none');
                            return false;
                        }
                        $('body .lpro').removeClass("none");

                        usr_data.member_id = user_id ;
                        usr_data.email = user_info[0].email ;
                        usr_data.mobile = user_info[0].mobile ;
                        usr_data.name = name ;
                        usr_data.age = age ;
                        usr_data.married = married ;
                        usr_data.gender = gender ;
                        usr_data.grade = grade ;
                        usr_data.field = field ;
                        usr_data.description = description ;
                        usr_data.status = status ;
                        
                        usr_data.state_id = state;
                        usr_data.state = $("#state select option:selected").text();
                        usr_data.city_id = city ;
                        usr_data.city = $("#city select option:selected").text();
                        user_data_update = new Array();
                        user_data_update[0] = usr_data;
                        var result_update = JSON.stringify(user_data_update);
                        
                        submited++;
                        if(submited > 5){$('body .alert .msg').text("تعداد دفعات آپدیت بیش از حد مجاز بوده است . مجدد تلاش ننمایید").parent('.alert').removeClass('none'); return false; }
                        
                        $.post(base_url+"/api_inapp/edit_info/Ami3-nKarK7-9854KIHY/",{data:result_update},function(){
                            localStorage.setItem( "user_info" , result_update );
                            $('body .lpro').addClass("none");
                            $('body .alert .msg').text("اطلاعات کاربری شما با موفقیت به روز رسانی گردید").parent('.alert').removeClass('none');  
                        }).fail(function(){
                            $('body .lpro').addClass("none");
                            $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none');  
                        });
                        
                        return false;
                    
                    });
				    /*====================================================*/
                    /*====================================================*/
                    /*====================================================*/
                    
                });
				/*====================================================*/
            }/* end */
}})
.directive('editloginDir' , function (){
		return {
			link: function() {
				/*====================================================*/
				/*====================================================*/
            }
}})