$(document).ready(function(){

  $(window).resize(function(e){
    var mobileMenuHeight = $('.mobile-menu').height(window.innerHeight - 60);
  });
  $('.button-hamburger').on('click', function(e) {
    var createOverlay = '<div id="overlay">';
    if($('div').is('#overlay')) {
      $('.top-bar__hamburger + .mobile-menu, #overlay').toggleClass('is-visible');
    } else {
      $('body').append(createOverlay);
      $('.top-bar__hamburger + .mobile-menu, #overlay').addClass('is-visible');
    }
    $(this).toggleClass('is-active');
    $('body').toggleClass('hidden')
  });

  $('.anchor-link, .link-back').click(function(e) {
    var getHash = $(this).attr('data-hash');
    localStorage.setItem('hash', getHash);
  });
  function animateElemnts() {
    if($('.animate__left, .animate__right').is(':hidden')) {
      $('.animate__left, .animate__right').show().animate({
        left: 0,
        right: 0,
        opacity: 1
      }, 500);
    } else if($('.animate__single').is(':hidden')) {
      $('.animate__single').show().animate({
        opacity: 1
      }, 500);
    }
  }

  $(window).resize(function(e){
    if(window.innerWidth > 1023 && window.innerHeight > 700) {
      setTimeout(function() {
        animateElemnts();
        return false;
      }, 500);
      e.preventDefault();
    } else {
      return false;
    }
  });

  $(window).resize();

  $('.owl-carousel').owlCarousel({
    items:1,
    nav:false,
    navText: ['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 129 129"><path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" fill="#39bfe8"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 129 129" enable-background="new 0 0 129 129"><path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" fill="#39bfe8"/></svg>'],
    dots: true,
    loop:true,
    center: true,
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
    smartSpeed: 700,
    dragEndSpeed: 1000,
  });

  $('.magnific-popup').magnificPopup({
    type:'image',
    gallery:{
      enabled:true
    }
  });
});
