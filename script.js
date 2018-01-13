(function ($, undefined) {
  $(window).on('load', function() {


    // Global show group variables
    var allInputs = $('form input');
    var fieldsets = $('fieldset');
    var currentPage = 0;
    var totalPages = 1;
    var listItems;

    // input fields im main section
    var mainGroupInputs = $('#main-group input');

    // "All 1-3" button
    // Handle clicks on Childboxes 1,2,3 etc.
    for (var i = 1; i < mainGroupInputs.length; i++) {
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
                for (var n = 1; n < inputs.length; n++) {
                    $(inputs[n]).prop('checked', false);
                }
            }
            handleCheckboxes();
            listItems = $('#itemsSection .list-item.visible');
            if (listItems.length>10) {
                totalPages = Math.ceil(listItems.length/10);
                paginationHandler('#pagination');
                handleListItems();
            } else {
                $('#pagination ul').html('');
            }
        })

        for (var j = 1; j < inputs.length; j++) {
            $(inputs[j]).on('click', function () {
                if ($(this).prop('checked')) {
                    $(inputs[0]).prop('checked', false);
                }
                console.log('checked', $(this).data('target'));
                handleCheckboxes();
                listItems = $('#itemsSection .list-item.visible');
                if (listItems.length>10) {
                    totalPages = Math.ceil(listItems.length/10);
                    paginationHandler('#pagination');
                    handleListItems();
                } else {
                    $('#pagination ul').html('');
                }
            })
        }

    })


    function handleCheckboxes() {
        if ($(mainGroupInputs[0]).prop('checked')) {
            for (var i = 1; i < allInputs.length; i++) {
                $(allInputs[i]).prop('checked', false);
            }
            for (var i = 1; i < fieldsets.length; i++) {
                $(fieldsets[i]).hide();
            }
            $('#itemsSection .list-item').addClass('visible');
        } else {
            var inputGroups = $('.inputs-group');
            for (var i = 1; i < inputGroups.length; i++) {
                var inputsInFieldset = $(inputGroups[i]).find('input');
                console.log('inputsInFieldset', inputsInFieldset);

                if ($(inputsInFieldset[0]).prop('checked')) {
                    for (var j = 1; j < inputsInFieldset.length; j++) {
                        var targetID = $(inputsInFieldset[j]).data('target');
                        console.log('all checked targetID: ',targetID);
                        $('.' + targetID).addClass('visible');
                    }
                } else {
                    for (var j = 1; j < inputsInFieldset.length; j++) {
                        console.log('groupsLength', inputGroups.length)
                        var targetID = $(inputsInFieldset[j]).data('target');
                        console.log('links', $('.' + targetID))
                        if ($(inputsInFieldset[j]).prop('checked')) {
                            $('.' + targetID).addClass('visible');
                        } else {
                            $('.' + targetID).removeClass('visible');
                        }
                    }
                }
            }
        }
    }



    function paginationHandler(paginationID) {
          currentPage = parseInt(currentPage);
          totalPages = parseInt(totalPages);
          $(paginationID).removeClass('collapse');
          var pageButtons = "<li class=\"page-item to-first-page\"><a class=\"page-link\" data-page=\"0\" href=\"\" aria-label=\"First\"><span aria-hidden=\"true\">&laquo;</span><span class=\"sr-only\">First</span></a></li>";
          for (var i = 0; i < totalPages; i++) {
              pageButtons += "<li class=\"page-item\"><a class=\"page-link\" data-page=\""+(i)+"\" href=\"\">"+(i+1)+"</a></li>";
          }
          pageButtons += "<li class=\"page-item to-last-page\"><a class=\"page-link\" data-page=\""+(totalPages-1)+"\" href=\"\" aria-label=\"Last\"><span aria-hidden=\"true\">&raquo;</span><span class=\"sr-only\">Last</span></a></li>";
          $(paginationID+' ul').html(pageButtons);

    }

      function handleListItems() {

          currentPage = parseInt($(this).data('page')) || 0;
          $('#pagination ul').find("li").removeClass('active').removeClass('disabled');
          $('#pagination ul').find("li:eq("+(+currentPage+1)+")").addClass('active');
          if (currentPage===0) {
              $('#pagination ul').find("li:eq(0)").addClass('disabled')
          }
          if (currentPage===totalPages-1) {
              $('#pagination ul').find("li:eq("+(totalPages+1)+")").addClass('disabled')
          }
          for (var i = 0; i < listItems.length; i++) {
              if (i >= currentPage * 10 && i < currentPage * 10 +10) {
                  $(listItems[i]).addClass('visible')
              } else {
                  $(listItems[i]).removeClass('visible')
              }

          }
          return false;
      }

      $('#pagination').on('click', '.page-link', handleListItems)



      /* Commands on init */
      $(mainGroupInputs[0]).prop('checked', true);
      $('#itemsSection .list-item').addClass('visible');
      for (var i = 1; i < fieldsets.length; i++) {
          $(fieldsets[i]).hide();
      }

      // Pagination init
      listItems = $('#itemsSection .list-item');
      totalPages = Math.ceil(listItems.length/10);

      if (listItems.length>10) {
          paginationHandler('#pagination');
          handleListItems();
      }

  })
})(jQuery);
