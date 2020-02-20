//----------------------------------------------------------------------------------------------------------//
//-------------------------- Philos - Responsive Ecommerce Html Template -----------------------------------//
//---------------------------Created by Nileforest ---------------------------------------------------------//
(function($) {
    "use strict";
    let $window = $(window);
    let $document = $(document);
    let winWidthSm = 979;

    //mega menu
    let mega_height = $('#intro').height();
    let mega_width = $("#cat-menu").width();
    let mega_position = 0 - mega_width;

    $(".has-sub")
        .mouseenter(function() {
            $(this).find('.mega-menu').css({
                'height': mega_height,
                'right': mega_position,
                'display': 'block',
                'width': mega_width,
                'z-index': 9999
            });
        })
        .mouseleave(function() {
            $(this).find('.mega-menu').css({
                'display': 'none'
            });
        });

    // $(window).on('load', function() {
    //     // Animate loader off screen
    //     $(".se-pre-con").fadeOut();;
    // });

    // ---------------------------------------------------------------------------------------------------------------------------->
    // Navigation Dropdown Function   ||-----------
    // ---------------------------------------------------------------------------------------------------------------------------->
    $(function() {
        //Checks if li has sub (ul) and adds class for toggle icon - just an UI
        $('.navigation-menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
        // Dropdown Arrow Added
        $('.navigation-menu > ul > li.menu-dropdown-icon').append('<div class="dropworn-arrow"></div>');
        //Checks if drodown menu's li elements have anothere level (ul), if not the dropdown is shown as regular dropdown, not a mega menu
        $('.navigation-menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
        //Mobile Menu Html loaded
        $(".navigation-menu > ul").before("<a href=\"#\" class=\"menu-mobile\">Menu</a>");

        let navMenuLink = $(".navigation-menu > ul > li");
        let navMobileBtn = $(".menu-mobile");

        //If width is more than 943px Dropdowns are displayed on hover
        navMenuLink.on('mouseenter mouseleave', function(e) {
            if ($window.width() > parseInt(winWidthSm)) {
                $(this).children(".js-nav-dropdown").stop(true, false).fadeToggle(150);
                $(this).children(".dropworn-arrow").stop(true, false).fadeToggle(150);
                e.preventDefault();
            }
        });

        //If width is less or equal to winWidthSmpx dropdowns are displayed on click
        navMenuLink.on('click', function() {
            if ($window.width() <= parseInt(winWidthSm)) {
                $(this).children(".js-nav-dropdown").fadeToggle(150);
                $(this).children(".dropworn-arrow").hide();
            }
        });

        //when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story
        navMobileBtn.on('click', function(e) {
            $(".navigation-menu > ul").toggleClass('show-on-mobile');
            e.preventDefault();
        });

    });

    // ---------------------------------------------------------------------------------------------------------------------------->
    // Sticky Header Function  ||-----------
    // ---------------------------------------------------------------------------------------------------------------------------->
    $(function() {
        createSticky($("#header-sticky"));
        function createSticky(sticky) {
            if (typeof sticky !== "undefined") {
                let pos = sticky.offset().top,
                    win = $window;

                win.on("scroll", function() {
                    //win.scrollTop() >= pos ? sticky.addClass("fixed") : sticky.removeClass("fixed");
                    if( jQuery(window).scrollTop() > 300 ) {
                        sticky.addClass('fixed');
                        $("#mobile-detail-sticky").addClass('mobile-fixed');
                        $("#mobile-detail-sticky .product-rating").hide();
                        $("#footer-sticky").hide();
                    } else {
                        sticky.removeClass('fixed');
                        $("#footer-sticky").show();
                        $("#mobile-detail-sticky").removeClass('mobile-fixed');
                        $("#mobile-detail-sticky .product-rating").show();
                    }
                    if ( jQuery(window).scrollTop() > pos ) {
                        sticky.removeClass('fixed');
                        $("#footer-sticky").show();
                    }
                    pos = jQuery(window).scrollTop();
                });
            }
        }
    });

    // "Sticky" Desktop Device Enable ---- small Device Disable
    $window.bind('DOMContentLoaded load resize', function() {
        let headerInnerHeight = $(".header").innerHeight(),
            winInnerWidth = $window.innerWidth();

        if (winInnerWidth <= parseInt(winWidthSm)) {
            $('#header-sticky').addClass('no-stick');
            $('.header').css("height", "auto");
        } else {
            $('#header-sticky').removeClass('no-stick');
            $('.header').css("height", headerInnerHeight);
        };
    });

    // ---------------------------------------------------------------------------------------------------------------------------->
    // Elements  ||-----------
    // ---------------------------------------------------------------------------------------------------------------------------->
    $(function() {
        // (1). Sidebar Menu Function (Cart Menu) =======================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        let $menuSidebar = $('.sidebar-right');
        let $menusidebarNav = $('#sidebar_toggle_btn');
        let $menuSidebarclose = $('#sidebar_close_icon');
        let $menuSidebarOverlay = $('.sidebar_overlay');
        let $menuSidebarOverlayActive = $('.sidebar_overlay_active');

        /*sidebar menu navigation icon toggle*/

        $menusidebarNav.on('click', function() {
            $(this).toggleClass('active');
            $menuSidebar.toggleClass('sidebar-open');
            $menuSidebarOverlay.toggleClass('sidebar_overlay_active');

        });

        /*sidebar menu close icon*/
        $menuSidebarclose.on('click', function() {
            $menusidebarNav.removeClass('active');
            $menuSidebar.removeClass('sidebar-open');
            $menuSidebarOverlay.removeClass('sidebar_overlay_active');
        });

        /*Overlay Active*/
        $document.on('click touchstart', '.sidebar_overlay_active', function() {
            $menusidebarNav.toggleClass('active');
            $menuSidebar.toggleClass('sidebar-open');
            $menuSidebarOverlay.toggleClass('sidebar_overlay_active');
        });

        // (2). Search Overlay Menu =======================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        $(function() {
            let searchOverlayMenuBtn = $('#search-overlay-menu-btn'),
                searchMenuClose = $('.search-overlay-menu, .search-overlay-menu .search-overlay-close');

            searchOverlayMenuBtn.on('click', function(event) {
                $('.search-overlay-menu').addClass('open');
                setTimeout(function() { $('#overlay-search').focus() }, 500);

            });
            searchMenuClose.on('click keyup', function(event) {
                if (event.target == this || event.target.className == 'search-overlay-close' || event.keyCode == 27) {
                    $(this).removeClass('open');
                }
            });
        });

        // (3). Tabs (Tabs With OwlCarousel) =======================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            $($(e.target).attr('href'))
                .find('.owl-carousel')
                .owlCarousel('invalidate', 'width')
                .owlCarousel('update');
        });

        // (4). Tooltip Function =======================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        $('.js_tooltip').tipr();



        // (5) Backgrounds Image (Slider, Section, etc..) ===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        let pageSection = $('.slide-bg-image, .bg-image');
        pageSection.each(function(indx) {
            if ($(this).attr("data-background-img")) {
                $(this).css("background-image", "url(" + $(this).data("background-img") + ")");
            }
            if ($(this).attr("data-bg-position-x")) {
                $(this).css("background-position", $(this).data("bg-position-x"));
            }
        });

        // (6) Newsletter Popup =====================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        if ($window.width() > parseInt(winWidthSm)) {
            let nlpopup_expires = $("nlpopup").data("expires");
            let nlpopup_delay = $("nlpopup").data("delay") * 1500;

            let open_nlpopup = function() {
                let topoffset = $document.scrollTop(),
                    viewportHeight = $window.height(),
                    $popup = $('#nlpopup');
                let calculatedOffset = (topoffset + (Math.round(viewportHeight / 2))) - (Math.round($popup.outerHeight() / 2));

                if (calculatedOffset <= 40) {
                    calculatedOffset = 40;
                }

                $popup.css('top', calculatedOffset);
                $('#nlpopup, #nlpopup_overlay').fadeIn(500);
            };

            $('.nlpopup_close, #nlpopup_overlay').on('click', function(e) {
                $.cookie('nlpopup', 'closed', {
                    expires: nlpopup_expires,
                    path: '/'
                });
                $('#nlpopup, #nlpopup_overlay').fadeOut(200);
                e.preventDefault();
            });

            if ($.cookie('nlpopup') != 'closed') {
                setTimeout(open_nlpopup, nlpopup_delay);
            }
        };

        // (7) Accordian ======================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        /* Accordian Arrow Added*/
        $('ul.jq-accordian > li:has( > ul ) > a').append("<span class='jq-accordionIcon'></span>");
        /* Clickeble Link */
        $('ul.jq-accordian > li:has( > ul ) > a').attr('href', 'javascript:void(0)');
        /* Accordian Sub Childern "ul" Hide */
        $('ul.jq-accordian li ul').hide();

        let accordianClick = $('ul.jq-accordian li a');
        let accordionHeader = $('ul.jq-accordian > li > a');

        /* Accordian */
        accordianClick.on('click', function(event) {
            accordianClick.each(function(i) {
                if ($(this).next().is("ul") && $(this).next().is(":visible")) {
                    $(this).next().slideUp();
                }
            });

            let e = $(event.target);
            if (e.next().is("ul") && e.next().is(":visible")) {
                e.next().slideUp();

            } else {
                e.next().slideDown();

            }
        });

        /* Accordian Icon */
        accordianClick.on('click', function(e) {
            if ($(this).hasClass('is-active')) {
                $(this).removeClass('is-active');
            } else {
                /* close other content */
                accordionHeader.not(this).removeClass('is-active');
                $(this).addClass('is-active');
            }
        });

        // (9) Select Box ======================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        $(function() {
            $('.nice-select-box').niceSelect();
        });


        // (10) Toggle  ======================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        /*Slide Toggle*/
        $('.slide-toggle-btn').on('click', function(e) {
            $('#' + $(this).data('toggleTarget')).slideToggle(300);
        });

        //fade Toggle
        $('.fade-toggle-btn').on('click', function(e) {
            $('#' + $(this).data('toggleTarget')).fadeToggle(300);
        });

        // (11) Product Quantity '+', '-' ======================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        $(function() {
            let qty_min = $('.quantity').attr("min");
            let qty_max = $('.quantity').attr("max");

            $(".quantityPlus").on('click', function() {
                let currentVal = parseInt($(this).next(".quantity").val(), 10);
                let str = $("p:first").text();
                if (currentVal != qty_max) {
                    $(this).next(".quantity").val(currentVal + 1);
                }
            });

            $(".quantityMinus").on('click', function() {
                let currentVal = parseInt($(this).prev(".quantity").val(), 10);
                if (currentVal != qty_min) {
                    $(this).prev(".quantity").val(currentVal - 1);
                }
            });
        });

        // (12) product page - selecting color, selecting size, Grid/List View ==============================================================================
        /*Select Color*/
        // $('.color-selector .entry').on('click', function () {
        //     $(this).parent().find('.active').removeClass('active');
        //     $(this).addClass('active');
        // });

        // Select Size
        // $('.size-selector .entry').on('click', function () {
        //     $(this).parent().find('.active').removeClass('active');
        //     $(this).addClass('active');
        // });

        /*Grid/List View*/
        let productListBtn = $('.product-list-switcher');
        let productGridBtn = $('.product-grid-switcher');
        let productItemsWrap = $('.product-list-item');

        let product_view = getCookie('product_view');

        if (product_view == 'list') {
            productItemsWrap.addClass('product-list-view');
            productListBtn.addClass('product-view-icon-active')
            productGridBtn.removeClass('product-view-icon-active')
        } else {
            productItemsWrap.removeClass('product-list-view');
            productListBtn.removeClass('product-view-icon-active')
            productGridBtn.addClass('product-view-icon-active')
        }

        productListBtn.on('click', function(event) {
            event.preventDefault();
            productItemsWrap.addClass('product-list-view');
            productListBtn.addClass('product-view-icon-active');
            productGridBtn.removeClass('product-view-icon-active');
            setCookie('product_view', 'list', 2);
        });
        productGridBtn.on('click', function(event) {
            event.preventDefault();
            productItemsWrap.removeClass('product-list-view');
            productListBtn.removeClass('product-view-icon-active');
            productGridBtn.addClass('product-view-icon-active');
            setCookie('product_view', 'grid', 2);
        });
    });

    // ---------------------------------------------------------------------------------------------------------------------------->
    // Carousel (Owl, Slick product)  ||-----------
    // ---------------------------------------------------------------------------------------------------------------------------->

    $(function() {
        //Product page image slider with thumb (Slick Slider)
        let $sync1 = $(".product-image-slider"),
            $sync2 = $(".product-image-slider-thumbnails");

        $sync1.slick({
            dots: false,
            lazyLoad: 'ondemand',
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            asNavFor: $sync2,
            infinite: false
        });
        $sync2.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: $sync1,
            dots: false,
            centerMode: false,
            focusOnSelect: true,
            infinite: false
        });

        let thumbPadding = $('.product-image-slider-thumbnails').find('button').hasClass('slick-arrow');
        if (thumbPadding) {
            $('.product-image-slider-thumbnails').css('padding-left', '30px');
            $('.product-image-slider-thumbnails').css('padding-right', '30px');
        } else {

            $('.product-image-slider-thumbnails').css('margin-left', '-7px');
            $('.product-image-slider-thumbnails').css('margin-right', '-7px');
        };

        // $("#product-detail-page .product-image-slider .slick-current img").elevateZoom({
        //     zoomType: "inner",
        //     cursor: "crosshair"
        // });
        // $("#product-detail-page .product-image-slider").on("afterChange", function(event, slick, currentSlide) {
        //     $("#product-detail-page .product-image-slider .slick-current img").elevateZoom({
        //         zoomType: "inner",
        //         cursor: "crosshair",
        //     });
        // });

        //Product Item 5
        $('.product-item-5').owlCarousel({
            items: 5,
            loop: false,
            margin: 30,
            autoplay: true,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                320: {
                    items: 2
                },
                480: {
                    items: 2
                },
                775: {
                    items: 3
                },
                991: {
                    items: 4
                },
                1170: {
                    items: 5
                }
            }
        });

        //Product Item 4
        $('.product-item-4').owlCarousel({
            items: 4,
            loop: false,
            margin: 30,
            autoplay: true,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            autoplaySpeed: 3000,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                320: {
                    items: 2
                },
                480: {
                    items: 3
                },
                775: {
                    items: 3
                },
                991: {
                    items: 3
                },
                1170: {
                    items: 4
                }
            }
        });

        //Product Item 3
        $('.product-item-3').owlCarousel({
            items: 3,
            loop: false,
            margin: 30,
            autoplay: false,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                775: {
                    items: 2
                },
                991: {
                    items: 3
                },
                1170: {
                    items: 3
                }
            }
        });

        //Product Item 2
        $('.product-item-2').owlCarousel({
            items: 2,
            loop: false,
            margin: 30,
            autoplay: false,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                775: {
                    items: 1
                },
                991: {
                    items: 2
                },
                1170: {
                    items: 2
                }
            }
        });

        //Product Item 1
        $('.product-item-1').owlCarousel({
            items: 1,
            loop: false,
            margin: 30,
            autoplay: false,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                775: {
                    items: 1
                },
                991: {
                    items: 1
                },
                1170: {
                    items: 1
                }
            }
        });

        // Blog Carousel
        $('.blog-carousel').owlCarousel({
            items: 4,
            loop: false,
            margin: 30,
            autoplay: false,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                775: {
                    items: 1
                },
                991: {
                    items: 2
                },
                1170: {
                    items: 3
                }
            }
        });
        // Blog Carousel
        $('.testimonials-carousel').owlCarousel({
            items: 1,
            loop: true,
            margin: 0,
            slideSpeed: 300,
            autoplay: true,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: false,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            nimateIn: 'fadeIn',
            animateOut: 'fadeOut'

        });

        //Brand Logo Carousel
        $('.brand-logo-carousel').owlCarousel({
            items: 7,
            loop: true,
            margin: 0,
            autoplay: true,
            autoplayHoverPause: true,
            singleItem: true,
            dots: false,
            nav: false,
            transitionStyle: true,
            responsive: {
                0: {
                    items: 1
                },
                250: {
                    items: 1
                },
                320: {
                    items: 2
                },
                480: {
                    items: 3
                },
                775: {
                    items: 4
                },
                991: {
                    items: 6
                },
                1170: {
                    items: 7
                }
            }
        });
    });
    // ----------------------------------------------------------------------------------------------------------------------------->
    // Custom data theme event
    // ----------------------------------------------------------------------------------------------------------------------------->
    /* ajax cart item remove */
})(jQuery);

