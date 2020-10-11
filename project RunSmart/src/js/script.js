$(document).ready(function() {
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel/arrow_l.svg" alt="arrow_l"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/arrow_r.svg" alt="arrow_r"></button>',
        responsive: [
            {
              breakpoint: 991,
              settings: {
                dots: true,
                arrows: false,
              }
            }
        ]
    });
  });