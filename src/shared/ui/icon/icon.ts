import "./icon.css";
import { SVGFiles, loadSVG } from "../../lib/svg-utils";

type IconOptions = {
  icon: SVGFiles;
  className?: string;
  size?: number;
};

function createIcon(options: IconOptions): HTMLElement {
  const container = document.createElement("span");
  container.classList.add("ui-icon");

  if (options.className) {
    container.classList.add(options.className);
  }

  if (options.size) {
    container.style.width = `${options.size}px`;
    container.style.height = `${options.size}px`;
  }

  loadSVG(options.icon, container);

  return container;
}

export const Icon = {
  create: createIcon,
};