/*********************************************************************************************************/
/*****************************************QHXH js code****************************************************/
/*********************************************************************************************************/
$(document).ready(function() {
    /////////////////////////////////////////////////
    // setup notification////////////////////////////
    /////////////////////////////////////////////////
    menu_responsive();
    add_to_cart_ajax();
    remove_cart_item_from_widget();
    add_to_wishlist_ajax();
    change_product_filter();

    if (window.screen.availWidth > 575 && $("#sticky-dynamic").length) {
        var sidebar = new StickySidebar('#sticky-dynamic', {
            containerSelector: '#sticky-content',
            innerWrapperSelector: '.sidebar__inner',
            topSpacing: 100,
            bottomSpacing: 100
        });
    }
});

//------------------------------------------------------------------------------------------------------------->
//- product attributes change
//------------------------------------------------------------------------------------------------------------->

function onChangeSwatchesSuccess(data) {
    if (data.error || data.is_out_of_stock) {
        $("#product-detail").find(".is-out-of-stock").html('<span class="stock-block out-stock-block">Hết hàng</span>');
        $("#product-detail").find(".sku").text('N/A');
        $("#hidden-product-id").val(-1);
        $("#btn-add-cart-detail").prop("disabled",true);
        return false;
    }

    $("#btn-add-cart-detail").prop("disabled",false);
    $("#product-detail").find(".is-out-of-stock").html('<span class="stock-block in-stock-block">Còn hàng</span>');
    $("#product-detail").find(".sku").text(data.sku);

    $("#hidden-product-id").val(data.id);
    //price
    let product_sale_price = data.sale_price;
    let product_price = data.price;

    let price_element = '';

    if (product_sale_price !== product_price) {
        price_element += '<del>' + data.display_price + '</del>';
        price_element += '<span>';
        price_element += '<span class="product-price-text">' + data.display_sale_price + '</span>';
        price_element += '</span>';
    } else {
        price_element += '<span>';
        price_element += '<span class="product-price-text">' + data.display_price + '</span>';
        price_element += '</span>';
    }
    $(".product-price").html(price_element);

    //description
    if (data.description !== null) {
        $("#detail-description").text(data.description);
    }

    //image
    let product_image_detail = data.image_with_sizes.origin;
    let product_image_thumb = data.image_with_sizes.thumb;

    //update hidde

    let product_img_slider = '';
    let product_thumb_slider = '';

    for (let i = 0; i < product_image_detail.length; i++) {
        product_img_slider += '<div class="item">';
        product_img_slider += '<img src="' + product_image_detail[i] + '" data-lazy="' + product_image_detail[i] + '"/>';
        product_img_slider += '</div>';
    }
    for (let i = 0; i < product_image_detail.length; i++) {
        //thumb
        product_thumb_slider += '<div class="item">';
        product_thumb_slider += '<img data-lazy="' + product_image_thumb[i] + '"/>';
        product_thumb_slider += '</div>';
    }

    let $sync1 = $(".product-image-slider");
    let $sync2 = $(".product-image-slider-thumbnails");

    $sync1.slick("unslick").empty().html(product_img_slider);
    $sync2.slick("unslick").empty().html(product_thumb_slider);
} //

