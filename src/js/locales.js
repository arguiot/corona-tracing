const url = new URL(window.location.toString());
const lang = url.searchParams.get("lang");

const glot = new Glottologist()

if (lang != null) {
    glot.lang = lang
}

if (glot.lang == "de") {
    document.querySelector(".corona-tracing-cto").href = "https://www.cryptool.org/de/cto/corona-tracing"
}

glot.assign("title", {
    "en": "Privacy-friendly contact tracing",
    "fr": "Traçage de contact préservant la vie privée",
    "de": "Datenschutzfreundliche Tracing-Apps",
    "es": "Rastreo de contactos con privacidad"
})
glot.assign("description", {
    "en": "Across the world, governments and health authorities are working together to find solutions to the COVID‑19 pandemic.<br>In recent weeks, some concerns about certain tracking technologies have been raised by those who fear the curtailment of individual freedoms and their privacy.<br>At CrypTool, we try to explain as well as possible what is hidden in these decentralized tracing protocols so that you can form your own opinion on the subject.",
    "fr": "Partout dans le monde, les gouvernements et les autorités sanitaires travaillent ensemble pour trouver des solutions à la pandémie de COVID-19, pour protéger les personnes et remettre la société sur pied.<br>Au cours des dernières semaines, certaines inquiétudes concernant certaines technologies de suivi ont été soulevées par ceux qui craignent une restriction des libertés individuelles et de leur vie privée.<br>Chez CrypTool, nous essayons d'expliquer au mieux ce qui se cache dans ces protocoles de traçage décentralisés afin que vous puissiez vous faire votre propre opinion sur le sujet.",
    "de": "Überall auf der Welt arbeiten Regierungen und Gesundheitsbehörden zusammen, um Lösungen für die COVID-19-Pandemie zu finden.<br>In den letzten Wochen wurden einige Bedenken über bestimmte Tracing-Technologien geäußert, aus Furcht vor einer Beschneidung der individuellen Freiheiten und der Privatsphäre.<br>Bei CrypTool versuchen wir, so gut wie möglich zu erklären, was in diesen dezentralen Tracing-Protokollen verborgen ist, damit Sie sich Ihre eigene Meinung zu diesem Thema bilden können.",
    "es": "En todo el mundo, los gobiernos y las autoridades sanitarias están trabajando juntos para encontrar soluciones a la pandemia de COVID-19, para proteger a las personas y hacer que la sociedad vuelva a funcionar.<br>En las últimas semanas, algunas preocupaciones sobre ciertas tecnologías de rastreo han sido planteadas por aquellos que temen el recorte de las libertades individuales y su privacidad.<br>En CrypTool, tratamos de explicar lo mejor posible lo que se esconde en estos protocolos de rastreo descentralizados para que usted pueda formarse su propia opinión sobre el tema."
})
glot.assign("links-try", {
    "en": "Try the animation below",
    "fr": "Essayez l'animation ci-dessous",
    "de": "Zur Animation am Seitenende",
    "es": "Pruebe nuestra animación"
})
glot.assign("implementation", {
    "en": "Implementation of protocols",
    "fr": "Implementation des protocoles",
    "de": "Implementierung von Protokollen",
    "es": "Aplicación de los protocolos"
})
glot.assign("step1-bold", {
    "en": "Alice’s phone broadcasts a random message every few minutes",
    "fr": "Le téléphone d'Alice diffuse un message aléatoire toutes les quelques minutes",
    "de": "Das Smartphone von Alice sendet alle paar Minuten eine zufällige Nachricht",
    "es": "El teléfono de Alice emite un mensaje al azar cada pocos minutos"
})
glot.assign("step1-text", {
    "en": "In order to maintain user privacy, the message is sent over Bluetooth and does not contain location data for proximity detection.<br><br>This message is called a Rolling Proximity Identifier or <code>EphID</code>. For now, let's call them Broadcast-IDs. These identifiers are unique and change often.",
    "fr": "Afin de préserver la vie privée des utilisateurs, le message est envoyé par Bluetooth et n'utilise pas la localisation pour la détection de proximité.<br><br>Ce message s'appelle un Rolling Proximity Identifier ou <code>EphID</code>. Pour le moment, appelons les Broadcast-IDs. Ces identificateurs sont uniques et changent souvent.",
    "de": "Um die Privatsphäre der Benutzer zu wahren, wird die Nachricht über Bluetooth gesendet und es werden keine Ortsangaben für die Kontakte verwendet.<br><br>Diese Nachricht wird Rolling Proximity Identifier oder <code>EphID</code> genannt. Lassen Sie uns diese vorerst Broadcast-IDs nennen. Diese Identifikatoren sind eindeutig und ändern sich häufig.",
    "es": "Para mantener la privacidad del usuario, el mensaje se envía por Bluetooth y no utiliza la localización para la detección de proximidad.<br><br>Este mensaje se llama Rolling Proximity Identifier o <code>EphID</code>. Por ahora, llamemos a los Broadcast-IDs. Estos identificadores son únicos y cambian a menudo."
})
glot.assign("step2.A-bold", {
    "en": "Alice and Bob meet each other for the first time and have a 10-minute conversation.",
    "fr": "Alice et Bob se rencontrent pour la première fois et ont une conversation de 10 minutes.",
    "de": "Alice und Bob treffen sich zum ersten Mal und führen ein 10-minütiges Gespräch.",
    "es": "Alice y Bob se conocen por primera vez y tienen una conversación de 10 minutos."
})
glot.assign("step2.A-text", {
    "en": "While they discuss, their phones keep sending random messages.<br><br>Alice doesn’t have any symptoms and both don’t know that Alice is contagious.",
    "fr": "Pendant qu'ils discutent, leur téléphone continue d'envoyer des messages aléatoires.<br><br>Alice n'a aucun symptôme et Bob ne sait pas qu'elle est contagieuse.",
    "de": "Während sie diskutieren, senden ihre Smartphones immer wieder zufällige Nachrichten.<br><br>Alice hat keine Symptome und beide wissen nicht, dass Alice ansteckend ist.",
    "es": "Mientras discuten, su teléfono sigue enviando mensajes al azar. Alice no tiene ningún síntoma y Bob no sabe que es contagiosa."
})
glot.assign("step2.B-bold", {
    "en": "Their phones exchange anonymous Broadcast-IDs.",
    "fr": "Leurs téléphones échangent des Broadcast-IDs anonymes.",
    "de": "Ihre Smartphones tauschen anonyme Broadcast-IDs aus.",
    "es": "Sus teléfonos intercambian Broadcast-IDs anónimas."
})
glot.assign("step2.B-text", {
    "en": "Both phones remember what they said and heard from each other in the past 14 days.<br><br>With no servers involved, only the phones know that they have been in contact.",
    "fr": "Les deux téléphones se souviennent de ce qu'ils ont dit et entendu l'un de l'autre au cours des 14 derniers jours.<br><br>En l'absence de serveurs, seuls les téléphones savent qu'ils ont été en contact.",
    "de": "Beide Smartphones \"erinnern\" sich daran, was sie in den letzten 14 Tagen \"gesagt\" und voneinander gehört haben.<br><br>Da keine Server beteiligt sind, wissen nur die Smartphones, dass sie in Kontakt waren.",
    "es": "Ambos teléfonos recuerdan lo que dijeron y escucharon el uno del otro en los últimos 14 días.<br><br>Sin servidores involucrados, sólo los teléfonos saben que han estado en contacto."
})
glot.assign("step3-bold", {
    "en": "Alice is positively diagnosed for COVID-19 and enters the test result in an app from a public health authority.",
    "fr": "Alice reçoit un diagnostic positif de COVID-19 et saisit le résultat du test dans une application d'une autorité de santé publique.",
    "de": "Alice wird positiv auf COVID-19 diagnostiziert und gibt das Testergebnis in einer App von einer Gesundheitsbehörde ein.",
    "es": "Alice es diagnosticada positivamente para COVID-19 e ingresa el resultado de la prueba en una aplicación de una autoridad de salud pública."
})
glot.assign("step3-text", {
    "en": "With Alice’s consent, her phone uploads the last 14 days of keys for her Broadcast-IDs to the public health authority's server.",
    "fr": "Avec l'accord d'Alice, son téléphone télécharge les clés des 14 derniers jours de ses Broadcast-IDs sur le serveur de l'autorité de santé publique.",
    "de": "Mit der Zustimmung von Alice lädt ihr Smartphone die Schlüssel der letzten 14 Tage für ihre Broadcast-IDs auf den Server der Gesundheitsbehörde hoch.",
    "es": "Con el consentimiento de Alice, su teléfono sube los últimos 14 días de claves para su Broadcast-ID al servidor de la autoridad de salud pública."
})
glot.assign("step4-bold", {
    "en": "Bob’s phone periodically downloads the Broadcast-IDs keys of everyone who has tested positive for COVID-19.",
    "fr": "Le téléphone de Bob télécharge périodiquement les clés des Broadcast-IDs de tous ceux qui ont été testés positifs pour COVID-19.",
    "de": "Bobs Smartphone lädt regelmäßig die Broadcast-IDs-Schlüssel aller Personen herunter, die positiv auf COVID-19 getestet wurden.",
    "es": "El teléfono de Bob descarga periódicamente las claves de Broadcast-IDs de todos los que han dado positivo en COVID-19."
})
glot.assign("step4-text", {
    "en": "A match is found with Alice’s anonymous Broadcast-IDs.<br><br>Bob’s phone warns him and gives information about what to do next.",
    "fr": "Une correspondance est trouvée avec les Broadcast-IDs anonymes d'Alice.<br><br>Le téléphone de Bob reçoit une notification contenant des informations sur la marche à suivre.",
    "de": "Es wird eine Übereinstimmung mit Alices anonymen Broadcast-IDs gefunden.<br><br>Bobs Smartphone erhält eine Benachrichtigung mit Informationen darüber, was als nächstes zu tun ist.",
    "es": "Se ha encontrado una coincidencia con las Broadcast-IDs anónima de Alice.<br><br>El teléfono de Bob recibe una notificación con información sobre qué hacer a continuación."
})
glot.assign("step", {
    "en": "Step",
    "fr": "Étape",
    "de": "Schritt",
    "es": "Paso"
})
glot.assign("try", {
    "en": "Try it yourself!",
    "fr": "Essayez-le vous-même!",
    "de": "Versuch es selber!",
    "es": "¡Inténtalo tú mismo!"
})
glot.assign("try-desc", {
    "en": "We have made a small animation, so that you can visualize each step of the protocol.",
    "fr": "Nous avons réalisé une petite animation, afin que vous puissiez visualiser chaque étape du protocole.",
    "de": "Mit der kleinen Animation können Sie jeden Schritt des Protokolls visualisieren.",
    "es": "Hemos realizado una pequeña animación para que pueda visualizar cada paso del protocolo."
})

