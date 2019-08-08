/**
 * Created by Evgeniy on 28.10.2016.
 */
$(document).ready(function() {

    init();

    function init() {
        addCostBreakdownHandler();
    }

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

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
            if($(window).width() >= 767)
            $('#main-section').height($(window).height() - $("#header").height());
        });
        $(window).resize();
    });

    //mobile navigation submenu
    $('.mobile-menu .dropdown').on('click touch', function() {
        $(this).find('ul').toggle();
    });

    //footer mobile menu
    $('.col').on('click touch', function(e) {
        if($(window).width() <= 991) {
            $(this).find('.category-link').toggleClass("expanded");
            $(this).find('.subcategory-links').toggle();
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
                supportOP: 15000,
                supportOttemo: 5000,
                swUpgrades: 20000,
                techStaffHires: 85000,
                subscriptionOP: 45000,
                subscriptionOttemo: 60000,
                web: 28800,
                database: 6000,
                firewall: 2400,
                balancer: 5100
            },
            MIDERPRISE: {
                buildOP: 125000,
                buildOttemo: 65000,
                advancedIntegrationOP: 10000,
                advancedIntegrationOttemo: 7500,
                gtmTimeOP: '9+ months',
                gtmTimeOttemo: '4 months',
                supportOP: 25000,
                supportOttemo: 7500,
                swUpgrades: 40000,
                techStaffHires: 120000,
                subscriptionOP: 75000,
                subscriptionOttemo: 120000,
                web: 52800,
                database: 9600,
                firewall: 3600,
                balancer: 6600
            },
            ENTERPRISE: {
                buildOP: 175000,
                buildOttemo: 85000,
                advancedIntegrationOP: 10000,
                advancedIntegrationOttemo: 7500,
                gtmTimeOP: '9+ months',
                gtmTimeOttemo: '4 months',
                supportOP: 25000,
                supportOttemo: 7500,
                swUpgrades: 40000,
                techStaffHires: 120000,
                subscriptionOP: 125000,
                subscriptionOttemo: 180000,
                web: 52800,
                database: 9600,
                firewall: 3600,
                balancer: 6600
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
            subscriptionOttemo_int = serverCosts['subscriptionOttemo'],
            supportOP_int = serverCosts['supportOP'],
            supportOttemo_int = serverCosts['supportOttemo'],
            swUpgrades_int = serverCosts['swUpgrades'],
            techStaffHires_int = serverCosts['techStaffHires'],
            subscriptionOP_int = serverCosts['subscriptionOP'],
            subscriptionSAAS_int = serverCosts['subscriptionOttemo'],
            serverOP_int = serverCosts['web'],
            databaseOP_int = serverCosts['database'],
            firewallOP_int = serverCosts['firewall'],
            balancerOP_int = serverCosts['balancer'],
            software_int = serverCosts['swUpgrades'],
            staff_int = serverCosts['techStaffHires'],

            // Calculate total annual costs
            infrastructure_cost_int = subscriptionOP_int + serverOP_int + databaseOP_int + firewallOP_int + balancerOP_int + software_int + staff_int + supportOP_int,

            total_one_yearOP_int = buildOP_int + advancedIntegrationOP_int + infrastructure_cost_int,
            total_two_yearOP_int = infrastructure_cost_int,
            total_one_yearOttemo_int = buildOttemo_int + advancedIntegrationOttemo_int + subscriptionOttemo_int,
            total_two_yearOttemo_int = subscriptionSAAS_int + supportOttemo_int,
            ottemo_money_saved = total_one_yearOP_int - total_one_yearOttemo_int;

        //Launch Costs
        $('.op-build').text(formatNum(buildOP_int));
        $('.ottemo-build').text(formatNum(buildOttemo_int));
        $('.op-advanced-cost').text(formatNum(advancedIntegrationOP_int));
        $('.ottemo-advanced-cost').text(formatNum(advancedIntegrationOttemo_int));
        $('.op-gtm-time').text(gtmTimeOp_int);
        $('.ottemo-gtm-time').text(gtmTimeOttemo_int);

        //Infrastructure Costs
        $('.op-total').text(formatNum(infrastructure_cost_int));
        $('.ottemo-total').text(formatNum(subscriptionSAAS_int) + '+');
        $('.op-subscription').text(formatNum(subscriptionOP_int));
        $('.ottemo-subscription').text(formatNum(subscriptionOttemo_int));
        $('.server .op').text(formatNum(serverOP_int));
        $('.database .op').text(formatNum(databaseOP_int));
        $('.firewall .op').text(formatNum(firewallOP_int));
        $('.balancer .op').text(formatNum(balancerOP_int));

        //Recurring Costs
        $('.op-support').text(formatNum(supportOP_int));
        $('.ottemo-support').text(formatNum(supportOttemo_int));
        $('.sw-upgrades').text(formatNum(swUpgrades_int));
        $('.tech-staff-hires').text(formatNum(techStaffHires_int));

        //Total Costs
        $('.op-total-one-year').text(formatNum(total_one_yearOP_int));
        $('.ottemo-total-one-year').text(formatNum(total_one_yearOttemo_int));
        $('.op-total-two-year').text(formatNum(total_two_yearOP_int));
        $('.ottemo-total-two-year').text(formatNum(total_two_yearOttemo_int));

        $('.op-budget').text(formatNum(total_one_yearOP_int));
        $('.ottemo-money-saved').text(formatNum(ottemo_money_saved));
    }

    $('#calc-form').on('submit', function(e) {
        e.preventDefault();
        $('.form-group').removeClass('has-error');
        $('input', '#calc-form').each(function () {
            var $el = $(this);
            if (!$el.val().length) {
                $el.closest('.form-group').addClass('has-error');
            }
        });

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

    // Add commas for user inputs that may have large numbers
    function addCommas(x) {
        var retVal = x.replace(/,/g, '');
        return retVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $('.tco-calc-user-inputs input').each( function() {
        $(this).on('change', function() {
            var errorClass = $(this).closest('.form-group');
            if ( errorClass.hasClass('has-error') ) {
                errorClass.removeClass('has-error')
            }
            var value = addCommas($(this).val());
            $(this).val(value);
        })
    });

    // TCO Calc Functions
    function addCostBreakdownHandler() {
        $('.cost-breakdown').click(function (e) {
            e.preventDefault();
            var $el = $(this);

            if ($el.find('i').hasClass('arrow-down')) {
                $('.monthly-breakdown').removeClass('hidden');
                $el.find('i').removeClass('arrow-down').addClass('arrow-up');
            } else {
                $('.monthly-breakdown').addClass('hidden');
                $el.find('i').addClass('arrow-down').removeClass('arrow-up');
            }
        });
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

const validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const checkValid = function(element) {
    for (let index = 0; index < element.length; index++) {
        if ($(element[index]).val().length <= 0 || $(element[index]).val() === 'not value') {
            $(element[index]).parent().addClass('check-error1')
        }
        else {
            $(element[index]).parent().removeClass('check-error1')
            if ($(element[index]).attr('type') === 'email') {
                if (!validateEmail($(element[index]).val())) {
                    $(element[index]).parent().addClass('check-error2')
                }
                else {
                    $(element[index]).parent().removeClass('check-error2')
                }
            }
            else if ($(element[index]).attr('type') === 'text') {
                if ($(element[index]).val().length <= 2) {
                    $(element[index]).parent().addClass('check-error2')
                }
                else {
                    $(element[index]).parent().removeClass('check-error2')
                }
            }
            else if ($(element[index]).attr('type') === 'number') {
                if ($(element[index]).val().length <= 7) {
                    $(element[index]).parent().addClass('check-error2')
                }
                else {
                    $(element[index]).parent().removeClass('check-error2')
                }
            }
            else if ($(element[index]).attr('type') === 'password') {
                if ($(element[index]).val().length <= 8) {
                    $(element[index]).parent().addClass('check-error2')
                }
                else {
                    $(element[index]).parent().removeClass('check-error2')
                }
            }
        }

    }
    if (element.parents('.step-form').find('.check-error1').length === 0 && element.parents('.step-form').find('.check-error2').length === 0) {
        return true
    }
    return false
}

$('.register-btn').on('click', function() {
    $('.body-wrapper').removeClass('opened')
    if ($('.modal-trial').find('.active').length === 0) {
        $($('.modal-trial').find('.step')[0]).addClass('active')
        $('.step1').addClass('active')
    }
    $('.overlay-trial').fadeIn()
    $('body').addClass('noScroll')
})

$('.button-trial_step1').on('click', function(e) {
    e.preventDefault()
    let element =  $(this).parents('.step-form').find('.step-form_input')
    if (checkValid(element)) {
        $($('.modal-trial').find('.step')[0]).removeClass('active').addClass('complete')
        $($('.modal-trial').find('.step')[1]).addClass('active')
        $('.step1').removeClass('active')
        $('.step2').addClass('active')
    }
})

$('.button-trial_step2').on('click', function(e) {
    e.preventDefault()
    let element =  $(this).parents('.step-form').find('.step-form_input')
    if (checkValid(element)) {
        $($('.modal-trial').find('.step')[1]).removeClass('active').addClass('complete')
        $($('.modal-trial').find('.step')[2]).addClass('active')
        $('.step2').removeClass('active')
        $('.step3').addClass('active')
    }
})

$('.button-trial_step3').on('click', function(e) {
    e.preventDefault()
    let element =  $(this).parents('.step-form').find('.step-form_input')
    if (checkValid(element)) {
        $('.overlay-trial').fadeOut()
        $('body').removeClass('noScroll')
    }
})

$('.step-point-inner').on('click', function() {
    $('.step-form').removeClass('active')
    $($('.modal-trial').find('.step')[Number($(this).attr('check')) - 1]).removeClass('complete').addClass('active')
    for (let index = Number($(this).attr('check')); index < 3; index++) {
        $($('.modal-trial').find('.step')[index]).removeClass('active').removeClass('complete')
    }
    $(`.step${$(this).attr('check')}`).addClass('active')
})

$('select.step-form_input').on('change', function() {
    $($(this).find('option')[0]).css('display', 'none')
})
