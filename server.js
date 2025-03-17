var http = require('http');
var url = require('url');

function start(route,handle)
{
    function onRequest(request,response)
    {
        var pathname = url.parse(request.url).pathname;
        console.log("Requete recue pour le chemin "+pathname);
        route(handle,pathname,response);
    }

    http.createServer(onRequest).listen(8888);
    console.log("Demarrage du serveur");
}

exports.start = start;