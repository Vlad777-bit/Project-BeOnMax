$(document).ready(function () {
  $('.carousel__inner').slick({
    speed: 1200,
    // adaptiveHeight: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="icons/carousel/arrow_l.svg" alt="arrow_l"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icons/carousel/arrow_r.svg" alt="arrow_r"></button>',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  });

  $('ul.catalog__tabs').on(
    'click',
    'li:not(.catalog__tab_active)',
    function () {
      $(this)
        .addClass('catalog__tab_active')
        .siblings()
        .removeClass('catalog__tab_active')
        .closest('div.container')
        .find('div.catalog__content')
        .removeClass('catalog__content_active')
        .eq($(this).index())
        .addClass('catalog__content_active');
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content')
          .eq(i)
          .toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  }

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  // Modal windows

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  /**
   *  Валидация формы
   * @param {string} Пробрасываем class или id формы для валидации
   */
  function validateForm(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: {
          required: true,
          minlength: 4,
        },
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: 'Введите своё имя',
          minlength: jQuery.validator.format('Минимальное кол-во символов {0}'),
        },
        phone: {
          required: 'Введите свой номер телефона',
          minlength: jQuery.validator.format('Минимальное кол-во чисел {0}'),
        },
        email: {
          required: 'Введите свой email',
          email: 'Ваш email должен быть в формате: name@domain.com',
        },
      },
    });
  }

  validateForm('#consultation form');
  validateForm('#order form');
  validateForm('#consultation-form');

  /**
   * Маска для телефона
   */

  $('input[name="phone"]').mask('+7 (999) 999-99-99');

  /**
   * Отправляем письма
   */

  $('form').submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize(),
    }).done(function () {
      $(this).find('input').val('');

      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });

    return false; 
  });

  /**
   *  Плавная прокрутка и кнопка вверх
  */

  $(window).scroll(function() {
    if ($(this).scrollTop() >= 1224) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  })

  $("a[href^='#up']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  // Подключаем анимацию
  new WOW().init();
});
