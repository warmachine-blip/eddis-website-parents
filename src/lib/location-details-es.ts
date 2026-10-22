import { locationDetails, type LocationDetail } from "./location-details.ts";
import { spanishLabel } from "./spanish-nav.ts";

/**
 * Spanish city pages. Facts match the English location record. Ranges are
 * written out so the Spanish copy has no en dash. Condition and procedure
 * cards use the same names as the rest of /es, and those links stay in English
 * except basivertebral nerve ablation (BVN).
 */

const CONDITION_BLURB: Record<string, string> = {
  "back-pain": "El motivo más frecuente por el que llegan los pacientes, y el área donde más opciones tenemos.",
  "neck-pain": "Cuidado de precisión para la columna cervical, sin apresurarse a una cirugía.",
  sciatica: "Dolor que baja por la pierna por compresión o irritación del nervio ciático.",
  "knee-pain":
    "Artritis, dolor de tendones y rodillas que siguen doliendo después de una cirugía, del cartílago a los nervios que llegan a la articulación.",
  "spinal-stenosis": "Estrechamiento del canal espinal que comprime los nervios y limita la capacidad de caminar.",
  "post-surgical-pain":
    "Cuando la cirugía resolvió el problema, pero el dolor siguió: opciones intervencionistas que pueden ayudar.",
  "shoulder-injuries":
    "Problemas del manguito rotador, del labrum (cartílago del hombro) y de los tendones: diagnóstico preciso y tratamiento cuidadoso.",
  "neuropathic-pain": "Dolor quemante, eléctrico o con hormigueo, causado por una lesión o una irritación de los propios nervios.",
  "joint-pain": "Del hombro a la cadera: cuidado con guía de imagen para las articulaciones con las que usted se mueve.",
  "sports-injuries": "Estudios y terapias regenerativas para lesiones deportivas, con respeto al tiempo de recuperación.",
};

const SERVICE_BLURB: Record<string, string> = {
  "radiofrequency-ablation":
    "Procedimiento ambulatorio que usa una corriente eléctrica precisa para calmar nervios dañados o inflamados.",
  "intracept-procedure": "Actúa sobre el nervio basivertebral para tratar el dolor lumbar crónico en su origen anatómico.",
  "injections-blocks-specialist":
    "Inyecciones con guía de imagen que calman articulaciones, nervios y estructuras de la columna inflamados.",
  "mild-procedure":
    "Descompresión lumbar mínimamente invasiva para aliviar el dolor al caminar (claudicación neurógena) por estenosis espinal.",
  "spinal-cord-stimulation-specialist":
    "Sistema implantable que envía campos eléctricos suaves para bloquear las señales de dolor antes de que lleguen al cerebro.",
  "prp-procedure": "Terapia regenerativa no quirúrgica que usa sus propias plaquetas para acelerar la cicatrización.",
  "kyphoplasty-specialist":
    "Procedimiento mínimamente invasivo que estabiliza fracturas vertebrales por compresión que causan dolor.",
};

type CityCopy = Pick<
  LocationDetail,
  | "metaDescription"
  | "heroHeadline"
  | "heroIntro"
  | "commuteLine"
  | "commuteShort"
  | "aboutParagraphs"
  | "patientsListIntro"
  | "patientsList"
  | "directionsIntro"
  | "whyThisCityBlurb"
  | "landmarks"
  | "finalCtaHeadline"
>;

const CTA = "Cuidado del dolor que se ajusta a su vida y a su traslado.";

function meta(city: string): string {
  return `Atención del dolor para pacientes de ${city}. El Dr. Baumgartner atiende en inglés. Oficinas en Houston y Humble.`;
}

