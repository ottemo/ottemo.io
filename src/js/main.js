/**
 * Created by Evgeniy on 28.10.2016.
 */
$(document).ready(function() {

    $("#owl-demo").owlCarousel({

        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true
    });

    $(function() {
        $(window).resize(function() {
            $('#main-section').height($(window).height());
        });
        $(window).resize();
    });

});