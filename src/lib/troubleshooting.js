const modules = import.meta.glob('../data/troubleshooting/*.json', { eager: true });

export const troubleshootingHubs = Object.values(modules).map((m) => (m && m.default ? m.default : m));

export function getHub(productSlug) {
  return troubleshootingHubs.find((h) => h.product === productSlug);
}

export function allSymptoms() {
  return troubleshootingHubs.flatMap((hub) =>
    hub.symptoms.map((symptom) => ({ product: hub.product, symptom }))
  );
}
