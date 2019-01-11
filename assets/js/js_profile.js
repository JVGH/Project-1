$(document).ready(function () {

    // Global vars
    const favWrapper = $('#fav-wrapper');

    let queryURL = '';
    let uri = '';
    let label = '';
    let image = '';
    let url = '';
    let itemHTML = '';

    // API call fx
    function callAPI(val) {
        queryURL = `https://api.edamam.com/search?q=${val}&app_id=785a455a&app_key=439dad41e2348ef7eb7293b94c02ebd4`;
        return $.ajax({
            url: queryURL,
            method: 'GET',
            dataType: 'json'
        })
    };

    // Create li fx
    let createItem = (response) => {
        uri = response.hits[0].recipe.uri.split('_').pop();
        label = response.hits[0].recipe.label;
        image = response.hits[0].recipe.image;
        url = response.hits[0].recipe.shareAs;

        itemHTML = `<li class="flex-item" id="uri_${uri}">
                        <div class="card">
                            <div class="card-image">
                                <a href=${url}>
                                <img src=${image}>
                                </a>
                                <a class="btn-floating halfway-fab waves-effect waves-light red btn-dislike" id=${uri}><i class="tiny material-icons">favorite_border</i></a>
                            </div>
                            <div class="middle">
                                <div class="text">${label}</div>
                            </div>
                        </div>
                    </li>`;

        favWrapper.append(itemHTML);
    };

    // FB child_added eventhandler
    favRef.on('child_added', function (child) {
        favWrapper.empty();
        callAPI(child.val()).then(function (response) {
            createItem(response);
        }, function (reason) {
            console.log('Error in processing this request: ', reason);
        });
    });

    // Dislike fav item eventhandler
    $(document).on('click', '.btn-dislike', function (event) {
        event.preventDefault();
        let favItem = event.currentTarget.id;
        let favList = [];
        let favListPromise = new Promise(function (resolve, reject) {
            favRef.once('value').then(function (snapshot) {
                //favList = snapshot.val();
                const vals = Object.values(snapshot.val());
                for (const val of vals) {
                    favList.push(val);
                }
                resolve(favList);
            })
        });

        favListPromise.then(function (favList) {
            favList.splice(favList.indexOf(favItem), 1);
            favRef.set(favList);
            $('#uri_' + favItem).remove();
        });
    });
});