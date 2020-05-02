const tour = new Shepherd.Tour({
    defaultStepOptions: {
        classes: 'shadow-md',
        scrollTo: false,
    },
    useModalOverlay: true
});

document.querySelector("body").addEventListener("click", e => {
    if (e.target.parentNode != null && e.target.parentNode.classList.contains("shepherd-modal-overlay-container")) {
        tour.hide()
    }
})

glot.assign("animation", {
    "en": "Here is the graph that allows you to visualize what happens during the simulation. Each point corresponds to a person. The red circle around Alice represents that she is contagious.",
    "fr": "Voici le graphique qui vous permet de visualiser ce qui se passe durant la simulation. Chaque points correspond à une personne. Le rond rouge autour d'Alice représente qu'elle est contagieuse.",
    "de": "Hier ist die Grafik, mit der Sie visualisieren können, was während der Simulation geschieht. Jeder Punkt entspricht einer Person. Der rote Kreis um Alice zeigt an, dass sie ansteckend ist.",
    "es": "Aquí está el gráfico que le permite visualizar lo que sucede durante la simulación. Cada punto corresponde a una persona. El círculo rojo alrededor de Alice representa que es contagiosa."
})
glot.assign("next", {
    "en": "Next",
    "fr": "Suivant",
    "de": "Nächste",
    "es": "Siguiente"
})
tour.addStep({
    id: 'animation',
    text: glot.get("animation"),
    attachTo: {
        element: 'canvas',
        on: 'right'
    },
    buttons: [{
        text: glot.get("next"),
        action: tour.next
    }]
});
glot.assign("selector", {
    "en": "Here is the selector that allows you to navigate between the different pages.",
    "fr": "Voici le sélecteur qui permet de naviguer entre les différentes pages.",
    "de": "Hier ist der Selektor, der es Ihnen ermöglicht, zwischen den verschiedenen Seiten zu navigieren.",
    "es": "Aquí está el selector que le permite navegar entre las diferentes páginas."
})
glot.assign("previous", {
    "en": "Previous",
    "fr": "Précédent",
    "de": "Vorherige",
    "es": "Anterior"
})
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
        action: () => {
            con.state = 1;
            con.selector();
            tour.next()
        }
    }]
});
glot.assign("panel", {
    "en": "Here is the panel to see in detail the information of each person. At the top, you can select the individual of your choice and see if they are contagious, etc.",
    "fr": "Voici le panel pour voir en détail les informations de chaque personne. En haut, vous pouvez sélectionner l'individu de votre choix et voir si il est contagieux, etc.",
    "de": "Hier ist das Panel, um die Informationen jeder Person im Detail zu sehen. Oben können Sie die Person Ihrer Wahl auswählen und sehen, ob sie ansteckend ist, usw.",
    "es": "Aquí está el panel para ver en detalle la información de cada persona. En la parte superior, puede seleccionar el individuo que desee y ver si es contagioso, etc."
})
tour.addStep({
    id: 'panel',
    text: glot.get("panel"),
    attachTo: {
        element: '.panel',
        on: 'left'
    },
    buttons: [{
        text: glot.get("previous"),
        action: () => {
            con.state = 0;
            con.selector();
            tour.back()
        }
    }, {
        text: glot.get("next"),
        action: () => {
            con.state = 1;
            con.selector();
            tour.next()
        }
    }]
});
glot.assign("gtpark", {
    "en": "This button allows you to send an individual to the park to meet people. Why not send Alice and Bob to the park to see what's going on?",
    "fr": "Ce bouton permet d'envoyer un individu au parc pour qu'il puisse rencontrer du monde. Pourquoi ne pas envoyer Alice et Bob au parc pour voir ce qu'il se passe?",
    "de": "Mit dieser Schaltfläche können Sie eine Person in den Park schicken, um Personen zu treffen. Warum nicht Alice und Bob in den Park schicken, um zu sehen, was los ist?",
    "es": "Este botón permite enviar a un individuo al parque para conocer gente. ¿Por qué no enviar a Alice y Bob al parque para ver qué pasa?"
})
tour.addStep({
    id: 'park',
    text: glot.get("gtpark"),
    attachTo: {
        element: 'button.goto',
        on: 'right'
    },
    buttons: [{
        text: glot.get("previous"),
        action: () => {
            con.state = 1;
            con.selector();
            tour.back()
        }
    }, {
        text: glot.get("next"),
        action: () => {
            con.state = 0;
            con.selector();
            con.sim.bob.goToPark()
            con.sim.alice.goToPark()
            tour.next()
        }
    }]
});
glot.assign("contact", {
    "en": "Now we have to wait until he decides to talk to each other.",
    "fr": "Maintenant, il faut attendre qu'il décide de se parler.",
    "de": "Jetzt müssen wir warten, bis er sich entscheidet, miteinander zu reden.",
    "es": "Ahora tenemos que esperar hasta que decida hablar con el otro."
})
tour.addStep({
    id: 'contact',
    text: glot.get("contact"),
    attachTo: {
        element: 'canvas',
        on: 'left'
    },
    buttons: [{
        text: glot.get("previous"),
        action: () => {
            con.state = 1;
            con.selector();
            con.sim.bob = new Bob("dp3t") // Resets everythng
            con.sim.alice = new Alice("dp3t")
            tour.back()
        }
    }]
});
const randIndex = Math.floor(Math.random() * 2)
glot.assign("contacted", {
    "en": "Okay 👌, they've met! Now, let's see what happens when one of them decides to get tested.",
    "fr": "Ok 👌, ils se sont rencontrés! Maintenant, allons voir ce qui se passe lorsque l'un des deux décide de se faire tester.",
    "de": "Okay 👌, sie haben sich getroffen! Nun wollen wir sehen, was passiert, wenn sich einer von ihnen entscheidet, sich testen zu lassen.",
    "es": "Vale 👌, ¡se han conocido! Ahora, veamos qué pasa cuando uno de ellos decide hacerse la prueba."
})
tour.addStep({
    id: 'contacted',
    text: glot.get("contacted"),
    attachTo: {
        element: 'canvas',
        on: 'left'
    },
    buttons: [{
        text: glot.get("next"),
        action: () => {
            con.state = 1;
            con.sim.bob.goToHouse()
            con.sim.alice.goToHouse()
            con.sim.panelState = randIndex;
            con.sim.panel();
            con.selector();
            tour.next()
        }
    }]
});
glot.assign("testforcovid", {
    "en": "For example, let's say that ${data.name} chooses to get tested for COVID-19 disease, and discovers that the test is positive.",
    "fr": "Par exemple, disons que ${data.name} choisis de se faire tester pour la maladie du COVID-19, et découvre que le test est positif.",
    "de": "Nehmen wir zum Beispiel an, ${data.name} lässt sich auf die COVID-19-Krankheit testen und stellt fest, dass der Test positiv ist.",
    "es": "Por ejemplo, digamos que ${data.name} elige hacerse la prueba de la enfermedad COVID-19, y descubre que la prueba es positiva."
})
tour.addStep({
    id: 'test',
    text: glot.get("testforcovid", {
        name: ["Bob", "Alice", "Charlie", "David"][randIndex]
    }),
    attachTo: {
        element: 'button.test',
        on: 'left'
    },
    buttons: [{
        text: glot.get("previous"),
        action: () => {
            con.state = 0;
            con.sim.bob.goToPark()
            con.sim.bob.met = ["Alice"]
            con.sim.alice.goToPark()
            con.sim.alice.met = ["Bob"]
            con.selector();
            tour.back()
        }
    }, {
        text: glot.get("next"),
        action: () => {
            const persons = [con.sim.bob, con.sim.alice, con.sim.charlie, con.sim.david]
            const person = persons[con.sim.panelState]
            person.alerted = true
            con.sim.panel()
            tour.next()
        }
    }]
});
glot.assign("publishdata", {
    "en": "Oh no! ${data.name} finds out he's contracted the coronavirus. ${data.name} decides to alert people ${data.name == 'Alice' ? \"she\" : \"he\"} may have had contact with.",
    "fr": "Oh non! ${data.name} découvre qu'${data.name == 'Alice' ? \"elle\" : \"il\"} a contracté le coronavirus. ${data.name} décide donc d'alerter les gens avec qui ${data.name == 'Alice' ? \"elle\" : \"il\"} a pu avoir un contact.",
    "de": "Oh nein! ${data.name} erfährt, dass er sich mit dem Coronavirus angesteckt hat. ${data.name} beschließt, Personen zu alarmieren, mit denen sie möglicherweise Kontakt hatte.",
    "es": "¡Oh no! ${data.name} descubre que ha contraído el coronavirus. ${data.name} decide alertar a la gente con la que pudo haber tenido contacto."
})
tour.addStep({
    id: 'publish',
    text: glot.get("publishdata", {
        name: ["Bob", "Alice", "Charlie", "David"][randIndex]
    }),
    attachTo: {
        element: 'button.test',
        on: 'left'
    },
    buttons: [{
        text: glot.get("previous"),
        action: () => {
            const persons = [con.sim.bob, con.sim.alice, con.sim.charlie, con.sim.david]
            const person = persons[con.sim.panelState]
            person.alerted = false
            con.sim.panel()
            tour.back()
        }
    }, {
        text: glot.get("next"),
        action: () => {
            const persons = [con.sim.bob, con.sim.alice, con.sim.charlie, con.sim.david]
            const person = persons[con.sim.panelState]
            con.sim.server.addKeys(person.name, person.generateBroadcastHistoryFull(), person.getDayKeys())
            con.state = 0;
            con.selector();
            tour.next()
        }
    }]
});