function currentPerson() {
    if (typeof con == "undefined") {
        return {
            name: "Bob"
        }
    }
    return [con.sim.alice, con.sim.bob, con.sim.charlie, con.sim.david][con.sim.panelState]
}

glot.assign("contagious", {
    "en": "${currentPerson().name} is contagious",
    "fr": "${currentPerson().name} est contagieux",
    "de": "${currentPerson().name} ist ansteckend",
    "es": "${currentPerson().name} es contagioso"
})
glot.assign("alerted", {
    "en": "${currentPerson().name} knows that ${currentPerson().name == 'Alice' ? \"she\" : \"he\"} is contagious",
    "fr": "${currentPerson().name} sais qu'${currentPerson().name == 'Alice' ? \"elle\" : \"il\"} est contagieux",
    "de": "${currentPerson().name} weiß, dass ${currentPerson().name == 'Alice' ? \"sie\" : \"er\"} ansteckend ist",
    "es": "${currentPerson().name} sabe que es contagioso"
})

glot.assign("notified", {
    "en": "${currentPerson().name} was notified by the app",
    "fr": "${currentPerson().name} a été informé${currentPerson().name == 'Alice' ? \"e\" : \"\"} par l'application",
    "de": "${currentPerson().name} wurde von der App benachrichtigt",
    "es": "${currentPerson().name} fue notificada por la aplicación"
})
glot.assign("initial-key", {
    "en": "${currentPerson().name}'s secret initial key",
    "fr": "Clé initiale secrète de ${currentPerson().name}",
    "de": "${currentPerson().name} geheimer Anfangsschlüssel",
    "es": "La clave secreta inicial de ${currentPerson().name}"
})
glot.assign("secret-day", {
    "en": "${currentPerson().name}'s secret day key",
    "fr": "Clé du jour secret de ${currentPerson().name}",
    "de": "${currentPerson().name} geheimer Tagesschlüssel",
    "es": "La clave del día secreto de ${currentPerson().name}"
})
glot.assign("past", {
    "en": "${currentPerson().name}'s past Broadcast-IDs (of the day)",
    "fr": "Broadcast-IDs antérieurs (du jour)",
    "de": "Vergangene Broadcast-IDs (des Tages)",
    "es": "Broadcast-IDs pasados (del día)"
})
glot.assign("heard", {
    "en": "Broadcast-IDs received by ${currentPerson().name}",
    "fr": "Broadcast-IDs reçus par ${currentPerson().name}",
    "de": "Broadcast-IDs von ${currentPerson().name} empfangen",
    "es": "Broadcast-IDs recibido por ${currentPerson().name}"
})
glot.assign("show", {
    "en": "Show",
    "fr": "Afficher",
    "de": "Anzeigen",
    "es": "Mostrar"
})
glot.assign("showserverdata", {
    "en": "Show server's data",
    "fr": "Afficher les données du serveur",
    "de": "Server-Daten anzeigen",
    "es": "Mostrar los datos del servidor"
})
glot.assign("serverdata", {
    "en": "Server's data",
    "fr": "Données du serveur",
    "de": "Server-Daten",
    "es": "Datos del servidor"
})
glot.assign("previousday", {
    "en": "Previous day",
    "fr": "Jour précédent",
    "de": "Vorheriger Tag",
    "es": "El día anterior"
})
glot.assign("nextday", {
    "en": "Next day",
    "fr": "Jour suivant",
    "de": "Nächster Tag",
    "es": "Próximo día"
})
glot.assign("plus5min", {
    "en": "+5 minutes",
    "fr": "+5 minutes",
    "de": "+5 Minuten",
    "es": "+5 minutos"
})
glot.assign("minus5min", {
    "en": "-5 minutes",
    "fr": "-5 minutes",
    "de": "-5 Minuten",
    "es": "-5 minutos"
})
glot.assign("walkthrough", {
    "en": "Start walkthrough",
    "fr": "Commencer le tour",
    "de": "Anleitung starten",
    "es": "Inicie el recorrido"
})
glot.assign("protocol", {
    "en": "Protocol used",
    "fr": "Protocole utilisé",
    "de": "Verwendetes Protokoll",
    "es": "Protocolo utilizado"
})
glot.assign("simulation", {
    "en": "Animation",
    "fr": "Animation",
    "de": "Animation",
    "es": "Animación"
})
glot.assign("persons", {
    "en": "Persons",
    "fr": "Personnes",
    "de": "Personen",
    "es": "Personas"
})
glot.assign("settings", {
    "en": "Settings",
    "fr": "Réglages",
    "de": "Einstellungen",
    "es": "Ajustes"
})

