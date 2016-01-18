(function ($) {
    "use strict";

    var createRenovationImage = function createRenovationImage(renovationImageInformation) {
        var imagePath = '../images/portfolio/' + renovationImageInformation[0] + '/' + renovationImageInformation[1] + '-gallery.jpg';
        return {
            "src": imagePath,
            'thumb': imagePath,
            'subHtml': '<h4>' + renovationImageInformation[2] + '</h4><p>' + renovationImageInformation[3] + '</p>'
        }
    }

    var setupPortfolioCollection = function (porfolioCoverElementId, informationCollection) {
        $('#'+porfolioCoverElementId).on('click', function () {           
            $(this).lightGallery({
                dynamic: true,
                dynamicEl: [
                    createRenovationImage(informationCollection[0])
                ],
                loop: false,
                hideControlOnEnd: true
            })
        });        
    }

    var kitchenRenovationInformationCollection = [
        ['kitchen', '1', '', '']
    ];

    setupPortfolioCollection('kitchenCollection', kitchenRenovationInformationCollection);

    var bathroomRenovationInformationCollection = [
        ['bathroom', '1', '', '']
    ];

    setupPortfolioCollection('bathroomCollection', bathroomRenovationInformationCollection);

    var basementRenovationInformationCollection = [
        ['basement', '1', '', '']
    ];

    setupPortfolioCollection('basementCollection', basementRenovationInformationCollection);

    var fenceInformationCollection = [
        ['fence', '1', '', '']
    ];

    setupPortfolioCollection('fenceCollection', fenceInformationCollection);

    var deckInformationCollection = [
        ['deck', '1', '', '']
    ];

    setupPortfolioCollection('deckCollection', deckInformationCollection);

    var shedInformationCollection = [
        ['shed', '1', '', '']
    ];

    setupPortfolioCollection('shedCollection', shedInformationCollection);

})(jQuery);