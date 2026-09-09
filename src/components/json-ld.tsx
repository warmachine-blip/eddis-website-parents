/**
 * Renders one JSON-LD block. Schema objects are built in the component that
 * knows the data, then handed here so the serialisation lives in one place.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
