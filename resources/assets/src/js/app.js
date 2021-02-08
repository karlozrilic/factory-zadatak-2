$(() => {
    var isProduct = document.getElementById("product-page");
    if (isProduct) {
        var listOfReservedDates = $('#product-page').data('reservedList').split(',');
        var maxAdult = $('#product-page').data('maxAdults');
        var maxChildren = $('#product-page').data('maxChildren');

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
    
        var fromDateConfig = {
            defaultDate: "2020-01-01",
            disable: listOfReservedDates,
            dateFormat: "Y-m-d",
            allowInput: true,
            locale: {
                firstDayOfWeek: 1
            },
            onChange: function() {
                for (var i=0; i<listOfReservedDates.length; i++) {
                    if (new Date(listOfReservedDates[i]).getTime() > new Date(fromDate.selectedDates[0]).getTime()) {
                        toDate.set("maxDate", listOfReservedDates[i]);
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
        var toDateConfig = {
            disable: listOfReservedDates,
            dateFormat: "Y-m-d",
            allowInput: true,
            locale: {
                firstDayOfWeek: 1
            }
        };
        var fromDate = $("#fromDate").flatpickr(fromDateConfig);
        var toDate = $("#toDate").flatpickr(toDateConfig);


        $(".minus").on("click", (event) => {
            var $input = $(event.currentTarget).parent().parent().find(".guests-number").find(".number");
            if (parseInt($input.val()) <= 0) {
                return;
            }
            var count = parseInt($input.val()) - 1;
            if ($input.attr("id") === "adult") {
                count = count < 1 ? 1 : count;
            }
            $input.val(count);
            return;
        });
        $(".plus").on("click", (event) => {
            var $input = $(event.currentTarget).parent().parent().find(".guests-number").find(".number");
            var count = parseInt($input.val());
            if ($input.attr("id") === "adult") {
                if (count < maxAdult) {
                    $input.val(parseInt($input.val()) + 1);
                    return;
                }
            }
            if (count < maxChildren) {
                $input.val(parseInt($input.val()) + 1);
                return;
            }
        });
        
        var limit = 500;
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