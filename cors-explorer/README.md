#CORS Demo

This is a demo of handling CORS in mountebank. The config.json file sets mountebank to provide a CORS header on
a GET resource, and a OPTIONS response for a POST, when the jquery POST request contains a non-standard header.
A non-standard header on a JQuery request will trigger an OPTIONS request prior to the post.

Start [mountebank-UI](http://donhenton.github.io/mountebank-UI/public_html/index.html#/) 
and import the contents of config.json. Send the contents of the config
to your running mountebank server using the Mountebank JSON page.

From the root of the application run  
```
gulp serve-cors
```
the two buttons will submit CORS requests that should pass.
