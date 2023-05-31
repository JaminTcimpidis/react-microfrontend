import { RouteObject } from "react-router-dom";

export interface Microfrontend {
  componentId: string;
  path: string;
  children?: RouteObject[];
  mountCallback: (props: MicrofrontendRemote) => { onParentNavigate: (pathname: string) => void };
  unmountCallback: () => void;
}

export interface MicrofrontendRemote {
  containerId: string;
  path:string;
  onNavigate?: (pathname: string) => void;
}