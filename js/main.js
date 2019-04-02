$(document).ready(function () {
    //slick slider
    $('.comps-slider.sold').slick({
        slidesToShow: 3,
        prevArrow: $('.sold.arrows .prev'),
        nextArrow: $('.sold.arrows .next'),
        infinite: false,
        responsive:[
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 630,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.comps-slider.pending').slick({
        slidesToShow: 3,
        prevArrow: $('.pending.arrows .prev'),
        nextArrow: $('.pending.arrows .next'),
        infinite: false,
        responsive:[
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 630,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    
    $('.comps-slider.active').slick({
        slidesToShow: 3,
        prevArrow: $('.active.arrows .prev'),
        nextArrow: $('.active.arrows .next'),
        infinite: false,
        responsive:[
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 630,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Remove/Add Comparable

    $('body').on('click', '.toggle-comp', function(){
        if($(this).hasClass('add')){
            $(this).removeClass('add');
            $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'+
            '<span class="m-l-5">Remove from comparables</span>')
            $(this).parents('.listing').removeClass('removed')
        } else{
            $(this).addClass('add');
            $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'+
            '<span class="m-l-5">Add to comparables</span>')
            $(this).parents('.listing').addClass('removed')
        }
    });

    // show/hide get alerts

    var triggerTop = $('.get-alerts-trigger').offset().top;
    var triggerLeft = $('.get-alerts-trigger').offset().left;
    var triggerHeight = $('.get-alerts-trigger').height();
    $('.get-alerts').css({
        'top': triggerTop + triggerHeight + 5 + 'px',
        'left': triggerLeft + 'px',
    });

    $('body').on('click', '.get-alerts-trigger', function(){     
        if($('.get-alerts').hasClass('open')){
            $('.get-alerts').removeClass('open');
        }else{
            $('.get-alerts').addClass('open');
        }
    });

    $('body').on('click', function(e){
        if($('.popup.open').length){
            if($(e.target).hasClass('popup-trigger') == false){
                if($(e.target).parents('.popup').length == 0 && !$(e.target).hasClass('popup')){
                    $('.get-alerts, .get-alerts-bottom').removeClass('open');
                }
            }
        }
    });

    //Scroll Popup

    var seen = false;
    $(window).scroll(function(){
        var wTop = $(window).scrollTop();
        var compTop = $('.hv-bottom').offset().top;
        if(wTop >= compTop - 300 && !seen){
            $('.get-alerts-bottom').addClass('open');
            seen = true;
        }
    });

    // Mobile Sticky CTA

    var wWidth = $(window).width();
    var propDetailsHeight = $('.prop-details').innerHeight();
    var ctaHeight = $('.cta-bar').innerHeight();
    var ctaTop = $('.cta-bar').offset().top;

    if(wWidth <= 630){
        $('.cta-bar').css({
            'top': propDetailsHeight + 'px',
            // 'box-shadow': '0px -3px 6px rgba(0, 0, 0, 0.11);'
        });
    
        $('.hv-top .col:last-child').css({
            'margin-top': propDetailsHeight + ctaHeight + 'px'
        });
        $(window).scroll(function(){
            var wTop = $(window).scrollTop();
                if(wTop >= ctaTop){
                    $('.cta-bar').css({
                        'position': 'fixed',
                        'top': '0',
                        'box-shadow': '0px 2px 6px rgba(0, 0, 0, 0.11)'
                    });
                } else{
                    $('.cta-bar').css({
                        'position': 'absolute',
                        'top': propDetailsHeight + 'px',
                        'box-shadow': '0px -3px 6px rgba(0, 0, 0, 0.11)'
                    });
                }
        })
    }
    

    // HV Chart

    var hvCityData = [400000, 510000, 280000, 390000, 400000, 420000];
    var hvCompsData = [300000, 310000, 280000, 290000, 300000, 320000];
    var homeEstimate = [300000, 300000, 300000, 300000, 300000, 300000];
    var hvCombinedData = hvCityData.concat(hvCompsData, homeEstimate);
    var priceMax = (Math.max.apply(null, hvCombinedData));
    var priceMin = (Math.min.apply(null, hvCombinedData));
    var priceFormat = function(){
        if( priceMax > 1000000) {
            return '($0.0a)'
        } else{
            return '($0a)'
        }
    };

    
    var hvChartOptions = {
        maintainAspectRatio: false,
        bezierCurve: false,
        title: {
            display: false
        },
        legend: {
            display: false
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return tooltipItem.datasetIndex, data.datasets[tooltipItem.datasetIndex].label + ": " + numeral(Number(tooltipItem.yLabel)).format('$0,0')
                }
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                ticks: {
                    suggestedMin: (Math.min.apply(null, hvCombinedData) - 50000),
                    suggestedMax: (Math.max.apply(null, hvCombinedData) + 50000),
                    userCallback: function (value, index, values) {
                        value = numeral(value).format(priceFormat())
                        return value;
                    }
                }
            }],
        },
        plugins: {
            datalabels: {
                display: false
            }
        }
    };
    var ctx = document.getElementById("hv-chart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jun", "Jul", "Sep", "Oct", "Nov", "Dec",],
            datasets: [{
                label: 'Your Current Value',
                backgroundColor: "transparent",
                borderColor: "#179EFF",
                borderDash: [10, 5],
                data: homeEstimate,
                pointBorderColor: 'transparent'
            },
                {
                label: 'Comp. Homes',
                backgroundColor: "#BBE3FF",
                borderColor: "transparent",
                data: hvCompsData,
            }, 
            {
                label: 'Eagle Mountain',
                backgroundColor: "#79C7FF",
                borderColor: "transparent",
                data: hvCityData,
            }
            ],
        },
        options: hvChartOptions
    });
});
