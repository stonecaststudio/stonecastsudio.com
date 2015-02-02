/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

$(document).ready(function() {

    FastClick.attach(document.body);

    // jQuery to collapse the navbar on scroll
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });



    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $('a.page-scroll').bind('click', function(event) {
            event.preventDefault();

            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('data-scroll-to')).offset().top
                // scrollTop: 750
            }, 750, 'easeInOutQuad');
            event.preventDefault();
        });
    });



    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });



    // Cycle through modal windows
    $('.prev-modal, .next-modal').on('click', function(event) {
        var $this = $(this);
        var $currModal = $this.parents('.modal');
        var $currModalIndex = $('.modal').index($currModal);

        console.log();

        $currModal.modal('hide');
        
        if ($this.attr('data-dir') == 'prev') {
            if ($currModalIndex == 0) {
                $('.modal').last().modal('show');
            } else {
                $currModal.prev().modal('show');
            }
        } else {
            if ($currModalIndex == $('.modal').length - 1) {
                $('.modal').first().modal('show');
            } else {
                $currModal.next().modal('show');
            }
        }
    });


    // Pricing selector (only visible at 766px viewport width and below)
    $('.pricing-selector .package-name').on('click', function() {

        var $this = $(this);
        var $selectedFeatures = $('.feature-name.selected');
        var newPriceGroup = new RegExp($this.attr('data-price-group'));

        // update current tab
        $('.pricing-selector .package-name').removeClass('current');
        $('.pricing-selector .feature-name.last-of-type').removeClass('last-of-type');
        $this.addClass('current');

        // update selected features
        $selectedFeatures.removeClass('selected');

        $('.feature-name').each(function() {
            var isInGroup = newPriceGroup.test($(this).attr('data-price-group'));
            if (isInGroup) {
                $(this).addClass('selected');
            }
        });

        $('.feature-name.selected').last().addClass('last-of-type');

    });


    // AJAX form submission

    $('.hire-us-form').validate({
        rules: {
        },
        messages: {
            "customer-name": {
                required: "Please enter your name"
            },
            "company-name": {
                required: "Please enter the name of your company"
            },
            "customer-email": {
                required: "Please enter your email address"
            },
            "customer-website": {
                required: "Please enter your website address"
            },
            "project-description": {
                required: "Please tell us what you'd like us to do"
            },
            "project-package": {
                required: "Please select your preferred package"
            }
        },
        submitHandler: function(form) {
            var $form = $(form);
            var $submit = $form.find('input[type="submit"]');

            $form.ajaxSubmit({
                url: form.action,
                method: form.method,
                beforeSend: function() {
                    $submit.attr('value', 'sending...')
                        .removeClass('send-success')
                        .removeClass('send-error')
                    ;
                },
                success: function(data, status, xhr) {
                    $submit.attr('value', 'email sent!').addClass('send-success');
                },
                error: function(xhr, status, error) {
                    $submit.attr('value', 'uh-oh, looks like we have a problem...').addClass('send-error');
                    $('.g-recaptcha').append('<label class="error">Please verify that you\'re human!');
                },
                complete: function(xhr, status) {
                    $submit.trigger('blur');
                }
            });

        }
    });
});














