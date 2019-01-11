$(document).ready(function () {

    $('select').formSelect();

    const resultWrapper = $('#result-wrapper');
    let inputData = {
        term: '',
        location: '',
        radius: 0,
        sort_by: '',
        limit: 0,
        price: ''
    };
    let priceInput = '';

    let itemHTML = '';

    const apiKey = 'kl5VSu4J77OZTRZUSPM5rl01qLMlBWMY3D7URWrJ8kgZF82zFlWbuZJDXIXyGL0wB7MUeFm59C3PFl4aigHmTy-zG7wiumRmAY4BDyX4d-pGbg_1JWsbC6rtp1AyXHYx'

    ajaxPromise = (params) => {
        return new Promise(function (resolve, reject) {
            $.ajax(params).done(resolve).fail(reject);
        });
    };

    $('form').submit(function (event) {
        event.preventDefault();

        resultWrapper.empty();
        
        inputData = {
            term: $('#term').val().trim(),
            location: $('#location').val().trim(),
            radius: Math.floor($('#radius option:selected').val() * 1609.344),
            sort_by: $('#sort_by option:selected').val(),
            limit: $('#limit option:selected').val()
        }

        priceInput = $('#price option:selected').map(function () {
            return $(this).val();
        }).get().join(', ')

        if (priceInput != '') {
            inputData['price'] = priceInput;
        }

        $(this).trigger('reset');

        let queryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?';
        queryURL += '&' + $.param(inputData);

        ajaxPromise({
            url: queryURL,
            method: 'GET',
            dataType: 'json',
            headers: {
                'accept': 'application/json',
                'x-requested-with': 'xmlhttprequest',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${apiKey}`
            }
        }).then(
            function fulfillHandler(result) {
                let resultArray = result.businesses;

                resultArray.forEach(function (element) {
                    populateItemHTML(element);
                });
            }
        ).catch(function errorHandler(error) {
            console.log(error);
        });
    });

    populateItemHTML = (item) => {
        let outputData = {
            address: item.location.display_address.join('<br>'),
            categories: item.categories.map(function (elem) {
                return elem.values
            }).join(', '),
            id: item.id,
            imageURL: item.image_url,
            isClosed: item.is_closed,
            latitude: item.coordinates.latitude,
            longitude: item.coordinates.longitude,
            name: item.name,
            phone: item.display_phone,
            price: item.price,
            rating: item.rating,
            reviewCount: item.review_count,
            yelpURL: item.url
        };

        itemHTML = `<li class="flex-item" id="busId_${outputData.id}">
                        <div class="card sticky-action">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src=${outputData.imageURL} alt=${outputData.name}>
                            </div>
                            <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4">${outputData.name}<i class="material-icons right">more_vert</i></span>
                                <p>Ratings: ${outputData.rating}/5</p>
                                <p>Price: ${outputData.price}</p>
                            </div>
                            <div class="card-action">
                                <span>
                                <a href=${outputData.yelpURL} target="_blank"><i class="material-icons right tooltipped" data-delay="50" data-position="bottom" data-tooltip="Visit Yelp">web</i></a>
                                <a href="https://www.google.com/maps/search/?api=1&query=${outputData.name}&query=${outputData.latitude},${outputData.longitude}" target="_blank"><i class="material-icons right tooltipped" data-delay="50" data-position="bottom" data-tooltip="Get Directions">map</i></a>
                                </span>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                                <div class="middle text">
                                    <h6>Address</h6>
                                    <p>${outputData.address}</p>
                                    <br>
                                    <br>
                                    <h6>Contact #</h6>
                                    <p>${outputData.phone}</p>
                                </div>
                            </div>
                        </div>
                    </li>`;

        resultWrapper.append(itemHTML);

        $('.tooltipped').tooltip({
            delay: 50,
            html: true
        });
    };
});