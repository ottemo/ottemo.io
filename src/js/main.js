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

    $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        //columnWidth: 200
    });

    $(function() {
        $(window).resize(function() {
            $('#main-section').height($(window).height());
        });
        $(window).resize();
    });

});