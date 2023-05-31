import { FunctionComponent, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Microfrontend } from "./types"

export interface MicrofrontendProps {
  microfrontend: Microfrontend;
}

const MicroFrontend: FunctionComponent<MicrofrontendProps> = ({
  microfrontend: {
    componentId,
    path,
    mountCallback,
    unmountCallback,
  }
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onParentNavigateRef = useRef<(pathname: string) => void | undefined>();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onNavigate = useCallback((nextPathname: string) => {
    const { pathname } = location;
    const nextPathWithBasePathPrefix = 
      nextPathname === '/' ? path : `${path}${nextPathname}`;
    if(
      (pathname !== nextPathWithBasePathPrefix && 
        nextPathWithBasePathPrefix !== path) ||
      ( pathname !== path && 
        nextPathWithBasePathPrefix !== path)
      ){
        navigate(nextPathWithBasePathPrefix, {replace: true});
      }
  },[navigate, location, path]);

  const renderMicrofrontendScreen = useCallback(() => {
    const microfrontendProps = {
      path,
      onNavigate,
      containerId: componentId,
    }

    return mountCallback(microfrontendProps);
  },[path, componentId, onNavigate, mountCallback]);

  useEffect(() => {
    if(!onParentNavigateRef.current) {
      const { onParentNavigate } = renderMicrofrontendScreen();
      if (onParentNavigate) {
        onParentNavigateRef.current = onParentNavigate
      }
    }

    return () => {
      if (onParentNavigateRef.current && !containerRef.current) {
        setTimeout(() => {
          unmountCallback();
          onParentNavigateRef.current = undefined;
        });
      }
    }
  },[renderMicrofrontendScreen, unmountCallback]);

  useEffect(() => {
    if(onParentNavigateRef.current && location) {
      onParentNavigateRef.current(location.pathname);
    }
  }, [onParentNavigateRef, location])

  return (
    <div 
      id={componentId}
      data-testid={componentId}
      ref={containerRef}
    />
  )
}

export {MicroFrontend}