function onChangeSwatchesComplete(data) {
    if (data.responseJSON.error === 1) {
        console.log('Message from onChageSwathchesComplete: ' + data.responseJSON.msg);
        return false;
    }
    restart_slick_slider(data);
} //

function restart_slick_slider(data) {
    //Product page image slider with thumb (Slick Slider)
    let $sync1 = $(".product-image-slider");
    let $sync2 = $(".product-image-slider-thumbnails");

    $sync1.slick({
        dots: false,
        lazyLoad: 'progressive',
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        asNavFor: $sync2,
        infinite: false
    });
    $sync2.slick({
        slidesToShow: 4,
        lazyLoad: 'progressive',
        slidesToScroll: 1,
        asNavFor: $sync1,
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        infinite: false
    });

    let thumbPadding = $('.product-image-slider-thumbnails').find('button').hasClass('slick-arrow');
    if (thumbPadding) {
        $('.product-image-slider-thumbnails').css('padding-left', '30px');
        $('.product-image-slider-thumbnails').css('padding-right', '30px');
    } else {

        $('.product-image-slider-thumbnails').css('margin-left', '-7px');
        $('.product-image-slider-thumbnails').css('margin-right', '-7px');
    };

    //reset zoom image
    // $("#product-detail-page .product-image-slider .slick-current>img").elevateZoom({
    //     zoomType: "inner",
    //     cursor: "crosshair"
    // });
} //