glot.render()

// Models & Dynamic UI elements

glot.assign("true", {
    "en": "Yes",
    "fr": "Oui",
    "de": "Ja",
    "es": "Sí"
})
glot.assign("false", {
    "en": "No",
    "fr": "Non",
    "de": "Nein",
    "es": "No"
})

glot.assign("house", {
    "en": "${data.name}'s House",
    "fr": "Maison d${data.name == 'Alice' ? \"'\" : \"e \"}${data.name}",
    "de": "Haus von ${data.name}",
    "es": "Casa de ${data.name}"
})

glot.assign("park", {
    "en": "Park",
    "fr": "Parc",
    "de": "Park",
    "es": "Parque"
})

glot.assign("park", {
    "en": "Park",
    "fr": "Parc",
    "de": "Park",
    "es": "Parque"
})
glot.assign("gohouse", {
    "en": "Go to house",
    "fr": "Aller à la maison",
    "de": "Ins Haus gehen",
    "es": "Ve a la casa"
})
glot.assign("gopark", {
    "en": "Go to park",
    "fr": "Aller au parc",
    "de": "In den Park gehen",
    "es": "Ve al parque"
})
glot.assign("testcovid", {
    "en": "Test for COVID-19",
    "fr": "Tester pour le COVID-19",
    "de": "Test für COVID-19",
    "es": "Prueba para COVID-19"
})
glot.assign("publishcovid", {
    "en": "Publish day keys",
    "fr": "Publier les clés du jour",
    "de": "Tagesschlüssel veröffentlichen",
    "es": "Publicar las claves del día"
})

