(function ($) {
  const BadgeList = {
    init: function (selector) {
      $(selector).each(function () {
        const $list = $(this)
        const $listItems = $list.find('li')
        let $expandButton = $list.find('.expand')

        // Initially show only items with the class "showcase" and hide others
        $listItems.each(function () {
          const $item = $(this)
          if ($item.hasClass('showcase')) {
            $item.show()
          } else {
            $item.hide()
          }
        })

        // Dynamically append the expand button if it doesn't exist
        if ($expandButton.length === 0) {
          $list.append('<li class="expand"><i class="fa-solid fa-circle-plus"></i>')
          $expandButton = $list.find('.expand')
        }

        // Expand button click handler
        $expandButton.on('click', function () {
          $listItems.each(function () {
            const $item = $(this)
            if ($item.hasClass('group')) {
              $item.hide()
            } else {
              $item.show()
            }
          })
          $(this).hide() // Hide the expand button
        })
      })

      // Attach hover event AFTER initializing elements
      $("ul.badges").hover(
        function() {
          $(this).find(".expand i").addClass("fa-beat-fade");
        },
        function() {
          $(this).find(".expand i").removeClass("fa-beat-fade");
        }
      );
    }
  }

  // Attach to global namespace or export as a module
  window.BadgeList = BadgeList
})(jQuery)
