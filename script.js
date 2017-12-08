(function($, undefined){

    var selectAllInputs = $('.select-all');
    console.log('selectAllInputs', selectAllInputs[0]);
    $(selectAllInputs[0]).on('click', function (e){
      if ($(this).prop('checked')) {
          $('form').find('.link-checkbox').prop('checked', true);
      } else {
          $('form').find('.link-checkbox').prop('checked', false);
      }
    })

    var mainGroupInputs = $('#main-group input');
      for (var i = 1; i < mainGroupInputs.length; i++) {
        $(mainGroupInputs[i]).on('click', function () {
          var fieldsetID = $(this).data('target');
          if($(this).prop('checked')) {
            $('#'+fieldsetID).show();
          } else {
            $('#'+fieldsetID).hide();
          }

        })
      }


    for (var i = 1; i < selectAllInputs.length; i++) {
      $(selectAllInputs[i]).on('click', function () {
          if ($(this).prop('checked')) {
              console.log('true',this);
              $(this).parents('fieldset').find('input').prop('checked', true);
          } else {
              $(this).parents('fieldset').find('input').prop('checked', false);
              console.log('false',this);
          }
      })
      $('fieldset:eq('+i+')').hide();
    }



    var links = $('.link-checkbox');
    var allInputs = $('form input');
    handleCheckboxes();


    $(links).on('click', handleMainAllCheckbox);
    $(allInputs).on('change', handleCheckboxes);

    function handleCheckboxes(e) {
        //console.log(e);
        var inputGroups = $('.inputs-group');
        for (var i = 1; i < inputGroups.length; i++) {
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
      }



    function handleMainAllCheckbox() {
      var n = true;
      for (var i = 0; i < links.length; i++) {
        if (!$(links[i]).prop('checked')) {n = false;break;}
      }
      if (n === true) {
        $(selectAllInputs[0]).prop('checked',true);
      } else {
        $(selectAllInputs[0]).prop('checked',false);
      }
    }


})(jQuery);