glot.assign("namepast", {
    "en": "${data.name}'s past Broadcast-IDs",
    "fr": "Anciens Broadcast-ID d${data.name == 'Alice' ? \"'\" : \"e \"}${data.name}",
    "de": "${data.name}s frühere Broadcast-IDs",
    "es": "El pasado de ${data.name} Broadcast-IDs"
})

glot.assign("nameheard", {
    "en": "${data.name}'s heard Broadcast-IDs",
    "fr": "Broadcast-ID entendus par ${data.name}",
    "de": "${data.name} hat Broadcast-IDs gehört",
    "es": "${data.name} ha oído hablar del Broadcast-ID"
})

glot.assign("meeting", {
    "en": "${data.p1.name} and ${data.p2.name} met each other at the park. How much time (in minutes) did they spent together?",
    "fr": "${data.p1.name} et ${data.p2.name} se sont rencontrés au parc. Combien de temps (en minutes) ont-ils passé ensemble ?",
    "de": "${data.p1.name} und ${data.p2.name} trafen sich im Park. Wie viel Zeit (in Minuten) haben sie zusammen verbracht?",
    "es": "${data.p1.name} y ${data.p2.name} se conocieron en el parque. ¿Cuánto tiempo (en minutos) pasaron juntos?"
})
glot.assign("notify", {
    "en": "${data.name} has been notified that ${data.name == 'Alice' ? \"she\" : \"he\"} has been in contact with someone positively tested.",
    "fr": "${data.name} a été notifié qu'${data.name == 'Alice' ? \"elle\" : \"il\"} a été en contact avec une personne testée positive.",
    "de": "${data.name} wurde benachrichtigt, dass ${data.name == 'Alice' ? \"sie\" : \"er\"} mit einer positiv getesteten Person in Kontakt war.",
    "es": "${data.name} ha sido notificado de que ha estado en contacto con alguien que ha sido probado positivamente."
})

