# Monitor-Log
Traitement de fichier.log  un script qui premet  d'enregistrer lof en base de donné. Exraction de chaque ligne d'un fichier log, les informations de chaque ligne sont au format (date, type d'alerte, message) et les enregistre dans un format approprié.

#Monitoring avec Chart JS
Puis affichage des stats des Log en fonction du type d'alerte


# exemple de contenu:


[2023-05-23T21:47:37.143298+02:00] request.INFO: Matched route "_wdt". {"route":"_wdt","route_parameters":{"_route":"_wdt","_controller":"web_profiler.controller.profiler::toolbarAction","token":"f9aabd"},"request_uri":"https://localhost:8000/_wdt/f9aabd","method":"GET"} []

[2023-05-24T11:23:16.624149+02:00] request.INFO: Matched route "api.detail.Prestataire". {"route":"api.detail.Prestataire","route_parameters":{"_route":"api.detail.Prestataire","_controller":"App\\Controller\\Api\\PrestataireController::getPrestataireDetail","id":"30"},"request_uri":"http://localhost:8002/api/prestataires/show/30","method":"GET"} []
