angular.module('app.constants',[])
         .constant('TPL_PATH', getTemplatePath()) //used to prepend a set of folders for templates in app.routes
         .constant('HEADER_LOCATION',getHeaderPath());
 
 //localhost:8383/mountebank-UI/mountebank-UI/partials/plainHeader.tpl.html
 function getTemplatePath()
{
    var path = window.location.pathname;
    var pathCol = path.split("/");
   // console.log(pathCol);
    var pathItem = 'http://' + window.location.host;
    
    for (var i=0;i<pathCol.length-1;i++)
    {
        pathItem = pathItem + pathCol[i]+"/"; 
    }
     
    //pathItem is full url and app context
    pathItem += 'mountebank-UI/';
    //now in the folder that contains all the js
    return pathItem;
}

function getHeaderPath()
{
  return  getTemplatePath()+"partials/plainHeader.tpl.html";
}