glot.assign("gotest", {
    "en": "${data.name} went to a hospital to get tested for coronavirus. ${data.result}",
    "fr": "${data.name} est allé${data.name == 'Alice' ? \"e\" : \"\"} se faire tester dans un hôpital pour le coronavirus. ${data.result}",
    "de": "${data.name} ließ sich in einem Krankenhaus auf das Corona-Virus testen. ${data.result}",
    "es": "${data.name} fue al hospital a hacerse la prueba del coronavirus. ${data.result}"
})

glot.assign("gotestfalse", {
    "en": "That's great news! ${data.name == 'Alice' ? \"She\" : \"He\"}'s fine.",
    "fr": "Bonnes nouvelles! ${data.name == 'Alice' ? \"Elle\" : \"Il\"} n'a rien.",
    "de": "Das sind großartige Neuigkeiten! Es geht ihm gut.",
    "es": "¡Es una gran noticia! Está bien."
})

glot.assign("gotesttrue", {
    "en": "That's bad news! ${data.name == 'Alice' ? \"She\" : \"He\"}'s infected.",
    "fr": "Mauvaises nouvelles! ${data.name == 'Alice' ? \"Elle\" : \"Il\"} est contaminé.",
    "de": "Schlechte Nachrichten! ${data.name == 'Alice' ? \"Sie\" : \"Er\"} ist infiziert.",
    "es": "¡Eso son malas noticias! Está infectado."
})
