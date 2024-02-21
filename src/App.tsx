import React from 'react';

import './App.css';

import { MainScene, MobileTabletScene } from '@/scenes';
import { useCanvasSchemaContext, useThemeContext } from '@/core/providers';
import useAutosave from '@/core/autosave/autosave.hook';

function App() {
  const { startAutosave, stopAutosave } = useAutosave();
  const { canvasSchema } = useCanvasSchemaContext();

  React.useEffect(() => {
    startAutosave();
    return stopAutosave;
  }, [canvasSchema]);

  const { theme } = useThemeContext();
  const [isSupportedScreenResolution, setSupportedScreenResolution] =
    React.useState(true);

  const handleResize = () => {
    window.innerWidth < 1080
      ? setSupportedScreenResolution(false)
      : setSupportedScreenResolution(true);
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={theme.themeMode}>
      {isSupportedScreenResolution ? <MainScene /> : <MobileTabletScene />}
    </div>
  );
}

export default App;
