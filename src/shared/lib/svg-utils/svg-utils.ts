const SVGFilePaths = {
  trashCan:
    '<svg viewBox="0 0 16 16" fill="#a6d6d6" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 2H1V4H15V2H12V0H4V2Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6H13V16H3V6ZM7 9H9V13H7V9Z" fill="#000000"></path> </g></svg>',
  pencil:
    '<svg viewBox="0 0 16 16" fill="#a6d6d6" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.29289 3.70711L1 11V15H5L12.2929 7.70711L8.29289 3.70711Z" fill="#000000"></path> <path d="M9.70711 2.29289L13.7071 6.29289L15.1716 4.82843C15.702 4.29799 16 3.57857 16 2.82843C16 1.26633 14.7337 0 13.1716 0C12.4214 0 11.702 0.297995 11.1716 0.828428L9.70711 2.29289Z" fill="#000000"></path> </g></svg>',
  checkmark:
    '<svg viewBox="0 0 16 16" fill="#a6d6d6" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" fill="#000000"></path> </g></svg>',
} as const;

export type SVGFiles = keyof typeof SVGFilePaths;

export function loadSVG(SVGName: SVGFiles, container: HTMLElement): void {
  const SVG = SVGFilePaths[SVGName];
  container.innerHTML = SVG;
  const svgElement = container.querySelector("svg");

  if (!svgElement) return;

  svgElement.setAttribute("height", "100%");
  svgElement.setAttribute("width", "100%");

  if (!svgElement.hasAttribute("viewBox")) {
    const width = svgElement.width?.baseVal?.value || 16;
    const height = svgElement.height?.baseVal?.value || 16;
    svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  svgElement.style.width = "100%";
  svgElement.style.height = "100%";
  svgElement.style.display = "block";
}

export function getSVGString(SVGName: SVGFiles): string {
  return SVGFilePaths[SVGName];
}
