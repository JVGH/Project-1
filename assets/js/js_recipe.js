$(document).ready(function () {

    // Retrieving objects from local storage and storing it in a variable
    var results = JSON.parse(localStorage.getItem("results"));
    console.log("results from local Storage: ", results);

    var results2 = JSON.parse(localStorage.getItem("results2"));
    console.log("results2 from local Storage: ", results2);

    // Creating images using objects stored in local storage when page is refreshed
    if (results) {
        createImages(results);
    };
    if (results2) {
        createImages2(results2);
    };

    ///////// EVENT HANDLERS ////////////
    /////////////////////////////////////  
    /// On-click function to search and populate images
    $("#submit-btn").on("click", function (event) {
        event.preventDefault();

        // clearing <div> before displaying images
        $('#results').empty();
        $('#results2').empty();

        // Calling function that displays images
        displaySearchImages();
        displaySearchImages2();

        // Clearing search box after clicking submit button
        $("#search-box").val("");
    });


    ///  On-click function to push recipe-Id to firebase
    $(document).on('click', '.btn-floating', function () {
        // Retreiving and storing recipe-id value in a variable
        var recipeId = $(this).attr("recipe-id");
        console.log('Value stored in recipeId: ', recipeId);
        favRef.push(recipeId);
    });

    ///////////FUNCTIONS ///////////////
    ////////////////////////////////////
    // Function to display images
    function displaySearchImages() {
        //Getting value from search box and storing it in a variable
        var search = $("#search-box").val().trim();

        //Using value from search to make a call to the API
        var queryURL = 'https://api.edamam.com/search?q=' + search + '&app_id=785a455a&app_key=439dad41e2348ef7eb7293b94c02ebd4&from=0&to=4';

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.hits;
            console.log("results from Api: ", results);

            // Setting 'results' into Local Storage
            localStorage.setItem('results', JSON.stringify(results));
            console.log("------------------------");

            //Calling function that creates the images
            createImages(results);
        });
    }

    // Function to display images2
    function displaySearchImages2() {
        //Getting value from search box and storing it in a variable
        var search = $("#search-box").val().trim();

        //Using value from search to make a call to the API
        var queryURL = 'https://api.edamam.com/search?q=' + search + '&app_id=785a455a&app_key=439dad41e2348ef7eb7293b94c02ebd4&from=4&to=8';

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results2 = response.hits;
            console.log("results2 from Api: ", results2);

            // Setting 'results2' into Local Storage
            localStorage.setItem('results2', JSON.stringify(results2));
            console.log("------------------------");

            //Calling function that creates the images
            createImages2(results2);
        });
    }


    // Function to create image cards 
    function createImages(object) {
        var results = object;

        for (var i = 0; i < results.length; i++) {

            // Creating a <div> with a Materialize class for columns
            var columnDiv = $('<div>').addClass('col s12 m6 l3');

            // Creating a <div> with a Materialize class of 'card'
            var cardDiv = $('<div>').addClass('card');

            /////////// THIS ENTIRE CODE IS GOING INSIDE 'imgCardDiv'
            //////////////////////////////////////////////////////////////////
            // Creating a <div> and giving it a Materialize class of card-image
            var imgCardDiv = $('<div>').addClass('card-image');

            // Creating <a> tag that will wrapp around <img> tag. Currentlly working on this.
            var imageAtag = $('<a>').attr('href', results[i].recipe.shareAs);

            // Creating an image tag and giving it an attribute
            var imgTag = $('<img>').attr('src', results[i].recipe.image);

            // Appending 'imgTag' to 'imageAtag'
            imageAtag.append(imgTag);

            // Storing recipe's uri in a variable
            var recipeUri = results[i].recipe.uri;

            // Spliting string from recipe's uri to get recipe's id 
            recipeId = recipeUri.split('_').pop();

            // Creating an <a> tag and giving it a Materialize class
            var aTag = $('<a>').addClass('btn-floating halfway-fab waves-effect waves-light red');

            // Storing the 'recipe-id' to the aTag
            aTag.attr('recipe-id', recipeId);

            // Creating an <i> tag and giving a a Materialize class
            var iTag = $('<i>').addClass('material-icons').text('add');

            // Appending iTag to aTag
            aTag.append(iTag);

            // Appending imgTag and aTag to imgCardDiv
            imgCardDiv.append(imageAtag, aTag);

            ///// THIS ENTIRE CODE IS GOING INSIDE  'cardContentDiv'
            ////////////////////////////////////////////////
            // Creating a <div> with a Materialize class of 'card-content'
            var cardContentDiv = $('<div>').addClass('card-content');

            // Creating a <span> tag that will store the recipe's label
            var spanTag = $('<span>').addClass('card-title').text(results[i].recipe.label);

            // Appending spanTag to cardContentDiv
            cardContentDiv.append(spanTag);

            // Appending imgCardDiv and cardContentDiv to cardDiv
            cardDiv.append(imgCardDiv, cardContentDiv);

            // Appending cardDiv to ColumnDiv
            columnDiv.append(cardDiv);

            // Appending columnDiv to <div> with the id of 'results' in HTML
            $('#results').append(columnDiv);
        }
    }


    // Function to create image cards 
    function createImages2(object) {
        var results = object;

        for (var i = 0; i < results.length; i++) {

            // Creating a <div> with a Materialize class for columns
            var columnDiv = $('<div>').addClass('col s12 m6 l3');

            // Creating a <div> with a Materialize class of 'card'
            var cardDiv = $('<div>').addClass('card');

            /////////// THIS ENTIRE CODE IS GOING INSIDE 'imgCardDiv'
            //////////////////////////////////////////////////////////////////
            // Creating a <div> and giving it a Materialize class of card-image
            var imgCardDiv = $('<div>').addClass('card-image');

            // Creating <a> tag that will wrapp around <img> tag. Currentlly working on this.
            var imageAtag = $('<a>').attr('href', results[i].recipe.shareAs);

            // Creating an image tag and giving it an attribute
            var imgTag = $('<img>').attr('src', results[i].recipe.image);

            // Appending 'imgTag' to 'imageAtag'
            imageAtag.append(imgTag);

            // Storing recipe's uri in a variable
            var recipeUri = results[i].recipe.uri;

            // Spliting string from recipe's uri to get recipe's id 
            recipeId = recipeUri.split('_').pop();

            // Creating an <a> tag and giving it a Materialize class
            var aTag = $('<a>').addClass('btn-floating halfway-fab waves-effect waves-light red');

            // Storing the 'recipe-id' to the aTag
            aTag.attr('recipe-id', recipeId);

            // Creating an <i> tag and giving a a Materialize class
            var iTag = $('<i>').addClass('material-icons').text('add');

            // Appending iTag to aTag
            aTag.append(iTag);

            // Appending imgTag and aTag to imgCardDiv
            imgCardDiv.append(imageAtag, aTag);

            ///// THIS ENTIRE CODE IS GOING INSIDE  'cardContentDiv'
            ////////////////////////////////////////////////
            // Creating a <div> with a Materialize class of 'card-content'
            var cardContentDiv = $('<div>').addClass('card-content');

            // Creating a <span> tag that will store the recipe's label
            var spanTag = $('<span>').addClass('card-title').text(results[i].recipe.label);

            // Appending spanTag to cardContentDiv
            cardContentDiv.append(spanTag);

            // Appending imgCardDiv and cardContentDiv to cardDiv
            cardDiv.append(imgCardDiv, cardContentDiv);

            // Appending cardDiv to ColumnDiv
            columnDiv.append(cardDiv);

            // Appending columnDiv to <div> with the id of 'results' in HTML
            $('#results2').append(columnDiv);
        }
    }
});