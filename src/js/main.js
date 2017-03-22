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


    $(document).on("click", ".col .category-link", function(e) {
        if($(window).width() <= 991) {
            e.preventDefault();
            $(this).toggleClass("expanded").siblings("ul").toggle()
        }
    });

    $('.team-member').click(function() {
        $('.team-member').removeClass('active');
        $(this).find('.member-bio').scrollTop(0);
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

    $('.select-element').on('change', function() {
        var selectedValue = this.value;
        var selectLabel = $(this).parents('.select-wrapper').find('.select-label');
        if (selectedValue) {
            selectLabel.text(selectedValue);
        } else {
            var defaultLabelText = selectLabel.data('default-text');
            selectLabel.text(defaultLabelText);
        }

        if ($(this).is('#mce-COUNTRY')) {
            if (selectedValue == 'United States of America') {
                $('#mce-STATE')
                    .prop('disabled', false)
                    .parents('.select-wrapper').removeClass('disabled');
            } else {
                $('#mce-STATE')
                    .val('')
                    .prop('disabled', true)
                    .parents('.select-wrapper').addClass('disabled')
                    .find('.select-label').text('State/Province');
            }
        }
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

