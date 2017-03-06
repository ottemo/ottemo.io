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
    });

    $('.team-member').click(function() {
        $('.team-member').removeClass('active');
        $(this).addClass('active');
    })

    $(".subnav .nav-item a").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top - 59;
        $(this).parents('ul').find('.nav-item').removeClass('active');
        $(this).parent().addClass('active');
        $('body,html').animate({scrollTop: top}, 300);
    });

    $(window).scroll(function () {
        var y = $(this).scrollTop();

        $('.subnav .nav-item a').each(function (event) {
            if (y >= $($(this).attr('href')).offset().top - 59) {
                $(this).parents('ul').find('.nav-item').removeClass('active');
                $(this).parent().addClass('active');
            }
        });
    });

});

$(window).scroll(function() {
    $('.animated').each(function(){
        var imagePos = $(this).offset().bottom;
        var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow+200) {
            $(this).addClass('wobble');
        }
    });
});

