jQuery.fn.extend({
    exists: function() {
        return this.length > 0 ? true : false;
    }
})
$(() => {
    const productPage = $("#product-page");
    if (productPage.exists()) {
        const { productData: { reservedDates } } = window;
        const { maxAdults, maxChildren } = productPage.data();

        $('.room-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            draggable: false,
            arrows: false
        });
        $('.room-slider-nav').slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            speed: 500,
            asNavFor: '.room-slider',
            slide: '.room-slider-nav-image',
            focusOnSelect: true,
            prevArrow: $("#room-slider-prev"),
            nextArrow: $("#room-slider-next")
        });
    
        let fromDateConfig = {
            defaultDate: "2020-01-01",
            disable: reservedDates,
            dateFormat: "Y-m-d",
            allowInput: true,
            locale: {
                firstDayOfWeek: 1
            },
            onChange: function() {
                for (let i=0; i<reservedDates.length; i++) {
                    if (new Date(reservedDates[i]).getTime() > new Date(fromDate.selectedDates[0]).getTime()) {
                        toDate.set("maxDate", reservedDates[i]);
                        toDate.set("minDate", fromDate.selectedDates[0]);
                        toDate.jumpToDate(fromDate.selectedDates[0]);
                        break;
                    } else {
                        toDate.set("maxDate", null);
                        toDate.set("minDate", fromDate.selectedDates[0]);
                        toDate.jumpToDate(fromDate.selectedDates[0]);
                    }
                }
            }
        };
        let toDateConfig = {
            disable: reservedDates,
            dateFormat: "Y-m-d",
            allowInput: true,
            locale: {
                firstDayOfWeek: 1
            }
        };
        let fromDate = $("#fromDate").flatpickr(fromDateConfig);
        let toDate = $("#toDate").flatpickr(toDateConfig);


        $(".minus").on("click", (event) => {
            let $input = $(event.currentTarget).parent().parent().find(".guests-number").find(".number");
            if (parseInt($input.val()) <= 0) {
                return;
            }
            let count = parseInt($input.val()) - 1;
            if ($input.attr("id") === "adult") {
                count = count < 1 ? 1 : count;
            }
            $input.val(count);
            return;
        });
        $(".plus").on("click", (event) => {
            let $input = $(event.currentTarget).parent().parent().find(".guests-number").find(".number");
            let count = parseInt($input.val());
            if ($input.attr("id") === "adult") {
                if (count < maxAdults) {
                    $input.val(parseInt($input.val()) + 1);
                    return;
                }
            }
            if (count < maxChildren) {
                $input.val(parseInt($input.val()) + 1);
                return;
            }
        });
        
        const limit = 500;
        $("#textarea").attr("maxlength",limit);
        $("#textarea").on("keyup", (event) => {
            if ($(event.currentTarget).val().length > limit) {
                return;
            }
            $("#count").text($(event.currentTarget).val().length+"/"+limit);
        });
        $("#textarea").on("keydown", (event) => {
            if ($(event.currentTarget).val().length > limit) {
                return;
            }
            $("#count").text($(event.currentTarget).val().length+"/"+limit);
        });
    } else {
        $('.slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            speed: 500,
            slide: ".card",
            prevArrow: $("#home-banner-prev"),
            nextArrow: $("#home-banner-next")
        });
        $('.news-slider').slick({
            infinite: true,
            autoplay: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            slide: ".card",
            speed: 500,
            prevArrow: $("#news-carousel-prev"),
            nextArrow: $("#news-carousel-next")
        });
        $('.reviews').slick({
            infinite: true,
            autoplay: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            slide: ".review",
            dots: true,
            speed: 500,
            prevArrow: $("#guest-reviews-prev"),
            nextArrow: $("#guest-reviews-next")
        });
    }
});