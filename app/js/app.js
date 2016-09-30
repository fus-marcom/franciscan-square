/* jshint esversion: 6 */



$(function() {

  //Check for ios Safari5
  let userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test( userAgent ),
    ios = /iphone|ipod|ipad/.test( userAgent );

  if( ios ) {
      if ( safari ) {
          $('body').addClass('ios');
      } else if ( !safari ) {
          //webview
      }
  }

  //Get current year and add to footer
  let dateToday = new Date();
  let currentYear = dateToday.getFullYear();
  $('#copyright-date').text(currentYear);



  //Scroll to top btn
  $('.scroll-to-top i').click(function(){
    $('html, body').animate({
          scrollTop: 0
        }, 1000);
        return false;
  });

  if($(window).scrollTop() > 1500 ) {
    $('.scroll-to-top').removeClass('slide-out').addClass('slide-in');
  } else {
    $('.scroll-to-top').removeClass('slide-in').addClass('slide-out');
  }

  function scrollToTop() {

    $(window).scroll(function() {
       if($(window).scrollTop() > 1500 ) {
         $('.scroll-to-top').removeClass('slide-out').addClass('slide-in');
       } else {
         $('.scroll-to-top').removeClass('slide-in').addClass('slide-out');
       }
     });
  }

  scrollToTop();

  function get(url) {
    return fetch(url, {
      method: 'get'
    });
  }

  function getJSON(url) {
    return get(url).then(function(response) {
      return response.json();
    });
  }


   // Close side nav on tap for mobile but not wide screens
  let windowsize = $(window).width();
  let closeOnClickVal = false;
   if (windowsize < 992) {
     closeOnClickVal = true;
   }

  //Init side nav
  $(".button-collapse").sideNav({
    closeOnClick: closeOnClickVal,
    menuWidth: 300
  });

  //init modal
  $('.modal-trigger').leanModal();

  //Smooth in page navigation
  function scrollToAnchor(name){
      var aTag = $(name);
      console.log(aTag);
      $('html,body').animate({scrollTop: aTag.offset().top}, 'slow');
  }

// In page navigation
function inPageNav(){
$('.slow-nav').click(function() {
    event.preventDefault();
    var name = $(this).attr('href');
    scrollToAnchor(name);
  });
}

inPageNav();

  //Scrollspy for sub-menu
  $('.scrollspy').scrollSpy();

  //Sticky submenu
  //Code below from Mark Senff https://codepen.io/senff/pen/ayGvD with very slight modifications
  // Create a clone of the menu, right next to original.
$('.sub-menu').addClass('original').clone().insertAfter('.sub-menu').addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();

//Init scrolling
inPageNav();


scrollIntervalID = setInterval(stickIt, 10);


function stickIt() {

  var orgElementPos = $('.original').offset();
  orgElementTop = orgElementPos.top;

  if ($(window).scrollTop() >= (orgElementTop)) {
    // scrolled past the original position; now only show the cloned, sticky element.

    // Cloned element should always have same left position and width as original element.
    orgElement = $('.original');
    coordsOrgElement = orgElement.offset();
    leftOrgElement = coordsOrgElement.left;
    widthOrgElement = orgElement.css('width');
    $('.cloned').css('left',leftOrgElement+'px').css('top',0).css('width',widthOrgElement).show();
    $('.original').css('visibility','hidden');
  } else {
    // not scrolled past the menu; only show the original menu.
    $('.cloned').hide();
    $('.original').css('visibility','visible');
  }
}

//Copyright (c) 2016 by Mark Senff (http://codepen.io/senff/pen/ayGvD)
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


});
