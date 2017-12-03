(function($, undefined){

    var selectAllInputs = $('.select-all');
    selectAllInputs.each(function (i, item) {
        $(item).on('click', function () {
            if ($(this).prop('checked')) {
                $(this).parents('fieldset').find('input').prop('checked', true);
            } else {
                $(this).parents('fieldset').find('input').prop('checked', false);
            }
        })
    })

    var allInputs = $('form input');
    handleCheckboxes();

    $(allInputs).on('change', handleCheckboxes);
    function handleCheckboxes(e) {
        //console.log(e);
        var inputGroups = $('.inputs-group');
        console.log(inputGroups);
        for (var i = 0; i < inputGroups.length; i++) {
            //console.log(inputGroups[i]);
            var inputsInFieldset = $(inputGroups[i]).find('input');
            for (var j = 1; j < inputsInFieldset.length; j++) {
                //console.log(inputsInFieldset[j]);
                var targetID = $(inputsInFieldset[j]).data('target');
                if ($(inputsInFieldset[j]).prop('checked')) {
                    $('#'+targetID).show();
                } else {
                    $('#'+targetID).hide();
                }
            }
            if ($(inputsInFieldset[1]).prop('checked')&&$(inputsInFieldset[2]).prop('checked')&&$(inputsInFieldset[3]).prop('checked')) {
                $(inputsInFieldset[0]).prop('checked', true);
            } else {
                $(inputsInFieldset[0]).prop('checked', false);
            }
            targetID = $(inputsInFieldset[1]).data('target');
            if ($(inputsInFieldset[1]).prop('checked')||$(inputsInFieldset[2]).prop('checked')||$(inputsInFieldset[3]).prop('checked')) {
                $('#'+targetID).parents('li').show();
            } else {
                $('#'+targetID).parents('li').hide();
            }
        }
        //console.log(inputGroups);
    }


})(jQuery);