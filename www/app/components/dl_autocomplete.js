(function () {
  "use strict";

  angular
    .module("dlAutocomplete", [])
    .directive("dlAutocomplete", dlAutocompleteDirective);

    function dlAutocompleteDirective() {
      var dlAutocomplete = {
        link: link
      };

      return dlAutocomplete;

      function link($scope, $element, $attrs) {
        var autocompleteList = ["aaaaaaaaaa", "aaaaccccc", "bbbbbb"];
        var wrapper = angular.element("<div class=\"dl-autocomplete-wrapper\" />");
        var background = angular.copy($element);
        background.attr("placeholder", "");
        background.addClass("dl-autocomplete-background");
        $element.addClass("dl-autocomplete-text-field");
        $element.after(wrapper);
        wrapper.append(background);
        wrapper.append($element);
        var current;
        $element.bind("input", function () {
          var value = $element.val();
          if (value === "") {
            background.val("");
            return;
          }
          for (var i = 0; i < autocompleteList.length; i ++) {
            if (autocompleteList[i].indexOf(value) === 0) {
              current = autocompleteList[i];
              background.val(autocompleteList[i]);
              break;
            } else {
              current = null;
              background.val("");
            }
          }
        });
        $element.bind("blur", function () {
          if (current) {
            background.text("");
            $element.val(current)
          }
        });
      }
    }
})();