function _quickview_slick_product() {
    $(document).ready(function() {
        //Product page image slider with thumb (Slick Slider)
        let $sync1 = $("#quickview-page .product-image-slider"),
            $sync2 = $("#quickview-page .product-image-slider-thumbnails");

        $sync1.slick({
            dots: false,
            lazyLoad: 'progressive',
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: false,
            asNavFor: $sync2,
            infinite: false
        });
        $sync2.slick({
            slidesToShow: 4,
            lazyLoad: 'progressive',
            slidesToScroll: 1,
            asNavFor: $sync1,
            dots: false,
            centerMode: false,
            focusOnSelect: true,
            infinite: false
        });

        let thumbPadding = $('#quickview-page .product-image-slider-thumbnails').find('button').hasClass('slick-arrow');
        if (thumbPadding) {
            $('#quickview-page .product-image-slider-thumbnails').css('padding-left', '30px');
            $('#quickview-page .product-image-slider-thumbnails').css('padding-right', '30px');
        } else {

            $('#quickview-page .product-image-slider-thumbnails').css('margin-left', '-7px');
            $('#quickview-page .product-image-slider-thumbnails').css('margin-right', '-7px');
        };
    });
} //

function _quickview_qty_btn() {
    let qty_min = $('#quickview-page .quantity').attr("min");
    let qty_max = $('#quickview-page .quantity').attr("max");

    $("#quickview-page .quantityPlus").off('click').on('click', function() {
        let currentVal = parseInt($(this).next(".quantity").val(), 10);
        let str = $("p:first").text();
        if (currentVal != qty_max) {
            $(this).next(".quantity").val(currentVal + 1);
        }
    });

    $("#quickview-page .quantityMinus").off('click').on('click', function() {
        let currentVal = parseInt($(this).prev(".quantity").val(), 10);
        if (currentVal != qty_min) {
            $(this).prev(".quantity").val(currentVal - 1);
        }
    });
} //

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
} //

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
} //

