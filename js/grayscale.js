/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

$(document).ready(function() {

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
            var $anchor = $(this);
            $('html, body').stop().animate({
                // scrollTop: $($anchor.attr('href')).offset().top
                scrollTop: 750
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
        
        if ($this.attr('data-dir') == '#prev') {
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

        // $currModal.on('hidden.bs.modal', function(e) {
        //     if ($(event.currentTarget).hasClass('prev-modal') || $(event.currentTarget).hasClass('next-modal')) {
        //         if ($this.attr('href') == '#prev') {
        //             if ($currModalIndex == 0) {
        //                 $('.modal').last().modal('show');
        //             } else {
        //                 $currModal.prev().modal('show');
        //             }
        //         } else {
        //             if ($currModalIndex == $('.modal').length - 1) {
        //                 $('.modal').first().modal('show');
        //             } else {
        //                 $currModal.next().modal('show');
        //             }
        //         }
        //     }
        // });
    });
});