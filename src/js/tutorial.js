var tour = (function () {
    'use strict';

    var tour = new Shepherd.Tour({
      defaultStepOptions: {
        classes: 'shadow-md',
        scrollTo: false,
        cancelIcon: {
          enabled: true
        }
      },
      useModalOverlay: true,
      exitOnEsc: true
    }); // document.querySelector("body").addEventListener("click", e => {
    //     if (e.target.parentNode != null && e.target.parentNode.classList.contains("shepherd-modal-overlay-container")) {
    //         con.reset()
    //         tour.hide()
    //         tour.isShown = false
    //     }
    // })

    Shepherd.on("cancel", function () {
      con.reset();
      tour.isShown = false;
    });
    glot.assign("animation", {
      "en": "Here is the graph that allows you to visualize what happens during the simulation. Each point corresponds to a person. The red circle around Alice represents that she is contagious.",
      "fr": "Voici le graphique qui vous permet de visualiser ce qui se passe durant la simulation. Chaque points correspond à une personne. Le rond rouge autour d'Alice représente qu'elle est contagieuse.",
      "de": "Hier ist die Grafik, mit der Sie visualisieren können, was während der Simulation geschieht. Jeder Punkt entspricht einer Person. Der rote Kreis um Alice zeigt an, dass sie ansteckend ist.",
      "es": "Aquí está el gráfico que le permite visualizar lo que sucede durante la simulación. Cada punto corresponde a una persona. El círculo rojo alrededor de Alice representa que es contagiosa."
    });
    glot.assign("next", {
      "en": "Next",
      "fr": "Suivant",
      "de": "Nächste",
      "es": "Siguiente"
    });
    tour.addStep({
      id: 'animation',
      text: glot.get("animation"),
      attachTo: {
        element: 'canvas',
        on: 'bottom'
      },
      buttons: [{
        text: glot.get("next"),
        action: tour.next
      }]
    });
    glot.assign("selector", {
      "en": "Here are the tabs that allows you to navigate between the different pages.",
      "fr": "Voici les onglets qui vous permettent de naviguer entre les différentes pages.",
      "de": "Hier sind die Reiter, die es Ihnen ermöglichen, zwischen den verschiedenen Seiten zu navigieren.",
      "es": "Aquí están las pestañas que le permiten navegar entre las diferentes páginas."
    });
    glot.assign("previous", {
      "en": "Previous",
      "fr": "Précédent",
      "de": "Vorherige",
      "es": "Anterior"
    });
    tour.addStep({
      id: 'selector',
      text: glot.get("selector"),
      attachTo: {
        element: '.app > .selector',
        on: 'top'
      },
      buttons: [{
        text: glot.get("previous"),
        action: tour.back
      }, {
        text: glot.get("next"),
        action: function action() {
          con.state = 2;
          con.selector();
          tour.next();
        }
      }]
    });
    glot.assign("settings-tour", {
      "en": "This is the settings interface. Here you can see the data collected by the server (we'll get to that later). You can also change the date (because Broadcast-IDs change with time), and the protocol used.",
      "fr": "Voici l'interface des réglages. Ici, vous pouvez voir les données recueillies par le serveur (on y viendra plus tard). Vous pouvez aussi changer la date (car les Broadcast-IDs changent en fonction du temps), et le protocole utilisé.",
      "de": "Dies ist die Einstellungsschnittstelle. Hier können Sie die vom Server gesammelten Daten sehen (dazu kommen wir später). Sie können auch das Datum (da sich Broadcast-IDs mit der Zeit ändern) und das verwendete Protokoll ändern.",
      "es": "Esta es la interfaz de configuración. Aquí puede ver los datos recogidos por el servidor (llegaremos a eso más tarde). También se puede cambiar la fecha (porque los Broadcast-IDs cambian con el tiempo), y el protocolo utilizado."
    });
    tour.addStep({
      id: 'settings',
      text: glot.get("settings-tour"),
      attachTo: {
        element: '.control',
        on: 'bottom'
      },
      buttons: [{
        text: glot.get("previous"),
        action: function action() {
          con.state = 0;
          con.selector();
          tour.back();
        }
      }, {
        text: glot.get("next"),
        action: function action() {
          con.state = 1;
          con.selector();
          tour.next();
        }
      }]
    });
    glot.assign("panel", {
      "en": "Here is the panel to see in detail the information about each person. At the top, you can select the individual of your choice and see if they are contagious, etc.",
      "fr": "Voici le panel pour voir en détail les informations de chaque personne. En haut, vous pouvez sélectionner l'individu de votre choix et voir si il est contagieux, etc.",
      "de": "Hier ist das Panel, um die Informationen jeder Person im Detail zu sehen. Oben können Sie die Person Ihrer Wahl auswählen und sehen, ob sie ansteckend ist, usw.",
      "es": "Aquí está el panel para ver en detalle la información de cada persona. En la parte superior, puede seleccionar el individuo que desee y ver si es contagioso, etc."
    });
    tour.addStep({
      id: 'panel',
      text: glot.get("panel"),
      attachTo: {
        element: '.panel',
        on: 'bottom'
      },
      buttons: [{
        text: glot.get("previous"),
        action: function action() {
          con.state = 2;
          con.selector();
          tour.back();
        }
      }, {
        text: glot.get("next"),
        action: function action() {
          con.state = 1;
          con.selector();
          tour.next();
        }
      }]
    });
    glot.assign("gtpark", {
      "en": "With this button you can send a person to the park to meet other people. Why not send Alice and Bob to the park to see what's going on?",
      "fr": "Avec ce bouton, vous pouvez envoyer une personne au parc pour rencontrer d'autres personnes. Pourquoi ne pas envoyer Alice et Bob au parc pour voir ce qu'il se passe?",
      "de": "Mit diesem Button können Sie eine Person in den Park senden, um dort andere Personen zu treffen. Warum nicht Alice und Bob in den Park schicken, um zu sehen, was los ist?",
      "es": "Con este botón puedes enviar a una persona al parque para que conozca a otras personas. ¿Por qué no enviar a Alice y Bob al parque para ver qué pasa?"
    });
    tour.addStep({
      id: 'park',
      text: glot.get("gtpark"),
      attachTo: {
        element: 'button.goto',
        on: 'bottom'
      },
      buttons: [{
        text: glot.get("previous"),
        action: function action() {
          con.state = 1;
          con.selector();
          tour.back();
        }
      }, {
        text: glot.get("next"),
        action: function action() {
          con.state = 0;
          con.selector();
          con.sim.bob.goToPark();
          con.sim.alice.goToPark();
          tour.isShown = true; // In some cases, the isShown isn't set to true, so to fix that we're manually setting it to true

          tour.next();
        }
      }]
    });
    glot.assign("contact", {
      "en": "Now we have to wait until they decide to talk to each other.",
      "fr": "Maintenant, nous devons attendre qu'ils décident de se parler.",
      "de": "Jetzt müssen wir warten, bis sie sich entscheiden, miteinander zu reden.",
      "es": "Ahora tenemos que esperar hasta que decidan hablar entre ellos."
    });
    tour.addStep({
      id: 'contact',
      text: glot.get("contact"),
      attachTo: {
        element: 'canvas',
        on: 'top'
      },
      buttons: [{
        text: glot.get("previous"),
        action: function action() {
          con.state = 1;
          con.selector();
          con.sim.bob.goToHouse();
          con.sim.alice.goToHouse();
          tour.back();
        }
      }]
    });
    var randIndex = Math.floor(Math.random() * 2);
    glot.assign("contacted", {
      "en": "Okay 👌, they've met! Now, let's see what happens when one of them decides to get tested.",
      "fr": "Ok 👌, ils se sont rencontrés! Maintenant, allons voir ce qui se passe lorsque l'un des deux décide de se faire tester.",
      "de": "Okay 👌, sie haben sich getroffen! Nun wollen wir sehen, was passiert, wenn sich einer von ihnen entscheidet, sich testen zu lassen.",
      "es": "Vale 👌, ¡se han conocido! Ahora, veamos qué pasa cuando uno de ellos decide hacerse la prueba."
    });
    tour.addStep({
      id: 'contacted',
      text: glot.get("contacted"),
      attachTo: {
        element: 'canvas',
        on: 'top'
      },
      buttons: [{
        text: glot.get("next"),
        action: function action() {
          con.state = 1;
          con.sim.bob.goToHouse();
          con.sim.alice.goToHouse();
          con.sim.panelState = randIndex;
          con.sim.panel();
          con.selector();
          tour.next();
        }
      }]
    });
    glot.assign("testforcovid", {
      "en": "For example, let's say that ${data.name} chooses to get tested for COVID-19 disease. By clicking '${glot.get('next')}', ${data.name} will go to a hospital, get tested and receive the results. Because it's a simulation, all of that is done instantly.",
      "fr": "Par exemple, disons que ${data.name} choisit de se faire tester pour la maladie COVID-19. En cliquant sur '${glot.get('next')}', ${data.name} se rendra à l'hôpital, se fera tester et recevra les résultats. Comme il s'agit d'une simulation, tout cela se fait instantanément.",
      "de": "Nehmen wir zum Beispiel an, dass ${data.name} beschließt, sich auf die Krankheit COVID-19 testen zu lassen. Wenn Sie auf '${glot.get('next')}' klicken, geht ${data.name} in ein Krankenhaus, lässt sich testen und erhält die Ergebnisse. Da es sich um eine Simulation handelt, ist all dies sofort erledigt.",
      "es": "Por ejemplo, digamos que ${data.name} elige hacerse la prueba de la enfermedad COVID-19. Al hacer clic en '${glot.get('next')}', ${data.name} irá a un hospital, se hará la prueba y recibirá los resultados. Debido a que es una simulación, todo eso se hace al instante."
    });
    tour.addStep({
      id: 'test',
      text: glot.get("testforcovid", {
        name: ["Bob", "Alice", "Charlie", "David"][randIndex]
      }),
      attachTo: {
        element: 'button.test',
        on: 'top'
      },
      buttons: [{
        text: glot.get("previous"),
        action: function action() {
          con.state = 0;
          con.sim.bob.goToPark();
          con.sim.bob.met = ["Alice"];
          con.sim.alice.goToPark();
          con.sim.alice.met = ["Bob"];
          con.selector();
          tour.back();
        }
      }, {
        text: glot.get("next"),
        action: function action() {
          document.querySelector("button.test").click();
          tour.next();
        }
      }]
    });
    glot.assign("publishdata", {
      "en": "Oh no! ${data.name} finds out ${data.name == 'Alice' ? \"she\" : \"he\"}'s contracted the coronavirus. ${data.name} decides to alert people ${data.name == 'Alice' ? \"she\" : \"he\"} may have had contact with. ${data.name} does this by pressing a button on the app.",
      "fr": "Oh non! ${data.name} découvre qu'${data.name == 'Alice' ? \"elle\" : \"il\"} a contracté le coronavirus. ${data.name} décide donc d'alerter les gens avec qui ${data.name == 'Alice' ? \"elle\" : \"il\"} a pu avoir un contact. ${data.name} fait cela en appuyant sur un bouton sur l'app.",
      "de": "Oh nein! ${data.name} erfährt, dass ${data.name == 'Alice' ? \"sie\" : \"er\"} sich mit dem Coronavirus angesteckt hat. ${data.name} beschließt, Personen zu alarmieren, mit denen ${data.name == 'Alice' ? \"sie\" : \"er\"} möglicherweise Kontakt hatte. Dies geschieht durch Drücken einer Schaltfläche in der App. ${data.name} tut dies, indem er einen Knopf auf der App drückt.",
      "es": "¡Oh no! ${data.name} descubre que ha contraído el coronavirus. ${data.name} decide alertar a la gente con la que pudo haber tenido contacto. Lo hace presionando un botón en la aplicación."
    });
    tour.addStep({
      id: 'publish',
      text: glot.get("publishdata", {
        name: ["Bob", "Alice", "Charlie", "David"][randIndex]
      }),
      attachTo: {
        element: 'button.test',
        on: 'top'
      },
      buttons: [{
        text: glot.get("previous"),
        action: function action() {
          var persons = [con.sim.bob, con.sim.alice, con.sim.charlie, con.sim.david];
          var person = persons[con.sim.panelState];
          person.alerted = false;
          con.sim.panel();
          tour.back();
        }
      }, {
        text: glot.get("next"),
        action: function action() {
          document.querySelector("button.test").click();
          con.state = 2;
          con.selector();
          con.sim.server.display(con.sim.popup);
          tour.next();
        }
      }]
    });
    glot.assign("whathappened", {
      "en": "Let's try to figure out what happened. ${data.name1}'s phone uploaded ${data.name1 == 'Alice' ? 'her' : 'his'} secret keys for each day. These are the ones we see. ${data.name2}'s phone downloaded those keys and then generated the Broadcast-IDs that could have been sent by ${data.name1}. Then ${data.name2} compared the results with the Broadcast-IDs they had heard. Because there was a match, ${data.name2} received a notification.",
      "fr": "Essayons de comprendre ce qu'il s'est passé. Le téléphone de ${data.name1} a uploadé ses clés secrètes pour chaque jours. C'est celles-ci que l'on voit. Le téléphone de ${data.name2} a téléchargé ces clé puis a généré les Broadcast-IDs qui auraient pu être envoyer par ${data.name1}. Puis, ${data.name2} a comparé ces résultats aux Broadcast-IDs qu'il avait entendu. Comme il y avait une correspondance, ${data.name2} a reçu une notification.",
      "de": "Versuchen wir herauszufinden, was passiert ist. ${data.name1}s Smartphone hat seine geheimen Schlüssel für jeden Tag hochgeladen. Das sind die, die wir sehen. ${data.name2}s Smartphone lud diese Schlüssel herunter und erzeugte dann die Broadcast-IDs, die von ${data.name1} hätten gesendet werden können. Dann verglich ${data.name2} die Ergebnisse mit den Broadcast-IDs, die ihr Smartphone empfangen und gespeichert hatte. Da es eine Begegnung gab, erhielt ${data.name2} eine Benachrichtigung.",
      "es": "Tratemos de averiguar qué pasó. El teléfono de ${data.name1} subió sus llaves secretas para cada día. Estos son los que vemos. El teléfono de ${data.name2} descargó esas teclas y luego generó los Broadcast-IDs que podrían haber sido enviados por ${data.name1}. Luego comparó los resultados con los Broadcast-ID que habían escuchado. Como había una coincidencia, ${data.name2} recibió una notificación."
    });
    tour.addStep({
      id: 'whathappened',
      text: glot.get("whathappened", {
        name1: ["Bob", "Alice", "Charlie", "David"][randIndex],
        name2: ["Bob", "Alice", "Charlie", "David"][randIndex] == "Bob" ? "Alice" : "Bob"
      }),
      attachTo: {
        element: '.infobox .container',
        on: 'bottom'
      },
      buttons: [{
        text: glot.get("previous"),
        action: function action() {
          con.state = 1;
          con.selector();
          con.sim.popup.state = false;
          con.sim.popup.render();
          tour.back();
        }
      }, {
        text: glot.get("next"),
        action: function action() {
          con.sim.popup.state = false;
          con.sim.popup.render();
          con.state = 0;
          con.selector();
          tour.next();
        }
      }]
    });
    glot.assign("done", {
      "en": "Congratulations 👏! You managed to use the simulation. Do you want to keep using it? Click on \"${glot.get('continue')}\". Or if you want to access a more advanced version in a new browser tab, showing cryptographic details of the protocols behind please click on \"${glot.get('pro')}\".",
      "fr": "Félicitations 👏 ! Vous avez réussi à utiliser la simulation. Voulez-vous continuer à l'utiliser ? Cliquez sur \"${glot.get('continue')}\". Ou si vous voulez accéder à une version plus avancée dans un nouvel onglet du navigateur, montrant les détails cryptographiques des protocoles sous-jacents, veuillez cliquer sur \"${glot.get('pro')}\".",
      "de": "Herzlichen Glückwunsch 👏! Es ist Ihnen gelungen, die Simulation zu nutzen. Wollen Sie sie weiterhin benutzen? Klicken Sie auf \"${glot.get('continue')}\". Oder wenn Sie auf eine fortgeschrittenere Version in einem neuen Browser-Tab zugreifen wollen, der kryptographische Details der dahinter liegenden Protokolle anzeigt, klicken Sie bitte auf \"${glot.get('pro')}\".",
      "es": "Felicitaciones 👏! Te las arreglaste para usar la simulación. ¿Quieres seguir usándola? Haz clic en \"${glot.get('continue')}\". O si quieres acceder a una versión más avanzada en una nueva pestaña del navegador, mostrando los detalles criptográficos de los protocolos que hay detrás, por favor, haz clic en \"${glot.get('pro')}\"."
    });
    glot.assign("continue", {
      "en": "Leave the walkthrough",
      "fr": "Quitter le tutoriel",
      "de": "Walkthrough verlassen",
      "es": "Salga del tutorial"
    });
    glot.assign("pro", {
      "en": "CTO Corona Protocol Demo",
      "fr": "Demo des protocoles sur CTO",
      "de": "CTO-Corona-Protokoll-Demo",
      "es": "Versión pro"
    });
    tour.addStep({
      id: 'done',
      text: glot.get("done"),
      attachTo: {
        element: 'canvas',
        on: 'top'
      },
      buttons: [{
        text: glot.get("pro"),
        action: function action() {
          if (glot.lang == "de") {
            window.location = "https://cryptool.org/de/cto-highlights/corona-tracing";
            return;
          }

          window.location = "https://cryptool.org/en/cto-highlights/corona-tracing";
        }
      }, {
        text: glot.get("continue"),
        action: function action() {
          con.reset();
          tour.hide();
          tour.isShown = false;
        }
      }]
    });

    return tour;

}());
//# sourceMappingURL=tutorial.js.map
