# Mountebank UI

## URL
The url for this application is 
[http://donhenton.github.io/mountebank-UI/public_html/index.html](http://donhenton.github.io/mountebank-UI/public_html/index.html)

## Source Code
[https://github.com/donhenton/mountebank-UI](https://github.com/donhenton/mountebank-UI)

## Sample Data
Example data can be found at
https://github.com/donhenton/mountebank-UI/blob/master/docs/madjs/mountebank-UI-restaurant.json
The docs folder holds a Powerpoint presentation as well

## YouTube Presentation

https://www.youtube.com/watch?v=69usGV3uScI&list=WL&index=5

## Summary

Mountebank UI is a test double generator for
the  [Mountebank](http://www.mbtest.org) server. This program helps
the user formulate the various sections of the JSON that are used with 
Mountebank's API to create a test double.

## The Home Page   
This is the page where one can set the response or multiple responses, 
and the required criteria. This page works on the current **Imposter
    Collection** which is all the imposters for a given port. An imposter
is a given response/match pair. New imposters can be added or deleted
on this page as well. Additionally, imposters can be sorted, to allow for
handling short-circuit matching logic.

### Support for Injection 
Injection of predicates and responses is supported in Mountebank UI. To use
it, beware that it is either Injection OR Standard, and using one will wipe
out any work for the other. Select the work areas via the toggle checkbox.
For more see the [Mountebank Injection Documentation](href="http://www.mbtest.org/docs/api/injection").

> ### Notes 
> * Http protocol only
> * For any element in Response or Match, if left blank it will not be 
    included in the mountebank json. 
> * Query elements in match criteria use only deepEquals 
> * Method is not optional 
> * The match logic is each group (body, query parameters, headers)
>     are AND'd together. Complex logic using OR is not currently 
>     available. You can use Injection instead. 


## Collection Maintenance Page  
This is the page where one can delete and add collections, as well as
modify the properties
associated with a collection, currently the description and the port.
### CORS support
**Use Cors** allows you to specify placing a CORS response OPTIONS handler and
a Origin header on each request automatically. These headers and responses will 
use the origin url specified in the **CORS Origin Full Url** slot.
Note that Method Headers are set to POST,PUT,DELETE,GET,PATCH. If you use
the injection feature, you will have to include the Response headers manually,
but the OPTION response will still be added.

### Default Response
**Add Default** allows adding a catch-all response to your collection. This
will be returned if no match takes place. The default response to send if no 
predicate matches. Also represents the default values that get merged into 
a response that doesn't specify every field.


## Mountebank JSON Page
This page provides a read only display of the JSON that can be posted to 
Mountebank's imposters endpoint. Additionally one can post directly to
mountebank via a form. Provide the base url to mountebank, and choose the
action, either post or delete. Note that Mountebank will need the '--allowCORS'
option for this to work.

## Persistence (Import/Export)
All data is persisted to local storage. If accessing this application
for the first time, an initial collection will be created. The data can 
be exported and imported using the menu item **Import/Export**.  
The persisted data is in a format
which allows the creation of the Mountebank data, it is not in the 
Mountebank format.

## Dev Notes
Dev server: gulp dev will serve from src
gulp serve-html will serve from the public_html folder, which is the build
folder for gh-pages. gulp build is used to create public_html