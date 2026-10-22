# Revisión en español de las páginas no médicas

Tres pasadas sobre todo lo nuevo, más una verificación de las cinco páginas que ya existían. Registro: usted, español de Texas y de México, los mismos hechos que el inglés, sin promesas de resultado.

## Clasificación

### No médicas, traducidas ahora

- `/about-us` → `/es/about-us`
- `/allison-turner` → `/es/allison-turner`
- `/tatyana-baumgartner-cpa` → `/es/tatyana-baumgartner-cpa`
- `/appointment-confirmed` → `/es/appointment-confirmed` (noindex; no entra al sitemap)
- `/patients` → `/es/patients`
- `/contact` → `/es/contact`
- `/locations` y las diez ciudades: northwest-houston, humble, spring-tx, the-woodlands, cypress, tomball, klein, champions, kingwood, atascocita
- `/community`, `/community/imas-home`, `/community/kel-strong-foundation`, `/community/houston-tennis-academy`
- `/terms-of-use` → `/es/terms-of-use`
- `/hipaa-notice` → `/es/hipaa-notice`

### Ya estaban en español

`/es`, `/es/dr-edward-baumgartner`, `/es/request-appointment`, `/es/insurance`, `/es/intracept-procedure`.

### Médicas, se quedan en inglés

Condiciones, procedimientos y servicios (salvo BVN), hubs `/services` y `/pain-center`, `/peptides`, lesiones (`/injuries-pain`, `/work-injuries-accidents`, `/motor-vehicle-injuries`), blog y cada artículo.

### Límite, se quedan en inglés

- `/video-library`: videos de procedimientos y educación clínica.
- `/second-opinion`: la página describe la consulta, el examen y el proceso diagnóstico.

### Fuera de alcance

- Todas las páginas `/lp`.
- `/privacy`: sigue en el borrador del PR #14. Solo se lista. En el menú en español lleva la marca «en inglés».
- No hay página de empleos. Las opiniones no tienen página propia; viven en la portada y en `/contact`.

## Pasada de significado

Los hechos se mantuvieron: nombres anteriores del consultorio, 2018, 2025 y 2026, doble certificación, hospitales, doce años y cinco como patrocinador del 5K de Ima's Home, $140,000 y $350,000 como cifras de esas organizaciones, la beca con TIRR Memorial Hermann, la biografía de Kel Mabatah, y que Houston Tennis Academy es colaboración, no donación ni patrocinio.

Se suavizó el inglés que prometía un resultado:

- «pain-free life», «full recovery» y «lasting relief» como promesa al paciente pasaron a un plan personalizado y a la frase ya usada en el sitio: los resultados varían.
- La tarjeta de lesiones deportivas en las oficinas no repite «vuelva a su deporte». Dice que hay estudios y terapias, con respeto al tiempo de recuperación.
- En Ima's Home se quitó «lives changed». Quedó «una relación de años, en dos continentes».

## Pasada de naturalidad

- «El tejido conectivo» sonaba anatómico. Allison quedó como quien mantiene unido el cuidado.
- «Líneas directas» quedó en «Teléfono y correo».
- «Empiezan a atender osteoartritis» sonaba a que el paciente es el médico. Quedó «empiezan a ocuparse de».
- «Opciones de dolor» quedó en «consultorios de dolor».
- «10 o 15 minutos» era un rango, no una alternativa. Quedó «entre 10 y 15 minutos».
- «El área en la que más podemos ofrecer» no cerraba. Quedó «el área donde más opciones tenemos».
- En el aviso HIPAA, «mercadeo» pasó a «comunicaciones publicitarias», «una queja con nosotros» a «una queja ante el consultorio», y se corrigió «incluidos la mejora».

El Dr. Baumgartner atiende en inglés en las páginas nuevas. No se dice que Allison ni Tatyana den la consulta en español. Tatyana sigue en inglés y ruso, como en la ficha en inglés. La frase del personal es la de siempre: el personal habla español y puede ayudar a programar la cita.

## Pasada de mecánica

- Sin rayas em o en. Los rangos van con «a» o «entre … y …».
- Títulos renderizados de 60 caracteres o menos y descripciones de 160 o menos. El build lo confirma en 105 rutas.
- Acentos y signos de interrogación de apertura revisados en los títulos y las preguntas.
- Enlaces de cita conservan `data-analytics-location`. El interruptor de idioma sigue fuera de `appointment_request_click`.
- Las páginas de condición y procedimiento, salvo BVN, siguen en inglés y lo dicen («en inglés» o «Estas páginas están en inglés»).
- El pie, en español, manda las dos oficinas a `/es/locations/...`. En inglés siguen en `/locations/...`.

## Verificación

28 URLs en `/es`: respuesta 200, `lang="es"`, canonical en español, hreflang `en`, `es` y `x-default` (el inglés), y el inglés de cada par apunta de vuelta. Ciática, privacidad, videoteca, segunda opinión, servicios, blog y `/lp/back-pain` no publican hreflang en español. `/es/appointment-confirmed` no está en el sitemap.

## Lo que no quedó cerrado

- El aviso HIPAA en español es una traducción del aviso en inglés, no un dictamen nuevo.
- La videoteca y la segunda opinión se dejaron en inglés por ser clínicas.
- Las oficinas describen condiciones, como en inglés, pero los enlaces de esas condiciones siguen en inglés.
- Birdeye, Nimblr y el chat siguen en la interfaz del proveedor.
- El asunto del correo de formularios pasó a «Solicitud de formularios para pacientes».
- El enlace para administrar la cita abre el calendario en inglés, y la página lo dice.