function add_to_cart_ajax() {
    let $productItem = $('.product-item');
    $productItem.off("click").on("click", ".btn-add-cart", function (event) {
        event.preventDefault();
        let _self = $(this);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: _self.data('cart-url'),
            method: 'POST',
            data: {
                id: _self.data('id')
            },
            dataType: 'json',
            beforeSend: function () {
                _self.prop('disable', true);
                _self.addClass('sending');
            },
            success: function (response) {
                _self.prop('disable', false);
                _self.removeClass('sending');

                if (response.error) {
                    swal( 'Thêm sản phẩm không thành công', response.message, 'warning');
                    return false;
                }
                //update some field
                let cart_content = response.data.content;
                let cart_size = cart_content.length;
                let cart_item_element = '';

                for (let i = 0; i < cart_size; i++) {
                    cart_item_element += '<li class="item-' + cart_content[i].rowId + '">';
                    cart_item_element += '<a href="#" class="product-image"><img src="' + cart_content[i].options['image'] + '" alt="" /></a>';
                    cart_item_element += '<div class="product-content">';
                    cart_item_element += '<a class="product-link" href="#">' + cart_content[i].name + '</a>';

                    cart_item_element += '<div class="cart-collateral">';
                    cart_item_element += '<span class="qty-cart">' + cart_content[i].qty + '</span>&nbsp;<span>&#215;</span>&nbsp;<span class="product-price-amount">' + cart_content[i].price.toLocaleString("vn-VN") + 'đ</span>';
                    cart_item_element += '</div>';

                    cart_item_element += '<a data-id="' + cart_content[i].rowId + '" class="product-remove" href="javascript:void(0)"><i class="fa fa-times-circle" aria-hidden="true"></i></a>';
                    cart_item_element += '</div>';
                    cart_item_element += '</li>';
                }

                let cart_element = $(".cart-product-item");
                cart_element.html(cart_item_element);
                $(".cart-total-price").text(response.data.total_price);
                $(".cart-price").text(response.data.total_price);
                $(".cart-count").text(response.data.count);

                /*sidebar menu navigation icon toggle*/
                $('.sidebar-right').toggleClass('sidebar-open');
                $('.sidebar_overlay').toggleClass('sidebar_overlay_active');
            },
            error: function (data) {
                //debug
                console.log(data);
            }
        });
    }); //
}

