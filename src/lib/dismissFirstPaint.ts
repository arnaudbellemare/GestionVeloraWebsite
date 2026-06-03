/** Removes the static HTML LCP shell once React has painted header + hero. */
export function dismissFirstPaintShell(): void {
  const shell = document.getElementById("gv-first-paint");
  if (!shell) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      shell.remove();
      document.documentElement.classList.add("gv-app-ready");
    });
  });
}
