angular.module('myapp')
.controller('WallController', function() {
          
})
.directive('wallDir' , function (){
		return {
			link: function() {
				/*====================================================*/
                var snapper = new Snap({ element: document.getElementById('content4'), disable: 'left'});
                $("body #content4").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
				/*====================================================*/
				
            }/* end */
}})