const CITY: Record<string, CityCopy> = {
  "spring-tx": {
    metaDescription: meta("Spring, TX"),
    heroHeadline: "Cuidado preciso del dolor para pacientes de Spring, TX.",
    heroIntro:
      "Pacientes de Spring eligen HTx Pain Institute para atención intervencionista del dolor cerca de casa. La oficina de Humble, en FM 1960, queda a un trayecto corto desde la mayor parte de Spring. La mayoría llega en 10 a 15 minutos.",
    commuteLine: "De 10 a 15 minutos desde la mayor parte de Spring hasta la oficina de Humble.",
    commuteShort: "10 a 15 min desde FM 1960",
    aboutParagraphs: [
      "Spring es una de las comunidades que más crece en el área de Houston, sobre el corredor de la I-45, entre Houston y The Woodlands. Hay vecindarios ya establecidos, como Bender's Landing y Augusta Pines, y comunidades nuevas a lo largo de Spring-Cypress y Cypresswood. Muchos pacientes de Spring trabajan por Hardy Toll Road o en el corredor corporativo de The Woodlands, y necesitan una atención del dolor que no les consuma la jornada.",
      "El perfil de pacientes refleja la zona: familias activas con lesiones por uso excesivo en el deporte de los hijos, profesionales con dolor cervical y lumbar por el trabajo de escritorio, y más personas jubiladas que empiezan a ocuparse de la osteoartritis, la estenosis espinal y la enfermedad degenerativa del disco.",
    ],
    patientsListIntro: "Pacientes que vemos con frecuencia en Spring",
    patientsList: [
      "Personas de oficina del corredor Hardy/I-45 con dolor crónico de cuello y de la zona lumbar",
      "Padres activos con lesiones de rodilla y hombro por el deporte y la actividad del fin de semana",
      "Personas jubiladas con osteoartritis, estenosis espinal y fracturas por compresión",
      "Pacientes con lesiones por accidente de auto en las autopistas de la zona",
      "Pacientes que buscan una segunda opinión antes de considerar una cirugía de columna",
    ],
    directionsIntro:
      "Desde la mayor parte de Spring, tome Cypresswood Drive o Spring-Cypress Road hacia el este, hasta FM 1960. La oficina de Humble está en 1485 FM 1960 Bypass Rd. E, Suite 100, justo al este de la US-59. La mayoría llega en 10 a 15 minutos.",
    whyThisCityBlurb:
      "Los pacientes de Spring nos dicen que eligen HTx Pain Institute porque no quieren ir al Texas Medical Center para procedimientos que pueden hacerse más cerca de casa. La oficina de Humble, en FM 1960, queda a entre 10 y 15 minutos de la mayor parte de Spring. A menudo hay consultas en la misma semana, y el alcance clínico es el de un centro grande.",
    landmarks: [
      "Los vecindarios Augusta Pines, Bender's Landing y Cypresswood quedan a un trayecto corto",
      "Quienes van por la I-45 llegan por Cypresswood Drive o Spring-Cypress Road hacia el este, hasta FM 1960",
      "Unos 12 minutos desde el Spring Park and Ride y el comercio de Spring Cypress y la I-45",
      "Unos 20 minutos desde The Woodlands Mall por la I-45 Sur hasta FM 1960",
    ],
    finalCtaHeadline: CTA,
  },
  "the-woodlands": {
    metaDescription: meta("The Woodlands, TX"),
    heroHeadline: "Cuidado preciso del dolor para pacientes de The Woodlands, TX.",
    heroIntro:
      "Pacientes de The Woodlands eligen HTx Pain Institute para atención intervencionista de nivel de instituto, sin el trayecto al Texas Medical Center. La mayoría llega a la oficina de Humble en 15 a 25 minutos.",
    commuteLine: "De 15 a 25 minutos desde la mayor parte de The Woodlands hasta la oficina de Humble.",
    commuteShort: "15 a 25 min desde FM 1960",
    aboutParagraphs: [
      "The Woodlands es una de las comunidades planificadas más conocidas del país, y uno de los grupos de pacientes más exigentes del consultorio. Muchos son ejecutivos, médicos, deportistas profesionales o personas jubiladas que ya probaron varias opciones para el dolor crónico. Esperan un criterio de nivel de instituto y una respuesta honesta sobre si un procedimiento es lo adecuado.",
      "De esta zona vemos una proporción alta de pacientes con cirugía de espalda que no dio el resultado esperado, dolor de articulaciones que no ha cedido y segundas opiniones. También hay personas jubiladas activas que juegan tenis, corren y juegan golf, y quieren seguir haciéndolo. El PRP, las inyecciones con guía de imagen y los procedimientos de la articulación SI son pedidos frecuentes.",
    ],
    patientsListIntro: "Pacientes que vemos con frecuencia en The Woodlands",
    patientsList: [
      "Ejecutivos y profesionales con dolor crónico de columna por muchas horas de escritorio y de viaje",
      "Personas jubiladas activas con osteoartritis, tendinopatía y estenosis espinal",
      "Pacientes con cirugía de espalda previa que consultan por estimulación de la médula espinal",
      "Deportistas de tenis, golf y carrera con lesiones por uso excesivo y de articulaciones",
      "Pacientes que buscan una segunda opinión antes de una cirugía mayor de columna",
    ],
    directionsIntro:
      "Desde la mayor parte de The Woodlands, tome la I-45 Sur hasta la US-59/I-69 Sur y salga en FM 1960. La oficina de Humble está en 1485 FM 1960 Bypass Rd. E, Suite 100. La mayoría llega en 15 a 25 minutos.",
    whyThisCityBlurb:
      "En The Woodlands hay varias opciones para el dolor. Nuestros pacientes llegan por el criterio diagnóstico y por la variedad de procedimientos. El Dr. Baumgartner ofrece ablación del nervio basivertebral (BVN), MILD, fusión SI LinQ, fusión lumbar Minuteman, estimulación avanzada de la médula espinal y una revisión de estudios de imagen que muchos consultorios no hacen. Para quien está acostumbrado a un nivel alto de atención, eso importa.",
    landmarks: [
      "De 15 a 25 minutos desde The Woodlands Mall por la I-45 Sur hasta FM 1960",
      "Acceso desde Research Forest Drive, Lake Woodlands Drive y Grogan's Mill",
      "Memorial Hermann The Woodlands y Houston Methodist The Woodlands quedan cerca para estudios previos",
      "Conveniente para residentes de Carlton Woods, Grogan's Mill, Cochran's Crossing y Panther Creek",
    ],
    finalCtaHeadline: CTA,
  },
  cypress: {
    metaDescription: meta("Cypress, TX"),
    heroHeadline: "Cuidado preciso del dolor para pacientes de Cypress, TX.",
    heroIntro:
      "Los pacientes de Cypress quedan a un trayecto corto de la oficina de Houston, cerca de Willowbrook, donde está el conjunto completo de medicina intervencionista del dolor. La mayoría llega en 15 a 25 minutos.",
    commuteLine: "De 15 a 25 minutos desde la mayor parte de Cypress hasta la oficina de Houston.",
    commuteShort: "15 a 25 min desde Willowbrook",
    aboutParagraphs: [
      "Cypress es una comunidad suburbana amplia a lo largo de la US-290, al noroeste de Houston, con desarrollos como Bridgeland, Towne Lake y Cypress Creek Lakes. Hay muchas familias que combinan el trabajo, el deporte de los hijos y traslados largos a Houston o a The Woodlands.",
      "El grupo es variado: lesiones por accidente de auto en la 290, el Beltway 8 y el Grand Parkway; padres y abuelos con osteoartritis; personas activas el fin de semana con tendinopatía que preguntan por opciones biológicas como el PRP; y pacientes con dolor crónico de columna que buscan un plan intervencionista pensado con calma.",
    ],
    patientsListIntro: "Pacientes que vemos con frecuencia en Cypress",
    patientsList: [
      "Padres que trabajan y combinan la familia con dolor crónico de cuello o de espalda",
      "Pacientes con lesiones por accidente de auto en las autopistas de la zona",
      "Personas jubiladas activas con osteoartritis que buscan opciones no quirúrgicas",
      "Deportistas de fin de semana con tendinopatía de rodilla y de hombro",
      "Casos de compensación laboral que necesitan documentación",
    ],
    directionsIntro:
      "Desde la mayor parte de Cypress, tome la US-290 hacia el este y luego la Texas 249 hacia el norte, en dirección a Willowbrook. La oficina de Houston está en 13323 Dotson Rd, Suite 200, cerca de Willowbrook. La mayoría llega en 15 a 25 minutos.",
    whyThisCityBlurb:
      "Los pacientes de Cypress nos dicen que la oficina de Houston, cerca de Willowbrook, es la más fácil de alcanzar sin el tráfico del centro. Queda a 15 o 25 minutos de la mayor parte de Cypress, ofrece el conjunto intervencionista completo y prepara la documentación que piden los casos de compensación laboral y de accidente de auto.",
    landmarks: [
      "Acceso por la US-290 hacia el este y la Texas 249 hacia el norte",
      "Unos 15 minutos desde Bridgeland y Cypress Creek Lakes",
      "Unos 20 minutos desde Towne Lake y la zona de Cypress Premium Outlets",
      "Conveniente desde Highway 6 y Fry Road en el resto de Cypress",
    ],
    finalCtaHeadline: CTA,
  },
  tomball: {
    metaDescription: meta("Tomball, TX"),
    heroHeadline: "Cuidado preciso del dolor para pacientes de Tomball, TX.",
    heroIntro:
      "Tomball es una de las comunidades más cercanas. La oficina de Houston queda cerca de Willowbrook, por la Texas 249. La mayoría de los pacientes llega en 10 a 15 minutos.",
    commuteLine: "De 10 a 15 minutos desde la mayor parte de Tomball hasta la oficina de Houston.",
    commuteShort: "10 a 15 min desde Willowbrook",
    aboutParagraphs: [
      "Tomball queda muy cerca de la oficina de Houston y conserva un ambiente de pueblo que muchos pacientes valoran. La Texas 249 baja directo hasta la oficina, cerca de Willowbrook. Muchos pacientes de Tomball llegan en unos 10 minutos.",
      "El grupo es amplio: residentes de toda la vida con dolor crónico de columna y de articulaciones, familias de los vecindarios nuevos de Tomball ISD con lesiones por accidente de auto y por uso excesivo, y pacientes a quienes les dijeron que la única opción era una cirugía de columna y buscan una segunda opinión honesta.",
    ],
    patientsListIntro: "Pacientes que vemos con frecuencia en Tomball",
    patientsList: [
      "Residentes de Tomball de toda la vida con problemas crónicos de columna y de articulaciones",
      "Pacientes con cirugía de columna previa y dolor que volvió o que es nuevo",
      "Casos de compensación laboral y de accidente de auto",
      "Abuelos activos que atienden la osteoartritis y la estenosis",
      "Pacientes a quienes les indicaron cirugía de columna y buscan alternativas intervencionistas",
    ],
    directionsIntro:
      "Desde la mayor parte de Tomball, tome la Texas 249 hacia el sur, en dirección a Willowbrook. La oficina de Houston está en 13323 Dotson Rd, Suite 200. La mayoría llega en 10 a 15 minutos.",
    whyThisCityBlurb:
      "Para los pacientes de Tomball, la cercanía a los procedimientos intervencionistas importa. La oficina de Houston ofrece ablación del nervio basivertebral (BVN), MILD, estimulación de la médula espinal y fusión de la articulación SI. A muchos les habían dicho que esos procedimientos exigían una referencia al Texas Medical Center. Coordinamos con médicos de cabecera y cirujanos del área de Tomball.",
    landmarks: [
      "La Texas 249 Sur va directo del centro de Tomball a la oficina",
      "Unos 10 minutos desde la zona de Tomball Town Center",
      "Acceso fácil desde FM 2920, FM 2978 y Spring-Cypress Road",
      "Conveniente para pacientes de HCA Houston Healthcare Tomball que ya tienen estudios de imagen",
    ],
    finalCtaHeadline: CTA,
  },
  klein: {
    metaDescription: meta("Klein, TX"),
    heroHeadline: "Cuidado preciso del dolor para pacientes de Klein, TX.",
    heroIntro:
      "Los pacientes del área de Klein llegan a la oficina de Houston por la Texas 249, un trayecto corto y predecible. La mayoría llega en 10 a 15 minutos.",
    commuteLine: "De 10 a 15 minutos desde la mayor parte de Klein hasta la oficina de Houston.",
    commuteShort: "10 a 15 min desde Willowbrook",
    aboutParagraphs: [
      "Klein es una comunidad unida en el norte del área de Houston, alrededor de Klein ISD y de vecindarios como Memorial Northwest, Champions Forest e Inverness Forest. Quienes vienen de Klein suelen valorar la continuidad, las decisiones que toma el médico y la experiencia de un consultorio pequeño.",
      "Vemos un flujo constante desde Klein: dolor de espalda y de cuello de origen facetario, osteoartritis de rodilla, dolor después de una cirugía y planes de dolor crónico que siguen en el tiempo. Muchos pacientes de Klein llevan años con nosotros, en más de un procedimiento y en distintas etapas de la vida.",
    ],
    patientsListIntro: "Pacientes que vemos con frecuencia en Klein",
    patientsList: [
      "Pacientes de largo plazo con un plan de dolor crónico que sigue en curso",
      "Familias activas con lesiones por uso excesivo y por deporte",
      "Personas jubiladas con osteoartritis, estenosis espinal y fracturas por compresión",
      "Maestros y personal de Klein ISD con dolor cervical y lumbar por el trabajo de escritorio",
      "Pacientes después de una cirugía de columna, con dolor que volvió o que es nuevo",
    ],
    directionsIntro:
      "Desde la mayor parte de Klein, tome Stuebner Airline o Spring-Cypress Road hacia el oeste hasta la Texas 249, y luego hacia el sur, en dirección a Willowbrook. La oficina de Houston está en 13323 Dotson Rd, Suite 200. La mayoría llega en 10 a 15 minutos.",
    whyThisCityBlurb:
      "En Klein, la recomendación de boca en boca pesa mucho. El consultorio se sostiene con pacientes que refieren a amigos, vecinos y familia, y muchos de los pacientes de largo plazo son de Klein. La continuidad, la disposición a seguir el plan durante años y la cercanía a la oficina de la Texas 249 son lo que los trae.",
    landmarks: [
      "De 10 a 15 minutos desde Memorial Northwest y Champions Forest",
      "Acceso por Stuebner Airline o Spring-Cypress Road hacia el oeste, hasta la Texas 249",
      "Conveniente desde las preparatorias Klein Forest, Klein Cain y Klein Collins",
      "Conexión corta desde el Beltway 8 y el Sam Houston Tollway",
    ],
    finalCtaHeadline: CTA,
  },
  champions: {
    metaDescription: meta("Champions, TX"),
    heroHeadline: "Cuidado preciso del dolor para pacientes de Champions, TX.",
    heroIntro:
      "El área de Champions es una de las más cercanas a la oficina de Houston. La mayoría de los pacientes llega en unos 10 minutos.",
    commuteLine: "Unos 10 minutos desde la mayor parte de Champions hasta la oficina de Houston.",
    commuteShort: "10 min desde Willowbrook",
    aboutParagraphs: [
      "Champions es uno de los vecindarios más establecidos del norte de Houston, alrededor del Champions Golf Club, con muchos golfistas, tenistas y personas jubiladas activas. El grupo tiende a ser mayor y más activo que en otros suburbios. Vemos mucho manejo de osteoartritis, tendinopatía y pacientes que quieren seguir practicando su deporte.",
      "Muchos pacientes de Champions preguntan por opciones biológicas como el PRP para articulaciones y tendones, y una proporción alta de los casos de PRP de rodilla y de hombro viene de esta zona. También vemos enfermedad degenerativa de la columna y dolor después de una cirugía.",
    ],
    patientsListIntro: "Pacientes que vemos con frecuencia en Champions",
    patientsList: [
      "Personas jubiladas activas que juegan golf, tenis o pickleball",
      "Pacientes con osteoartritis de rodilla o de cadera que buscan un camino no quirúrgico",
      "Tendinopatía de hombros, codos y tendón rotuliano",
      "Pacientes con dolor después de una cirugía ortopédica previa",
      "Pacientes con dolor crónico de largo plazo que valoran la continuidad",
    ],
    directionsIntro:
      "Desde la mayor parte de Champions, tome Cypresswood Drive o FM 1960 hacia el oeste, en dirección a Willowbrook. La oficina de Houston está en 13323 Dotson Rd, Suite 200, cerca de Willowbrook. La mayoría llega en 10 minutos.",
    whyThisCityBlurb:
      "En Champions importa la cercanía a las opciones biológicas. El programa de PRP se hace con guía de imagen, se prepara en la oficina y se integra con rehabilitación estructurada.",
    landmarks: [
      "Champions Golf Club y los vecindarios del club",
      "Unos 10 minutos del comercio de FM 1960 y de Champions Forest",
      "Acceso por Cypresswood Drive y FM 1960 hasta la Texas 249",
      "Conveniente para residentes de Champions Park, Champions North e Inverness Forest",
    ],
    finalCtaHeadline: CTA,
  },
  kingwood: {
    metaDescription: meta("Kingwood, TX"),
    heroHeadline: "Cuidado preciso del dolor para pacientes de Kingwood, TX.",
    heroIntro:
      "Kingwood es una de las comunidades más cercanas a la oficina de Humble. La mayoría de los pacientes llega en 10 a 15 minutos.",
    commuteLine: "De 10 a 15 minutos desde la mayor parte de Kingwood hasta la oficina de Humble.",
    commuteShort: "10 a 15 min desde FM 1960",
    aboutParagraphs: [
      "Kingwood, conocida como \"the Livable Forest\", es una de las comunidades más particulares del área de Houston. Tiene mucho arbolado, está orientada a las familias y se organiza alrededor de senderos. Hay corredores, ciclistas, golfistas, personas que caminan el fin de semana y residentes que criaron aquí a sus hijos.",
      "El perfil sigue esa actividad: lesiones por uso excesivo, rodilla del corredor, tendinopatía rotuliana y problemas del manguito rotador por el ciclismo, además del dolor crónico de columna y de articulaciones que vemos en general. También hay pacientes de Kingwood con cirugía de columna previa que buscan seguimiento o una segunda opinión antes de otra cirugía.",
    ],
    patientsListIntro: "Pacientes que vemos con frecuencia en Kingwood",
    patientsList: [
      "Corredores, ciclistas y personas que usan los senderos, con lesiones por uso excesivo",
      "Personas jubiladas activas con osteoartritis y problemas degenerativos de la columna",
      "Pacientes con cirugía de columna previa que exploran otras opciones",
      "Golfistas con tendinopatía del manguito rotador y del codo",
      "Profesionales con dolor cervical por el traslado y el escritorio",
    ],
    directionsIntro:
      "Desde Kingwood, tome Kingwood Drive hacia el oeste hasta la US-59/I-69 Sur y salga en FM 1960. La oficina de Humble está en 1485 FM 1960 Bypass Rd. E, Suite 100. La mayoría llega en 10 a 15 minutos.",
    whyThisCityBlurb:
      "Los pacientes de Kingwood buscan un médico que tome en cuenta su nivel de actividad y su preferencia por no entrar de inmediato en una vía quirúrgica mayor. Ofrecemos opciones biológicas para la tendinopatía, MILD y ablación del nervio basivertebral (BVN) para la estenosis y el dolor vertebrogénico, y un plan por pasos.",
    landmarks: [
      "Acceso por Kingwood Drive hacia el oeste hasta la US-59/I-69 Sur",
      "Unos 12 minutos desde la zona de Kingwood Town Center",
      "Conveniente desde Forest Cove, Bear Branch, Kings Forest y Trailwood",
      "Memorial Hermann Northeast queda cerca para estudios previos y cuidado después de una cirugía",
    ],
    finalCtaHeadline: CTA,
  },
  atascocita: {
    metaDescription: meta("Atascocita, TX"),
    heroHeadline: "Cuidado preciso del dolor para pacientes de Atascocita, TX.",
    heroIntro:
      "Los pacientes de Atascocita quedan a minutos de la oficina de Humble, en FM 1960. Es una de las comunidades más cercanas. La mayoría llega en 5 a 10 minutos.",
    commuteLine: "De 5 a 10 minutos desde la mayor parte de Atascocita hasta la oficina de Humble.",
    commuteShort: "5 a 10 min desde FM 1960",
    aboutParagraphs: [
      "Atascocita es una de las comunidades que más crece al este de Humble, con expansión residencial a lo largo de West Lake Houston Parkway y FM 1960. Hay muchas familias y un perfil más joven que en algunos suburbios vecinos. Vemos un volumen alto de lesiones por accidente de auto, lesiones de trabajo y dolor crónico después de una lesión.",
      "Muchos pacientes de Atascocita trabajan en el corredor energético, en el centro de Houston o a lo largo de FM 1960, y necesitan un consultorio que quepa en un día de trabajo. Para la mayor parte de Atascocita, la oficina de Humble queda a 5 o 10 minutos, así que las visitas de seguimiento son prácticas incluso con un horario exigente.",
    ],
    patientsListIntro: "Pacientes que vemos con frecuencia en Atascocita",
    patientsList: [
      "Adultos en edad de trabajar con lesiones por accidente de auto en las autopistas de la zona",
      "Pacientes de compensación laboral en la industria y en el sector energético",
      "Familias activas con lesiones por uso excesivo y por deporte",
      "Pacientes con dolor crónico de cuello y de espalda relacionado con el trabajo",
      "Pacientes con dolor después de una cirugía que buscan seguimiento",
    ],
    directionsIntro:
      "Desde la mayor parte de Atascocita, tome Atascocita Road o West Lake Houston Parkway hacia el oeste hasta FM 1960. La oficina de Humble está en 1485 FM 1960 Bypass Rd. E, Suite 100. La mayoría llega en 5 a 10 minutos.",
    whyThisCityBlurb:
      "Para los pacientes de Atascocita, la cercanía pesa: para la mayor parte de la zona somos el consultorio de dolor con este alcance que queda más cerca. También preparamos la documentación que piden los casos de compensación laboral, de accidente de auto y de carta de protección. Eso importa para quien no puede perder un día en un trayecto largo.",
    landmarks: [
      "Acceso por Atascocita Road o West Lake Houston Parkway hacia el oeste, hasta FM 1960",
      "De 5 a 10 minutos desde Atascocita High School y Lake Houston",
      "Conexión corta a la US-59/I-69 por FM 1960",
      "Conveniente para residentes de Eagle Springs, Walden y Pinehurst Trail",
    ],
    finalCtaHeadline: CTA,
  },
  humble: {
    metaDescription: meta("Humble, TX"),
    heroHeadline: "Cuidado preciso del dolor para pacientes de Humble, TX.",
    heroIntro:
      "Humble es casa: la oficina de Humble, en FM 1960, atiende el centro de la comunidad. La mayoría de los pacientes llega en unos 5 minutos.",
    commuteLine: "Unos 5 minutos desde la mayor parte de Humble hasta la oficina de Humble.",
    commuteShort: "Unos 5 min desde FM 1960",
    aboutParagraphs: [
      "Humble es casa. La oficina de FM 1960 está desde que abrió el consultorio, y muchos de los pacientes de más años son de la zona inmediata. Humble combina vecindarios establecidos con crecimiento nuevo de comercio y vivienda a lo largo de FM 1960 y de la US-59.",
      "El grupo es diverso: residentes de largo plazo con problemas crónicos de columna y de articulaciones, adultos en edad de trabajar con lesiones de auto y de trabajo, y personas jubiladas con osteoartritis y estenosis. Las raíces del consultorio están en esta comunidad.",
    ],
    patientsListIntro: "Pacientes que vemos con frecuencia en Humble",
    patientsList: [
      "Residentes de Humble de largo plazo con condiciones crónicas a lo largo de los años",
      "Adultos activos en edad de trabajar, con lesiones agudas y dolor crónico",
      "Personas jubiladas con osteoartritis, estenosis y fracturas por compresión",
      "Casos de compensación laboral y de accidente de auto",
      "Pacientes con cirugía de columna previa y dolor que volvió o que es nuevo",
    ],
    directionsIntro:
      "La oficina de Humble está en 1485 FM 1960 Bypass Rd. E, Suite 100, justo al este de la US-59/I-69, sobre el Bypass. Hay estacionamiento amplio. El edificio está del lado sur de la calle.",
    whyThisCityBlurb:
      "Humble es donde creció el consultorio. Esa raíz se nota en la forma de atender: los pacientes no son desconocidos y el equipo recuerda los nombres. La ventaja práctica es una atención intervencionista amplia sin salir de la zona.",
    landmarks: [
      "Oficina de Humble: 1485 FM 1960 Bypass Rd. E, Suite 100, al este de la US-59, sobre el Bypass",
      "Unos 5 minutos desde Humble High School y el centro de Humble",
      "Memorial Hermann Northeast queda cerca para estudios previos y referencias quirúrgicas",
      "Conveniente para residentes de Walden, Forest Cove y el corredor de la US-59",
    ],
    finalCtaHeadline: CTA,
  },
  "northwest-houston": {
    metaDescription: meta("Northwest Houston"),
    heroHeadline: "Cuidado preciso del dolor para pacientes de Northwest Houston.",
    heroIntro:
      "Los vecindarios de Northwest Houston, entre ellos Vintage Park, Willowbrook y el corredor de la 249, están entre los más cercanos. La mayoría llega a la oficina de Houston en 10 a 20 minutos.",
    commuteLine: "De 10 a 20 minutos desde la mayor parte de Northwest Houston hasta la oficina de Houston.",
    commuteShort: "10 a 20 min desde Willowbrook",
    aboutParagraphs: [
      "Northwest Houston es la zona amplia del corredor de la Texas 249: Vintage Park, Willowbrook, Champion Forest y el comercio de FM 1960. Es una de las partes más diversas del área que atendemos, desde profesionales jóvenes en comunidades de apartamentos hasta familias suburbanas de toda la vida y personas jubiladas activas.",
      "Aquí vemos el rango completo: lesiones por accidente de auto en autopistas concurridas, compensación laboral de empleadores de industria ligera y de almacenes, dolor crónico de columna en profesionales de oficina, y opciones biológicas para pacientes activos. El corredor de la Texas 249 es el eje geográfico del consultorio.",
    ],
    patientsListIntro: "Pacientes que vemos con frecuencia en Northwest Houston",
    patientsList: [
      "Personas de oficina con dolor cervical y lumbar por el escritorio y el traslado",
      "Lesiones por accidente de auto en la 249, el Beltway 8 y FM 1960",
      "Casos de compensación laboral de industria ligera y de almacenes",
      "Personas jubiladas activas con osteoartritis y estenosis",
      "Pacientes más jóvenes que consultan por neuromodulación cuando el dolor no ha cedido",
    ],
    directionsIntro:
      "Para la mayor parte de Northwest Houston, la oficina de Houston está en 13323 Dotson Rd, Suite 200, cerca de Willowbrook. El acceso es fácil desde el Beltway 8 y el Sam Houston Tollway. Hay estacionamiento en el lugar.",
    whyThisCityBlurb:
      "En Northwest Houston hay más consultorios de dolor que en otras partes de la ciudad, y muchos se especializan en una sola cosa. Aquí está el conjunto de nivel de instituto en un solo consultorio: ablación del nervio basivertebral (BVN), MILD, Minuteman, LinQ, estimulación de la médula espinal, ablación por radiofrecuencia y terapias biológicas, con un criterio diagnóstico que muchos consultorios no ofrecen.",
    landmarks: [
      "Corredor de la Texas 249, con acceso desde el Beltway 8 y el Sam Houston Tollway",
      "Unos 10 minutos desde Vintage Park y Willowbrook Mall",
      "Conveniente desde FM 1960, Cypresswood Drive y Antoine Drive",
      "Houston Methodist Willowbrook queda cerca para estudios previos",
    ],
    finalCtaHeadline: CTA,
  },
};

export function spanishLocation(slug: string): LocationDetail | undefined {
  const base = locationDetails[slug];
  const copy = CITY[slug];
  if (!base || !copy) return undefined;
  return {
    ...base,
    ...copy,
    commonConditions: base.commonConditions.map((item) => ({
      slug: item.slug,
      title: spanishLabel(item.title),
      blurb: CONDITION_BLURB[item.slug] ?? item.blurb,
    })),
    commonServices: base.commonServices.map((item) => ({
      slug: item.slug,
      title: spanishLabel(item.title),
      blurb: SERVICE_BLURB[item.slug] ?? item.blurb,
    })),
  };
}
