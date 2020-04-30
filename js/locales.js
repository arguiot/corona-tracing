const glot = new Glottologist()

glot.assign("title", {
    "en": "Privacy-friendly contact tracking",
    "fr": "Traçage de contact préservant la vie privée",
    "de": "Datenschutzfreundliche Kontaktverfolgung",
    "es": "Seguimiento de contactos amigable con la privacidad"
})
glot.assign("description", {
    "en": "Across the world, governments, and health authorities are working together to find solutions to the COVID‑19 pandemic, to protect people and get society back up and running. Software developers are contributing by crafting technical tools to help combat the virus and save lives.<br>In recent weeks, some concerns about certain tracking technologies have been raised by those who fear the curtailment of individual freedoms and their privacy.<br>At CrypTool, we try to explain as well as possible what is hidden in these decentralized tracing protocols so that you can form your own opinion on the subject.",
    "fr": "Partout dans le monde, les gouvernements et les autorités sanitaires travaillent ensemble pour trouver des solutions à la pandémie de COVID-19, pour protéger les personnes et remettre la société sur pied. Les développeurs de logiciels apportent leur contribution en concevant des outils techniques pour aider à combattre le virus et à sauver des vies.<br>Au cours des dernières semaines, certaines inquiétudes concernant certaines technologies de suivi ont été soulevées par ceux qui craignent une restriction des libertés individuelles et de leur vie privée.<br>Chez CrypTool, nous essayons d'expliquer au mieux ce qui se cache dans ces protocoles de traçage décentralisés afin que vous puissiez vous faire votre propre opinion sur le sujet.",
    "de": "Überall auf der Welt arbeiten Regierungen und Gesundheitsbehörden zusammen, um Lösungen für die COVID-19-Pandemie zu finden, die Menschen zu schützen und die Gesellschaft wieder in Gang zu bringen. Software-Entwickler tragen dazu bei, indem sie technische Tools entwickeln, die helfen, das Virus zu bekämpfen und Leben zu retten.<br>In den letzten Wochen wurden einige Bedenken über bestimmte Tracking-Technologien von denen geäußert, die eine Beschneidung der individuellen Freiheiten und ihrer Privatsphäre befürchten.<br>Bei CrypTool versuchen wir, so gut wie möglich zu erklären, was in diesen dezentralen Tracing-Protokollen verborgen ist, damit Sie sich Ihre eigene Meinung zu diesem Thema bilden können.",
    "es": "En todo el mundo, los gobiernos y las autoridades sanitarias están trabajando juntos para encontrar soluciones a la pandemia de COVID-19, para proteger a las personas y hacer que la sociedad vuelva a funcionar. Los desarrolladores de software están contribuyendo con la creación de herramientas técnicas para ayudar a combatir el virus y salvar vidas.<br>En las últimas semanas, algunas preocupaciones sobre ciertas tecnologías de rastreo han sido planteadas por aquellos que temen el recorte de las libertades individuales y su privacidad.<br>En CrypTool, tratamos de explicar lo mejor posible lo que se esconde en estos protocolos de rastreo descentralizados para que usted pueda formarse su propia opinión sobre el tema."
})
glot.assign("step1-bold", {
    "en": "Alice’s phone broadcasts a random message every few minutes",
    "fr": "Le téléphone d'Alice diffuse un message aléatoire toutes les quelques minutes",
    "de": "Das Telefon von Alice sendet alle paar Minuten eine zufällige Nachricht",
    "es": "El teléfono de Alice emite un mensaje al azar cada pocos minutos"
})
glot.assign("step1-text", {
    "en": "In order to maintain user privacy, the message is sent over Bluetooth and does not use location for proximity detection.<br><br>This message is called a Proximity Identifier or <code>EphID</code>. Theses identifiers are unique and change often.",
    "fr": "Afin de préserver la vie privée des utilisateurs, le message est envoyé par Bluetooth et n'utilise pas la localisation pour la détection de proximité.<br><br>Ce message s'appelle un identifiant de proximité ou <code>EphID</code>. Ces identificateurs sont uniques et changent souvent.",
    "de": "Um die Privatsphäre der Benutzer zu wahren, wird die Nachricht über Bluetooth gesendet und verwendet keine Ortsangabe für die Näherungserkennung.<br><br>Diese Nachricht wird Proximity Identifier oder <code>EphID</code> genannt. Diese Identifikatoren sind eindeutig und ändern sich häufig.",
    "es": "Para mantener la privacidad del usuario, el mensaje se envía por Bluetooth y no utiliza la localización para la detección de proximidad.<br><br>Este mensaje se llama Identificador de Proximidad o <código>EfID</código>. Estos identificadores son únicos y cambian a menudo."
})
glot.assign("step2-bold", {
    "en": "Alice and Bob meet each other for the first time and have a 10-minute conversation.",
    "fr": "Alice et Bob se rencontrent pour la première fois et ont une conversation de 10 minutes.",
    "de": "Alice und Bob treffen sich zum ersten Mal und führen ein 10-minütiges Gespräch.",
    "es": "Alice y Bob se conocen por primera vez y tienen una conversación de 10 minutos."
})
glot.assign("step2-text", {
    "en": "While they discuss, their phone keep sending random messages.<br><br>Alice doesn’t have any symptoms and Bob doesn’t know that she is contagious.",
    "fr": "Pendant qu'ils discutent, leur téléphone continue d'envoyer des messages aléatoires.<br><br>Alice n'a aucun symptôme et Bob ne sait pas qu'elle est contagieuse.",
    "de": "Während sie diskutieren, sendet ihr Telefon immer wieder zufällige Nachrichten.<br><br>Alice hat keine Symptome und Bob weiß nicht, dass sie ansteckend ist.",
    "es": "Mientras discuten, su teléfono sigue enviando mensajes al azar. Alice no tiene ningún síntoma y Bob no sabe que es contagiosa."
})
glot.assign("step2.5-bold", {
    "en": "Their phones exchange anonymous identifier beacons (which change frequently).",
    "fr": "Leurs téléphones échangent des balises d'identification anonymes (qui changent fréquemment).",
    "de": "Ihre Telefone tauschen anonyme Identifizierungszeichen aus (die häufig wechseln).",
    "es": "Sus teléfonos intercambian balizas de identificación anónimas (que cambian con frecuencia)."
})
glot.assign("step2.5-text", {
    "en": "Both phones remember what they said and heard from each other in the past 14 days.<br><br>With no servers involved, only the phones know that they have been in contact.",
    "fr": "Les deux téléphones se souviennent de ce qu'ils ont dit et entendu l'un de l'autre au cours des 14 derniers jours.<br><br>En l'absence de serveurs, seuls les téléphones savent qu'ils ont été en contact.",
    "de": "Beide Telefone erinnern sich daran, was sie in den letzten 14 Tagen gesagt und voneinander gehört haben.<br><br>Da keine Server beteiligt sind, wissen nur die Telefone, dass sie in Kontakt waren.",
    "es": "Ambos teléfonos recuerdan lo que dijeron y escucharon el uno del otro en los últimos 14 días.<br><br>Sin servidores involucrados, sólo los teléfonos saben que han estado en contacto."
})
glot.assign("step3-bold", {
    "en": "Alice is positively diagnosed for COVID-19 and enters the test result in an app from a public health authority.",
    "fr": "Alice reçoit un diagnostic positif de COVID-19 et saisit le résultat du test dans une application d'une autorité de santé publique.",
    "de": "Alice wird positiv auf COVID-19 diagnostiziert und gibt das Testergebnis in einer App von einer Gesundheitsbehörde ein.",
    "es": "Alice es diagnosticada positivamente para COVID-19 e ingresa el resultado de la prueba en una aplicación de una autoridad de salud pública."
})
glot.assign("step3-text", {
    "en": "With Alice’s consent, his phone uploads the last 14 days of keys for his broadcast beacons to the cloud.",
    "fr": "Avec l'accord d'Alice, son téléphone télécharge les 14 derniers jours de clés pour ses balises de diffusion dans le cloud.",
    "de": "Mit Alices Einverständnis lädt ihr Telefon die Schlüssel der letzten 14 Tage für ihre Wolken-Sendebaken herunter.",
    "es": "Con el consentimiento de Alice, su teléfono descarga los últimos 14 días de claves para sus balizas de emisión en la nube."
})
glot.assign("step4-bold", {
    "en": "Bob’s phone periodically downloads the broadcast beacon keys of everyone who has tested positive for COVID-19 in her region.",
    "fr": "Le téléphone de Bob télécharge périodiquement les clés des balises de diffusion de tous ceux qui ont été testés positifs pour COVID-19 dans sa région.",
    "de": "Bobs Telefon lädt regelmäßig die Sendebakentasten aller Personen herunter, die in ihrer Region positiv auf COVID-19 getestet wurden.",
    "es": "El teléfono de Bob descarga periódicamente las claves de emisión de todos los que han dado positivo en COVID-19 en su región."
})
glot.assign("step4-text", {
    "en": "A match is found with Alice’s anonymous identifier beacons.<br><br>Bob’s phone receives a notification with information about what to do next.",
    "fr": "Une correspondance est trouvée avec les balises d'identification anonymes d'Alice.<br><br>Le téléphone de Bob reçoit une notification contenant des informations sur la marche à suivre.",
    "de": "Es wird eine Übereinstimmung mit Alices anonymen Identifizierungsbaken gefunden.<br><br>Bobs Telefon erhält eine Benachrichtigung mit Informationen darüber, was als nächstes zu tun ist.",
    "es": "Se ha encontrado una coincidencia con las balizas de identificación anónima de Alice.<br><br>El teléfono de Bob recibe una notificación con información sobre qué hacer a continuación."
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
    "de": "Wir haben eine kleine Animation erstellt, damit Sie jeden Schritt des Protokolls visualisieren können.",
    "es": "Hemos realizado una pequeña animación para que pueda visualizar cada paso del protocolo."
})
glot.assign("contagious", {
    "en": "Contagious",
    "fr": "Contagieux",
    "de": "Ansteckend",
    "es": "Contagioso"
})
glot.assign("alerted", {
    "en": "Alerted about infectivity",
    "fr": "Alerte sur l'infectiosité",
    "de": "Alarmiert über Infektiosität",
    "es": "Alertado sobre infectividad"
})
glot.assign("initial-key", {
    "en": "Secret Initial Key",
    "fr": "Clé initiale secrète",
    "de": "Geheimer Anfangsschlüssel",
    "es": "Clave inicial secreta"
})
glot.assign("secret-day", {
    "en": "Secret Day Key",
    "fr": "Clé du jour secret",
    "de": "Geheimer Tagesschlüssel",
    "es": "Clave del día secreto"
})
glot.assign("past", {
    "en": "Past EphIDs (of the day)",
    "fr": "EphID antérieurs (du jour)",
    "de": "Vergangene EphIDs (des Tages)",
    "es": "EphID pasados (del día)"
})
glot.assign("heard", {
    "en": "EphIDs heard",
    "fr": "EphID entendus",
    "de": "EphIDs gehört",
    "es": "EphIDs escuchó"
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
glot.render()

// Models & Dynamic UI elements

glot.assign("true", {
    "en": "true",
    "fr": "vrai",
    "de": "richtig",
    "es": "verdadero"
})
glot.assign("false", {
    "en": "false",
    "fr": "faux",
    "de": "falsch",
    "es": "falso"
})

glot.assign("house", {
    "en": "${data.name}'s House",
    "fr": "Maison d${data.name == 'Alice' ? \"'\" : \"e \"}${data.name}",
    "de": "Das Haus von ${data.name}",
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
    "de": "Zum Haus gehen",
    "es": "Ve a la casa"
})
glot.assign("gopark", {
    "en": "Go to park",
    "fr": "Aller au parc",
    "de": "Zum Parken gehen",
    "es": "Ve al parque"
})
glot.assign("testcovid", {
    "en": "Test for COVID-19",
    "fr": "Tester pour le COVID-19",
    "de": "Test für COVID-19",
    "es": "Prueba para COVID-19"
})
glot.assign("publishcovid", {
    "en": "Publish past EphIDs",
    "fr": "Publier les anciens EphID",
    "de": "Frühere EphIDs veröffentlichen",
    "es": "Publicar las EphID anteriores"
})

glot.assign("namepast", {
    "en": "${data.name}'s past EphIDs",
    "fr": "Anciens EphID d${data.name == 'Alice' ? \"'\" : \"e \"}${data.name}",
    "de": "${data.name}s frühere EphIDs",
    "es": "El pasado de ${data.name} EphIDs"
})

glot.assign("nameheard", {
    "en": "${data.name}'s heard EphIDs",
    "fr": "EphID entendus par ${data.name}",
    "de": "${data.name} hat EphIDs gehört",
    "es": "${data.name} ha oído hablar del EphID"
})

glot.assign("meeting", {
    "en": "${data.p1.name} and ${data.p2.name} met each other at the park. How much time (in minutes) did they spent together?",
    "fr": "${data.p1.name} et ${data.p2.name} se sont rencontrés au parc. Combien de temps (en minutes) ont-ils passé ensemble ?",
    "de": "${data.p1.name} und ${data.p2.name} trafen sich im Park. Wie viel Zeit (in Minuten) haben sie zusammen verbracht?",
    "es": "${data.p1.name} y ${data.p2.name} se conocieron en el parque. ¿Cuánto tiempo (en minutos) pasaron juntos?"
})