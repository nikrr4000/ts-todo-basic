import "./button.css";
import { SVGFiles, loadSVG } from "../../lib/svg-utils";

type ButtonOptions = {
  text?: string;
  icon?: SVGFiles;
  className?: string;
  onClick?: (event: MouseEvent) => void;
};

function createButton(options: ButtonOptions = {}): HTMLButtonElement {
  const button = document.createElement("button");

  button.classList.add("ui-button");

  if (options.className) {
    button.classList.add(options.className);
  }

  if (options.icon) {
    button.classList.add("ui-button--icon");
    loadSVG(options.icon, button);
  } else if (options.text) {
    button.textContent = options.text;
  }

  if (options.onClick) {
    button.addEventListener("click", options.onClick);
  }

  return button;
}

export const Button = {
  create: createButton,
};
