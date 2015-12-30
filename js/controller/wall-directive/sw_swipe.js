var swiper2;
var is_use = 0;
var user_one = 0;
angular.module('myapp')
.directive('swSwipe', function (){
		return {
			link: function($scope) {
                $(document).ready(function () {
                    /*===============================================================================*/  
                    var snapper = new Snap({ element: document.getElementById('content6'), disable: 'left'});
                    $("body #content6").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
                    /*===============================================================================*/  
                    swiper2 = new Swiper( '.swiper1' ,{scrollbar: '.swiper-scrollbar', scrollbarHide: false,grabCursor: true});
                    /*===============================================================================*/   
                    swiper2.on('slideChangeEnd', function () {
            
                        var active_class = $(".swiper-slide-active").attr('actives'); 
                        var wbody = $("body").width();
                        var rw = ($(active_class).outerWidth()-8)+"px";
                        var rsw = 15 ;
                        $('.links a').length;
                        for( var i = 0 ; i < ( $('.links a').length ) ; i++ )
                        {
                            $this =  $('.links a:eq('+i+')');
                            if( $this.attr("id") == active_class.replace("#",'')){break;}
                            rsw += $this.outerWidth();
                        }
                        rsw = rsw - 5 ;
                        //console.log($('.scroller_asmin').css({"transform":"translate3d(-"+rws+" , 0px, 0px) !important","width": rw+" !important"}));
                        $('.scroller_asmin').attr("style","transform : translate3d(-"+rsw+"px , 0px, 0px) !important ;-webkit-transform : translate3d(-"+rsw+"px , 0px, 0px) !important ;");
                    });
                    height();
                    /*===============================================================================*/
                    get_count_mail();
                    function get_count_mail(){$.get(base_url+"/api_chat/count_new_msg/ChetGet-098ConTTHYT65VC-C276/"+localStorage.getItem("user_id"),function(data){var count = JSON.parse(data);if(count[0].count > 0){$(".msg i").show().text(count[0].count);}}); }    
                    /*===============================================================================*/
                    setInterval(function(){get_count_mail();},50000)
                });	
            },
        	templateUrl :  "pages/wall/sw_swipe.html"
			
}})
.directive('showuser1Dir' ,  function ($rootScope,$http){
    return {
			link: function(scope) {
                var dir = "showuser1-dir" ;
                var load_fun = show_user($rootScope,$http,scope,dir);
            },
            templateUrl :  "pages/wall/show_user.html"
}})
.directive('showuser2Dir' ,  function ($rootScope,$http){
    return {
			link: function(scope) {
                
                var dir = "showuser2-dir" ;
                var load_fun = show_user($rootScope,$http,scope,dir);
              
            },
            templateUrl :  "pages/wall/show_user.html"
}})
.directive('showuser3Dir', function ($rootScope,$http){
    return {
			link: function(scope) {
                
                var dir = "showuser3-dir" ;
                var load_fun = show_user($rootScope,$http,scope,dir);
               
            },
            templateUrl :  "pages/wall/show_user.html"
}})
.directive('showuser4Dir' ,  function ($rootScope,$http){
    return {
            link: function(scope) {
                var dir  = "showuser4-dir" ;
                var load_fun = show_user($rootScope,$http,scope,dir);
                 
            },
            templateUrl :  "pages/wall/show_user.html"
}})
.directive('showuser5Dir' ,  function ($rootScope,$http){
    return {
            link: function(scope) {
                var dir  = "showuser5-dir" ;
                var load_fun = show_user($rootScope,$http,scope,dir);
                 
            },
            templateUrl :  "pages/wall/show_user.html"
}});
/*===============================================================================*/  
function show_user($rootScope,$http,scope,dir){
    $(document).ready(function(){
        /*===============================================================================*/  
        /*===============================================================================*/  
        $("body .show_user_ss").on('click','.open_back_right',function(){
            $(dir).hide();
            $("body").find("#open-right").trigger("click");
        });
        /*===============================================================================*/  
        scope.now_year = moment().format('jYYYY');
        scope.base_url = base_url;
        scope.dir= dir;
        scope.follower = JSON.parse( localStorage.getItem("user_follower") ) ;
        scope.checked = JSON.parse( localStorage.getItem("user_checked") ) ;
        var user_data;
        /*===============================================================================*/  
        $("."+dir).on("click",".user_one",function(){
            
            var user =  $(this);
            user_id = user.attr("user_id");
            var in_scope = user.attr("scope");
            console.log(scope.follower);
            //history.pushState( null , null , "#/wall");
            //history.pushState( null , null , "#/wall?user_id="+$(this).attr("user_id")+"&scope="+in_scope );

            var data ;
            if(in_scope == "postone"){data = $rootScope.postone;}
            else if(in_scope == "postnear"){data = $rootScope.postnear;}
            else if(in_scope == "posthasjob"){ data = $rootScope.posthasjob;}
            else if(in_scope == "postneedjob"){data = $rootScope.postneedjob;}
            else if(in_scope == "myfollower"){data = $rootScope.myfollower;}
            else if(in_scope == "myfollowing"){data = $rootScope.myfollowing;}
            else if(in_scope == "mychecked"){data = $rootScope.mychecked;}
            else if(in_scope == "search"){data = $rootScope.search;}

            user_data = $.grep(data, function(data) {return data.member_id == user_id ;});
            scope.$apply(function(){scope.user_info = user_data;});   
            $(dir).show();
            $('.swiper-scrollbar').hide();

            $http.get(base_url+"/api_inapp/get_user_info/Att6i3-HaREWin0B3-98FFGG858HY/"+user_id+"/"+(localStorage.getItem("user_id")) ).success(function(data){
                scope.user_info = data.user_info ;
                scope.user_skill = data.user_skill;
            })
            .error(function(){

            });
        });
        /*=================================end click show user==============================================*/  
        /*end click.user_one*/
        $(".close").click(function(){
            $(dir).hide();
            $('.swiper-scrollbar').show();
        });
       
        /*===============================================================================*/  
        $("."+dir).on("click",".circle_btn_like",function(){
           
           var my_id = localStorage.getItem("user_id");
           var your_id= $(this).attr("user_id");

            if(!$(this).hasClass("active") ){
                $(this).addClass("active");
                $.get(base_url+"/api_flow/like_user/LIKOO-HaREWin0B3-98FFGG858HY/"+my_id+"/"+your_id,function(){
                    scope.follower.push(your_id);
                    localStorage.setItem('user_follower',JSON.stringify(scope.follower));
                });
            }
            else{
                 $(this).removeClass("active");
                 $.get(base_url+"/api_flow/dislike_user/D11sLIKOO-HaREWin0B3-98FFGG858HY/"+my_id+"/"+your_id,function(){
                     var index = scope.follower.indexOf(your_id);
                     if (index > -1) {scope.follower.splice(index, 1); }
                     localStorage.setItem('user_follower',JSON.stringify(scope.follower));
                });
            }
        });
        /*===============================================================================*/ 
        console.log(dir);
        $("."+dir).on("click",".circle_btn_view",function(){
            var my_id = localStorage.getItem("user_id");
            var your_id= $(this).attr("user_id");

            if(!$(this).hasClass("active") ){
                $(this).addClass("active");
                $.get(base_url+"/api_checked/checked_user/ch3ck3-dREWin0B3-98FFGG858HY/"+my_id+"/"+your_id,function(){
                   scope.checked.push(your_id);
                   localStorage.setItem('user_checked',JSON.stringify(scope.checked));  
                });
            }
            else{
                 $(this).removeClass("active");
                 $.get(base_url+"/api_checked/dischecked_user/D11discheckedsLIKOO-HaREWin0B3-98FFGG858HY/"+my_id+"/"+your_id,function(){
                   var index = scope.checked.indexOf(your_id);
                   if (index > -1) {scope.checked.splice(index, 1); }
                   localStorage.setItem('user_checked',JSON.stringify(scope.checked));
                });
            }
        });
        /*===============================================================================*/ 
        $(".circle_btn_msg").on("click",function(){
            
            localStorage.setItem('chat',JSON.stringify(user_data)) ;
            $rootScope.chat = user_data ;
            window.location.hash = "#/msg_detail";
            
        });
        /*===============================================================================*/ 

    });
    /*end document.ready*/
    
}