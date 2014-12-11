//call this to add a warning icon to a graph and log an error to the console
function error(args) {
    console.log('ERROR : ', args.target, ' : ', args.error);
<<<<<<< HEAD:src/js/misc/error.js

    $(args.target)
        .find('.mg-chart-title')
        .append('<i class="fa fa-x fa-exclamation-circle warning"></i>');
=======
    
    //@todo this should also be customizable
    var error = document.createElement('i').className += ' ' + ['.fa', '.fa-x', '.fa-exclamation-circle', '.warning'].join(' ');

    var title = document.querySelector(args.target + ' .chart_title')
   
    if(title)
      title.appendChild(error);
>>>>>>> fix(): Remove jquery occurences in common and misc:src/misc/error.js
}
