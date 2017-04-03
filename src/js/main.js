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

    // mobile menu show/hide
    $('#hamburger-menu-btn').click(function(){
        $('.mobile-menu li a').first().scrollTop(0);
        console.log($('.mobile-menu li').first());
        $('.body-wrapper').toggleClass('opened');
    });

    $(function() {
        $(window).resize(function() {
            $('#main-section').height($(window).height() - $("#header").height());
        });
        $(window).resize();
    });

    //footer mobile menu
    $(document).on("click", ".col .category-link", function(e) {
        if($(window).width() <= 991) {
            e.preventDefault();
            $(this).toggleClass("expanded").siblings("ul").toggle()
        }
    });


    $('.team-member').click(function() {
        if (!$(this).hasClass('active')) {
            $('.team-member').removeClass('active');
            $(this).find('.member-bio').scrollTop(0);
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    //Services page sub navigation scroll
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

    //Show partner's info popup functionality
    function showPartnerInfo() {
        const partner = $(this).data('partner');
        const partnerInfo = $(`.reveal-overlay[data-partner="${partner}"]`);
        const body = $('body');
        body.addClass('noscroll');
        partnerInfo.addClass('active');
    }

    $('.partner-info').on('click', showPartnerInfo);


    $('.popup-close').on('click', function() {
        $('body').removeClass('noscroll');
        $(this).parents('.reveal-overlay').removeClass('active');
    });










    function roiCalculator(revenue) {
        // Revenue is used to calculate costs
        var serverCosts;

        var SERVER_COSTS = {
            GROWING: {
                buildOP: 75000,
                buildOttemo: 45000,
                advancedIntegrationOP: 5000,
                advancedIntegrationOttemo: 5000,
                gtmTimeOP: '5-6 months',
                gtmTimeOttemo: '3 months',
                subscriptionOP: 207000,
                subscriptionOttemo: 60000,
                supportOP: 15000,
                supportOttemo: 5000,
                swUpgrades: 20000,
                techStaffHires: 85000
            },
            MIDERPRISE: {
                buildOP: 125000,
                buildOttemo: 65000,
                advancedIntegrationOP: 10000,
                advancedIntegrationOttemo: 7500,
                gtmTimeOP: '9+ months',
                gtmTimeOttemo: '4 months',
                subscriptionOP: 333000,
                subscriptionOttemo: 120000,
                supportOP: 25000,
                supportOttemo: 7500,
                swUpgrades: 40000,
                techStaffHires: 120000
            },
            ENTERPRISE: {
                buildOP: 175000,
                buildOttemo: 85000,
                advancedIntegrationOP: 10000,
                advancedIntegrationOttemo: 7500,
                gtmTimeOP: '9+ months',
                gtmTimeOttemo: '4 months',
                subscriptionOP: 383000,
                subscriptionOttemo: 180000,
                supportOP: 25000,
                supportOttemo: 7500,
                swUpgrades: 40000,
                techStaffHires: 120000
            }
        };

        // Set server costs based on business types
        if (revenue < 5e6) {
            serverCosts = SERVER_COSTS['GROWING'];
        } else if (revenue < 12e6) {
            serverCosts = SERVER_COSTS['MIDERPRISE'];
        } else {
            serverCosts = SERVER_COSTS['ENTERPRISE'];
        }

        updateTcoCosts(revenue, serverCosts);
    }

    function updateTcoCosts(revenue, serverCosts) {
        // Get values and do the math
        var buildOP_int = serverCosts['buildOP'],
            buildOttemo_int = serverCosts['buildOttemo'],
            advancedIntegrationOP_int = serverCosts['advancedIntegrationOP'],
            advancedIntegrationOttemo_int = serverCosts['advancedIntegrationOttemo'],
            gtmTimeOp_int = serverCosts['gtmTimeOP'],
            gtmTimeOttemo_int = serverCosts['gtmTimeOttemo'],
            subscriptionOP_int = serverCosts['subscriptionOP'],
            subscriptionOttemo_int = serverCosts['subscriptionOttemo'],
            supportOP_int = serverCosts['supportOP'],
            supportOttemo_int = serverCosts['supportOttemo'],
            swUpgrades_int = serverCosts['swUpgrades'],
            techStaffHires_int = serverCosts['techStaffHires'],

            // Calculate total annual costs
            total_one_yearOP_int = buildOP_int + advancedIntegrationOP_int + subscriptionOP_int,
            total_two_yearOP_int = subscriptionOP_int,
            total_one_yearOttemo_int = buildOttemo_int + advancedIntegrationOttemo_int + subscriptionOttemo_int,
            total_two_yearOttemo_int = subscriptionOttemo_int + supportOttemo_int;

        // Set the values in the elements
        $('.op-build').text(formatNum(buildOP_int));
        $('.ottemo-build').text(formatNum(buildOttemo_int));
        $('.op-advanced-cost').text(formatNum(advancedIntegrationOP_int));
        $('.ottemo-advanced-cost').text(formatNum(advancedIntegrationOttemo_int));
        $('.op-gtm-time').text(gtmTimeOp_int);
        $('.ottemo-gtm-time').text(gtmTimeOttemo_int);
        $('.op-subscription').text(formatNum(subscriptionOP_int));
        $('.ottemo-subscription').text(formatNum(subscriptionOttemo_int));
        $('.op-support').text(formatNum(supportOP_int));
        $('.ottemo-support').text(formatNum(supportOttemo_int));
        $('.sw-upgrades').text(formatNum(swUpgrades_int));
        $('.tech-staff-hires').text(formatNum(techStaffHires_int));
        $('.op-total-one-year').text(formatNum(total_one_yearOP_int));
        $('.ottemo-total-one-year').text(formatNum(total_one_yearOttemo_int));
        $('.op-total-two-year').text(formatNum(total_two_yearOP_int));
        $('.ottemo-total-two-year').text(formatNum(total_two_yearOttemo_int));
    }

    $('#calc-form').on('submit', function(e) {
        e.preventDefault();
        var revenue = $('#revenue').val().replace(/\D+/g, '') || 0;
        if (+ revenue) {
            roiCalculator(revenue);
        }
    });

    // Add comma seperators for thousands
    function formatNum(x) {
        x = x.toFixed(0);
        return '$' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

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
