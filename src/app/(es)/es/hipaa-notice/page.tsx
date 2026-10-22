import type { Metadata } from "next";
import EsFinalCta from "@/components/es-final-cta";
import LegalPage from "@/components/legal-page";
import { offices, practice } from "@/lib/nav";
import { spanishPageMetadata } from "@/lib/spanish";

export const metadata: Metadata = spanishPageMetadata({
  title: "Aviso de privacidad HIPAA",
  description:
    "Aviso de prácticas de privacidad de HTx Pain Institute: cómo puede usarse y compartirse su información de salud protegida.",
  en: "/hipaa-notice",
  es: "/es/hipaa-notice",
});

const data = {
  title: "Aviso de prácticas de privacidad",
  eyebrow: "HIPAA",
  breadcrumbLabel: "Aviso de HIPAA",
  parentCrumb: { label: "Pacientes", href: "/es/patients" },
  home: { label: "Inicio", href: "/es" },
  ariaLabel: "Migas de pan",
  card: false,
  intro:
    "Este aviso describe cómo puede usarse y compartirse su información médica, y cómo puede usted consultarla. Léalo con atención.",
  sections: [
    {
      heading: "Nuestro compromiso con su información de salud",
      effectiveNote: "Fecha de vigencia: 2026-01-01",
      paragraphs: [
        'HTx Pain Institute ("nosotros") se compromete a proteger la privacidad de su información de salud. Este Aviso de prácticas de privacidad describe cómo puede usarse y compartirse su información médica, y cómo puede usted consultarla. Léalo con atención.',
        'La ley nos exige mantener la privacidad de su información de salud protegida ("PHI", por sus siglas en inglés), entregarle este Aviso de nuestros deberes legales y prácticas de privacidad, y cumplir los términos del Aviso que esté vigente.',
      ],
    },
    {
      heading: "Usos y divulgaciones para tratamiento, pago y operaciones",
      paragraphs: ["Podemos usar y divulgar su PHI para estos fines:"],
      list: [
        "Tratamiento: para prestar, coordinar o administrar su atención médica y los servicios relacionados.",
        "Pago: para facturar y cobrar a su seguro, a un programa del gobierno o a usted.",
        "Operaciones de atención médica: para las actividades necesarias para operar el consultorio, incluidas la mejora de la calidad, la revisión de credenciales, la capacitación y las auditorías.",
      ],
    },
    {
      heading: "Otros usos y divulgaciones que permite la ley",
      paragraphs: [
        "Podemos usar o divulgar su PHI sin su autorización en ciertas situaciones, entre ellas: cuando la ley lo exige; para actividades de salud pública; para reportar abuso, negligencia o violencia doméstica; para supervisión de salud; en procedimientos judiciales y administrativos; para fines de las autoridades; para donación de órganos; para investigación con las aprobaciones correspondientes; para evitar una amenaza grave a la salud o a la seguridad; para funciones especializadas del gobierno; y para compensación laboral, según lo autoriza la ley de Texas.",
      ],
    },
    {
      heading: "Usos y divulgaciones que requieren su autorización",
      paragraphs: [
        "La mayoría de los usos y divulgaciones de notas de psicoterapia, de comunicaciones publicitarias y de la venta de PHI requieren su autorización por escrito. Usted puede revocar una autorización por escrito en cualquier momento. Dejaremos de usar o divulgar su PHI para el fin de esa autorización, salvo cuando ya hayamos actuado confiando en ella.",
      ],
    },
    {
      heading: "Sus derechos sobre su información de salud",
      paragraphs: ["Usted tiene derecho a:"],
      list: [
        "Revisar y obtener una copia de sus expedientes médicos y de facturación.",
        "Pedir una corrección de la información que usted considere inexacta.",
        "Recibir un recuento de ciertas divulgaciones de su PHI.",
        "Pedir límites a ciertos usos y divulgaciones, incluidas las divulgaciones a un plan de salud cuando usted haya pagado un servicio por completo, de su bolsillo.",
        "Pedir comunicaciones confidenciales por otro medio o en otro lugar.",
        "Recibir una copia en papel de este Aviso, aunque haya aceptado recibirlo en formato electrónico.",
        "Que le avisemos si ocurre una violación de PHI no protegida.",
      ],
    },
    {
      heading: "Cambios a este aviso",
      paragraphs: [
        "Nos reservamos el derecho de cambiar este Aviso y de que la versión revisada aplique a la información médica que ya tenemos sobre usted y a la que recibamos después. El Aviso vigente está en nuestras oficinas y en el sitio. Cada versión tiene fecha.",
      ],
    },
    {
      heading: "Quejas",
      paragraphs: [
        `Si usted cree que se violaron sus derechos de privacidad, puede presentar una queja ante el consultorio. Comuníquese con el responsable de privacidad en cualquiera de las dos direcciones, o por teléfono al ${practice.phone}. También puede presentar una queja ante la Office for Civil Rights del U.S. Department of Health and Human Services. No tomaremos represalias contra usted por presentar una queja.`,
      ],
    },
  ],
};

export default function SpanishHipaaPage() {
  return (
    <div>
      <LegalPage data={data} />

      <div className="mx-auto max-w-3xl px-6 pb-16 lg:px-10 lg:pb-24">
        <h2 className="font-serif text-xl text-navy">Cómo contactarnos</h2>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
          Para ejercer cualquiera de estos derechos, o para preguntar sobre este Aviso, comuníquese con el responsable
          de privacidad:
        </p>
        <address className="mt-3 not-italic text-sm leading-relaxed text-charcoal-soft">
          {practice.name}
          {offices.map((office) => (
            <span key={office.key} className="block">
              {office.addressLine1}, {office.addressLine2}
            </span>
          ))}
          Teléfono: {practice.phone}
          <br />
          Correo: {practice.email}
        </address>
        <div className="mt-5 rounded-xl border border-line bg-pearl p-4 text-sm leading-relaxed text-charcoal-soft">
          ¿Necesita una copia en papel? Pídala en recepción en su próxima visita, o contáctenos.
        </div>
      </div>

      <EsFinalCta />
    </div>
  );
}
