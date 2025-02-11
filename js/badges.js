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
          $list.append('<li class="expand">&mldr;</li>')
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
    }
  }

  // Attach to global namespace or export as a module
  window.BadgeList = BadgeList
})(jQuery)