function remove_cart_item_from_widget() {
    let $sidebar_right = $("#sidebar-right");
    $sidebar_right.off("click").on("click", ".product-remove", function(event) {
        event.preventDefault();
        let _self = $(this);
        let item_id = _self.data('id');
        let current_item_li = $('.item-' + item_id);
        current_item_li.fadeOut(300);

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: _self.data('url-remove-cart'),
            method: 'GET',
            data: {
                id: item_id
            },
            beforeSend: function () {

            },
            success: function(response) {
                $(".cart-total-price").text(response.data.total_price);
                $(".cart-price").text(response.data.total_price);
                $(".cart-count").text(response.data.count);
            }
        }); // end $ajax
    }); //
}

function add_to_wishlist_ajax() {
    $(".product-item").on("click", ".btn-add-wishlists", function(event) {
        event.preventDefault();
        let _self = $(this);

        let logged_in = _self.data('user-logged');
        if (logged_in != 1) {
            window.location.replace(_self.data('link-login'));
            return false;
        }

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: _self.data('link-add-wishlish'),
            method: 'GET',
            beforeSend: function () {

            },
            success: function(response) {
                if (response.message) {
                    if (response.error) {
                        Lobibox.alert(
                            'warning', // Any of the following
                            {
                                closeButton: true,
                                msg: response.message,
                            }
                        );
                    }
                    else {
                        Lobibox.alert(
                            'success', // Any of the following
                            {
                                closeButton: true,
                                msg: response.message,
                            }
                        );
                    }
                } else {
                    window.location.replace(_self.data('link-login'));
                }
            }
        });
    }); //
}

function change_product_filter() {
    /* filter bar and sidebar filter click submit form */
    $('#product-filter-form').on('change', '.product-filter-item, .product-show-item', function() {
        $("#product-filter-form").submit();
    });

    $('#product-show-form').on('change', '.product-show-item', function() {
        $("#product-show-form").submit();
    });
}

function menu_responsive() {
    var val = 1;

    $("#menu-btn").click(function(){

        if (val == 1) {

            $("header nav").animate({
                'left' : '0'
            });
            val = 0;
        } else{
            val = 1;
            $("header nav").animate({
                'left' : '-100%'
            });
        }

        return false;
    });

    // submenu
    $('.sub-menu').click(function(){
        $(this).children('.children').slideToggle();
    })
}