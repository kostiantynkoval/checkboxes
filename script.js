(function ($, undefined) {
  $(window).on('load', function() {


    // Global show group variables
    var allInputs = $('form input');
    var fieldsets = $('fieldset');

    // input fields im main section
    var mainGroupInputs = $('#main-group input');
    // "All 1-3" button
    // Handle clicks on Childboxes 1,2,3
    for (var i = 1; i < 4; i++) {
        $(mainGroupInputs[i]).on('click', function () {
            var fieldsetID = $(this).data('target');
            if ($(this).prop('checked')) {
                $(mainGroupInputs[0]).prop('checked', false);
                $('#' + fieldsetID).show();
                $('#' + fieldsetID).find('.form-check-input').prop('checked',false);
                $('#' + fieldsetID).find('.select-all').prop('checked',true);
            } else {
                $('#' + fieldsetID).hide();
                $('#' + fieldsetID).find('.form-check-input').prop('checked',false);
            }
            handleCheckboxes();
        })
    }

    /* Function: each fieldset on click All Button uncheck others and opposite*/
    fieldsets.each(function (i, fieldset) {
        var inputs = $(fieldset).find('input');

        $(inputs[0]).on('click', function () {
            if ($(this).prop('checked')) {
                $(inputs[1]).prop('checked', false);
                $(inputs[2]).prop('checked', false);
                $(inputs[3]).prop('checked', false);
            }
            handleCheckboxes();
        })

        for (var j = 1; j < 4; j++) {
            $(inputs[j]).on('click', function () {
                if ($(this).prop('checked')) {
                    $(inputs[0]).prop('checked', false);
                }
                handleCheckboxes();
            })
        }

    })

    var links = $('.link-checkbox');

    function handleCheckboxes() {
        if ($(mainGroupInputs[0]).prop('checked')) {
            for (var i = 1; i < 16; i++) {
                $(allInputs[i]).prop('checked', false);
            }
            for (var i = 1; i < 4; i++) {
                $(fieldsets[i]).hide();
            }
            $('li li').show();
        } else {
            var inputGroups = $('.inputs-group');
            for (var i = 1; i < 4; i++) {
                var inputsInFieldset = $(inputGroups[i]).find('input');
                if ($(inputsInFieldset[0]).prop('checked')) {
                    for (var j = 1; j < 4; j++) {
                        var targetID = $(inputsInFieldset[j]).data('target');
                        $('#' + targetID).show();
                    }
                } else {
                    for (var j = 1; j < 4; j++) {
                        var targetID = $(inputsInFieldset[j]).data('target');
                        if ($(inputsInFieldset[j]).prop('checked')) {
                            $('#' + targetID).show();
                        } else {
                            $('#' + targetID).hide();
                        }
                    }
                }
            }
        }
    }



    /* Commands on init */
    $(mainGroupInputs[0]).prop('checked', true);
    $('li').show();
    for (var i = 1; i < fieldsets.length; i++) {
        $(fieldsets[i]).hide();
    }
  })
})(jQuery);
