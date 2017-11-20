$(document).ready(function() {
  $("input[type=checkbox]").removeAttr("checked");
  $("#projects").tabs();
  $("ul").sortable({axis: "x", containment: "#projects"});
  $("ol").sortable({axis: "y", containment: "#projects"});
  $("#projects").on("click", "input[type=checkbox]", function() {
    $(this).closest("li").slideUp(function() {
      $(this).remove();
    });
  })
  $("#btnAddTask").button().click(function() {
    $("#task-dialog").dialog({
      width: 400,
      resizable: false,
      modal: true,

      buttons: {
        "Add new task": function() {
          $("#projects").tabs("refresh");
          var activeTab = $("#projects").tabs("option", "active");
          var title = $("#main > li:nth-child(" + (activeTab + 1) + ") >a").attr("href");
          console.log(title);
          $("#projects " + title).append("<li><input type='checkbox'>" + $("#new-task").val() + "</li>");
          console.log(activeTab);

          $("#new-task").val("");
          $(this).dialog("close");
        },
        "Cancel": function() {
          $("#new-task").val("");
          $(this).dialog("close");
        }
      }

    });
  });
  $("#projects").on("click", "span.ui-icon-close", function() {
    var index = $(this).closest("li").index();
    var id = $("#main li:eq(" + index + ") a").attr("href");
    $("#main li:eq(" + index + ") ").remove();
    $(id).remove();
    $("#projects").tabs("refresh");
  });

  $("#btnAddProject").button().click(function() {
    $("#project-dialog").dialog({
      width: 400,
      resizable: false,
      modal: true,
      buttons: {

        "Add New Project": function() {
          var projectName = $("#new-project").val();
          var replaceName = projectName.split(" ").join("_");

          $("<li><a href='#" + replaceName + "'>" + projectName + "</a><span class='ui-icon ui-icon-close'></span></li>").appendTo("#main");
          $("<ol id='" + replaceName + "'></ol>").appendTo("#projects").sortable();
          $("#projects").tabs("refresh");
          var tabCount = $("#projects .ui-tabs-nav li").length;
          $("#projects").tabs("option", "active", tabCount - 1);

          $("#new-project").val("");
          $(this).dialog("close");
        },

        "Cancel": function() {
          $("#new-project").val("");
          $(this).dialog("close");
        }
      }
    });
  });

});
