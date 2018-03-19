#CORS Demo

This is a demo of handling CORS in mountebank. The config.json file sets mountebank to provide a CORS header on
a GET resource, and a OPTIONS response for a POST, when the jquery POST request contains a non-standard header.
A non-standard header on a JQuery request will trigger an OPTIONS request prior to the post.

Start [mountebank-UI](http://donhenton.github.io/mountebank-UI/public_html/index.html#/) 
and import the contents of config.json. Send the contents of the config
to your running mountebank server using the Mountebank JSON page.

This demo is set for netbeans internal server, which runs on port 8383. If 
that's not your port you will have to configure the headers returned by the OPT 
request to use your port.There are two entries, one for localhost and one for 127.0.0.1

the two buttons will submit CORS requests that should pass.

There is a grunt task that will run this as well, but it is on port 9000
