$(document).ready(function() {

  var fullPageCreated = false;
  var actionForMobileDevicesCreate = false;

  function fixContent() {
    if (!$('div').is('.fp-scroller')) return;

    var style = window.getComputedStyle($('.fp-scroller').get(0));  // Need the DOM object
    var matrix = new WebKitCSSMatrix(style.webkitTransform);
    var result = matrix.m42;

    result = -result;
    $('#content').css('transform', 'translateY(' + result + 'px)');
  }

  function moveToSection(e) {
    e.preventDefault();
    var target = $(e.target).attr('href').replace('#', '.');
    var offsetTop = $(target).offset().top;

    $('.top-bar__hamburger + .mobile-menu, #overlay').removeClass('is-visible');
    $('body').removeClass('hidden');
    $('.button-hamburger').removeClass('is-active');
    $('html, body').animate({
      scrollTop: offsetTop,
    }, 500);

    if ("pushState" in history) history.pushState("", document.title, window.location.pathname);
  }

  function toggleMobileMenu(e) {
    e.preventDefault();
    var createOverlay = '<div id="overlay">';

    if($('div').is('#overlay')) {
      $('.top-bar__hamburger + .mobile-menu, #overlay').toggleClass('is-visible');
    } else {
      $('body').append(createOverlay);
      $('.top-bar__hamburger + .mobile-menu, #overlay').addClass('is-visible');
    }
    $(this).toggleClass('is-active');
    $('body').toggleClass('hidden');

    if ($('#fullpage').attr('style') !== '') {
      $('#fullpage').attr('style', '');
    }
  }

  function fullPageInit() {
    $('#fullpage').fullpage({
      licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
      lockAnchors: false,
      anchors:['header', 'landers', 'offers', 'payouts', 'reporting'],
      scrollingSpeed: 500,
      scrollHorizontally: false,
      loopBottom: false,
      loopTop: false,
      recordHistory: true,
      scrollOverflow: true,
      scrollOverflowReset: true,
      sectionSelector: '.slide',
      onLeave: function(origin, destination, direction) {
        var leavingSection = this;

        if (origin.index == 0 && direction =='down' || origin.index == 2 && direction =='up') {
          $('.landers').on("wheel", fixContent);
        } else if (origin.index == 1 && direction =='down') {
          $('.landers').off("wheel", fixContent);
          var delay = 0;

          $('.offers').find('.offers__caption, .offers__bottom-content .animate').animate({
            top: 0,
            bottom: 0,
            opacity: 1
          }, 500);
          $('.offers').find('.media-item').delay(500).each(function(index, elem){
            delay += 100;
            $(elem).delay(delay).animate({
              opacity: 1
            }, 500);
         });
        } else if(origin.index == 2 && direction =='down') {
          $('.landers').off("wheel", fixContent);
          $('.payouts').find('.animate__left, .animate__right').animate({
            left: 0,
            right: 0,
            opacity: 1
          }, 500);
        }
      },
      afterLoad: function(origin, destination, direction) {
        var loadedSection = this;

        if (destination.anchor == 'offers') {
          var delay = 0;

          $('.offers').find('.offers__caption, .offers__bottom-content .animate').animate({
            top: 0,
            bottom: 0,
            opacity: 1
          }, 500);
          $('.offers').find('.media-item').delay(500).each(function(index, elem){
            delay += 100;
            $(elem).delay(delay).animate({
              opacity: 1
            }, 500);
         });
        } else if (destination.anchor == 'payouts') {
          $('.payouts').find('.animate__left, .animate__right').animate({
            left: 0,
            right: 0,
            opacity: 1
          }, 500);
        }

        if ("pushState" in history) { history.pushState("", document.title, window.location.pathname); }
        if(localStorage.length > 0) { localStorage.removeItem('hash'); }
      }
    });
    //methods
    $.fn.fullpage.setAllowScrolling(true);
  }

  $(window).resize(function() {
    if(window.innerWidth > 1023) {
      if (!fullPageCreated) {
        fullPageCreated = true;
        fullPageInit();
      }

      if (actionForMobileDevicesCreate) {
        actionForMobileDevicesCreate = false;
        $('.top-bar__hamburger + .mobile-menu, #overlay').removeClass('is-visible');
        $('.button-hamburger').removeClass('is-active');
        $('body').removeClass('hidden');
        $('.anchor-link').off('click', moveToSection);
        $('.button-hamburger').off('click', toggleMobileMenu);
      }
    }
    if (window.innerWidth < 1023) {
      if (fullPageCreated) {
        fullPageCreated = false;
        $.fn.fullpage.destroy('all');
      }

      if (!actionForMobileDevicesCreate) {
        actionForMobileDevicesCreate = true;
        $('.anchor-link').on('click', moveToSection);
        $('.button-hamburger').on('click', toggleMobileMenu);

        if ($('#content').attr('style') !== '') {
          $('#content').attr('style', '');
        }

        if(localStorage.length > 0) {
          $(".anchor-link[href='" + localStorage.getItem('hash') + "']").trigger('click');
          localStorage.removeItem('hash');
        }
      }
    }
  });

  $(window).resize();
});
