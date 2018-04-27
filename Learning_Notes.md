# Angular Misc - Running 1.6.4

- All Angulargjs directive in this project are prefixed with 'data-'. This allows
HTML to pass validation by validators and browsers who might not support non-default HMTL attributes. The HTML spec states that custom attributes should have the data prefix.

- In angular whatever is placed in this {{}} is evaluated as javascript and the output of that code is rendered in the HTML

- ng-controller associates a controller with a DOM sub-tree rooted at the tagged element. {{}} expressions will operate within the context of the controller.

- TODO: What is viewFactory? We seem to use it for passing state between views, e.g. the title of each dash tab.
- app-index.js maps URLs, views, and controllers together

- angular dependencies are configured in an inline script in index.html and initialize.html

# Kongdash

- if there is a reference to toast available, use toast to display messages
- Kongdash uses a grid system similar to bootstrap with contianer > row > col
- To specify a col size add a size class, e.g. md-4

# Fail

- Attempted to use Angular Material UI Components for the tabs but they did not work.
- I will look into implementing them custom with Angular 
