declare module "vanta" {
  const vanta: {
    CLOUDS: (options: Record<string, unknown>) => { destroy: () => void };
  };
  export default vanta;
}