glot.assign("done", {
    "en": "Congratulations 👏! You managed to use the simulation. Do you want to keep using it? Click on continue. Or if you want to access a more advanced version, we have developed a version for people who, like you, are true experts in cryptography!",
    "fr": "Bravo 👏! Tu as réussi à utiliser la simulation. Tu veux continuer à l'utiliser? Clique sur continuer. Sinon si tu veux accéder à une version plus corsée, nous avons développé une version pour les gens qui, comme toi, sont de véritables experts en cryptographie!",
    "de": "Gut gemacht, 👏! Es ist Ihnen gelungen, die Simulation zu nutzen. Wollen Sie es weiterhin verwenden? Klicken Sie auf Weiter. Oder wenn Sie auf eine fortgeschrittenere Version zugreifen möchten, haben wir eine Version für Leute entwickelt, die, wie Sie, echte Experten in Kryptographie sind!",
    "es": "¡Bravo 👏! Te las arreglaste para usar la simulación. ¿Quieres seguir usándolo? Haga clic en continuar. O si quieres acceder a una versión más avanzada, hemos desarrollado una versión para personas que, como tú, ¡son verdaderos expertos en criptografía!"
})
glot.assign("continue", {
    "en": "Continue",
    "fr": "Continuer",
    "de": "Weiter",
    "es": "Continúa"
})
glot.assign("pro", {
    "en": "Pro Version",
    "fr": "Version Pro",
    "de": "Pro-Version",
    "es": "Versión Pro"
})
tour.addStep({
    id: 'done',
    text: glot.get("done"),
    attachTo: {
        element: 'canvas',
        on: 'top'
    },
    buttons: [{
        text: glot.get("pro"),
        action: () => {
            window.location = "https://cryptool.org/en/cto-highlights/corona-tracing"
        }
    }, {
        text: glot.get("continue"),
        action: () => {
            window.location.reload()
        }
    }]
});