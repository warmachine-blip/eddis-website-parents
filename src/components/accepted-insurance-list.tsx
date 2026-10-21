import { CheckBullet } from "@/components/icon-badge";
import { insuranceGroups, otherPaymentOptions } from "@/lib/insurance";

function groupId(name: string) {
  return `plans-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

/** Grouped plan list, using the check-card pattern from /insurance. */
export default function AcceptedInsuranceList() {
  const groups = [
    ...insuranceGroups,
    { name: "Personal injury and self pay", plans: otherPaymentOptions },
  ];

  return (
    <div className="mt-8 grid gap-10">
      {groups.map((group) => (
        <section key={group.name} aria-labelledby={groupId(group.name)}>
          <h3
            id={groupId(group.name)}
            className="font-serif text-xl leading-tight text-navy"
          >
            {group.name}
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {group.plans.map((plan) => (
              <li
                key={plan}
                className="flex items-start gap-3 rounded-xl border border-line bg-off-white px-5 py-4"
              >
                <CheckBullet tone="brass" />
                <span className="text-sm leading-relaxed text-charcoal-soft">{plan}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
