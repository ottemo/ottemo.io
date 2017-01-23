/**
 * Created by Evgeniy on 28.10.2016.
 */
$(document).ready(function() {

    $("#owl-testimonials").owlCarousel({

        navigation : true,
        slideSpeed : 300,
        paginationSpeed : 400,
        autoHeight: true,
        singleItem: true
    });

    $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
    });

    $('#hamburger-menu-btn').click(function(){
        $('.body-wrapper').toggleClass('opened');
    });

    $(function() {
        $(window).resize(function() {
            $('#main-section').height($(window).height() - $("#header").height());
        });
        $(window).resize();
    });


    $(document).on("click", ".category-group .category-link", function(e) {
        if($(window).width() <= 991) {
            e.preventDefault();
            $(this).toggleClass("expanded").siblings("ul").toggle()
        }
    })
});

