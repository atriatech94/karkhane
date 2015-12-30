/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


document.addEventListener("backbutton",amintest, false);
function amintest(){

    var loc =   window.location.hash;
    loc = loc.replace("#/", "");
    
    loc = loc.split('/');
    loc = loc[0] ;
    if($.fancybox.isOpen)
	{
		$.fancybox.close();
		return false;
	}
    if(loc == "wall" || loc == "select")
    {
       navigator.app.exitApp();
        return false;
    }
    else if(loc == "forget_pass" || loc == "register_one" || loc == "register_two" || loc == "register_three" || loc == "myprofile" || loc == "mycv" || 
           loc == "edit_info" || loc == "follower" || loc == "following" || loc == "search_result" || loc == "mycv" ||  loc == "msg" || loc == "msg_detail"   )
    {
         window.history.back() ;
    }
    else if(loc == "login")
    {
         window.location.hash = "#/select";
    }
    else
    {
	    window.location.hash = "#/wall";
    }
    return false;

}
$(document).ready(function(){
    height();
    $(window).on("resize",function(){
        height();
    });
    $('body').on("click",function(){
        //if($(".alert").css("display")!= "none"){$(".alert").fadeOut(300)}
    });
    $('.alert').on("click",function(){
        if(!$(this).hasClass("none")){$(this).addClass('none');}
    });
});

function height()
{
    var heigh100 =  $(window).height()+"px";
    $(".height100").css( "height" , heigh100 );
}
function exit()
{
    localStorage.clear();
    window.location.hash = "#/select";
}
 //document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //


