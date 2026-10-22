import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { practice } from "@/lib/nav";
import { spanishPageMetadata } from "@/lib/spanish";

export const metadata: Metadata = spanishPageMetadata({
  title: "Términos de uso",
  description:
    "Términos de uso del sitio de HTx Pain Institute: uso aceptable, aviso de que no es consejo médico y límites de responsabilidad.",
  en: "/terms-of-use",
  es: "/es/terms-of-use",
});

const data = {
  title: "Términos y condiciones",
  eyebrow: "Legal",
  breadcrumbLabel: "Términos",
  effectiveLine: "Vigente en 2026",
  intro: "Al usar este sitio, usted acepta los términos de abajo.",
  home: { label: "Inicio", href: "/es" },
  ariaLabel: "Migas de pan",
  sections: [
    {
      heading: "1. Aceptación de los términos",
      paragraphs: [
        "Su acceso a este sitio y el uso que haga de él dependen de que acepte estos Términos y los cumpla. Al usar el sitio, usted acepta quedar obligado por estos Términos.",
      ],
    },
    {
      heading: "2. No es consejo médico",
      paragraphs: [
        "La información de este sitio es solo educativa. No sustituye el consejo, el diagnóstico ni el tratamiento de un médico. Consulte siempre a su médico si tiene preguntas sobre una condición médica.",
      ],
    },
    {
      heading: "3. No se crea una relación médico-paciente",
      paragraphs: [
        "El uso de este sitio no crea una relación médico-paciente. Esa relación solo se establece en una consulta formal en una de nuestras oficinas.",
      ],
    },
    {
      heading: "4. Propiedad intelectual",
      paragraphs: [
        "Todo el contenido de este sitio, incluidos textos, gráficos, logotipos, imágenes y software, es propiedad de HTx Pain Institute o de sus proveedores de contenido, y está protegido por las leyes de derechos de autor que correspondan.",
      ],
    },
    {
      heading: "5. Información que usted envía",
      paragraphs: [
        "Al enviar información por cualquier formulario de este sitio, usted declara que es exacta y que tiene derecho a enviarla. No envíe información de salud protegida de otras personas sin autorización.",
      ],
    },
    {
      heading: "6. Enlaces a terceros",
      paragraphs: [
        "Este sitio puede tener enlaces a sitios de terceros. No somos responsables del contenido, de la exactitud ni de las prácticas de esos sitios.",
      ],
    },
    {
      heading: "7. Límite de responsabilidad",
      paragraphs: [
        "Hasta el máximo que permita la ley, HTx Pain Institute, sus médicos, empleados y afiliados no serán responsables por daños indirectos, incidentales, especiales, consecuentes ni punitivos que surjan del uso de este sitio.",
      ],
    },
    {
      heading: "8. Ley aplicable",
      paragraphs: [
        "Estos Términos se rigen por las leyes del estado de Texas, sin aplicar las normas de conflicto de leyes. Cualquier disputa se resuelve en los tribunales del condado de Harris, Texas.",
      ],
    },
    {
      heading: "9. Cambios a estos términos",
      paragraphs: [
        "Podemos actualizar estos Términos en cualquier momento. Si usted sigue usando el sitio después de un cambio, acepta los Términos revisados.",
      ],
    },
    {
      heading: "10. Contacto",
      paragraphs: [`¿Preguntas sobre estos Términos? Escríbanos a ${practice.email}.`],
    },
  ],
};

export default function SpanishTermsPage() {
  return <LegalPage data={data} />;
}
