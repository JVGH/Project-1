$(document).ready(function () {

    cookingURL = "https://pixabay.com/api/?key=11186911-dfbbdcb86eea733a3765184d6&image_type=photo&safesearch=true&per_page=9&q=cooking";
    takeoutURL = "https://pixabay.com/api/?key=11186911-dfbbdcb86eea733a3765184d6&image_type=photo&safesearch=true&per_page=9&q=food+delivery";

    var h = 0;
    var k = 0;
    var response;

    var eatInTimeout = function () {
        setInterval(function () {
            $.ajax({
                url: cookingURL,
                method: "GET"
            }).then(function (response1) {
                console.log(response1);
                if (h >= response1.hits.length) {
                    h = 0;
                };
                $("#eat-in-image").attr("src", response1.hits[h].webformatURL);
                h++;
                console.log(h);
            });
        }, 10000);
    };

    var takeoutTimeout = function () {
        setInterval(function () {
            $.ajax({
                url: takeoutURL,
                method: "GET"
            }).then(function (response2) {
                console.log(response2);
                if (k >= response2.hits.length) {
                    k = 0;
                };
                $("#takeout-image").attr("src", response2.hits[k].webformatURL);
                k++;
                console.log(k);
            });
        }, 10000);
    };

    takeoutTimeout();
    eatInTimeout();
});