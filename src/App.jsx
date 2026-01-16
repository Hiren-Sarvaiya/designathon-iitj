import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { LearningHub } from './pages/LearningHub';
import { PredictorHub } from './pages/PredictorHub';
import { PuzzleInterface } from './pages/PuzzleInterface';
import { Progress } from './pages/Progress';
import { Leaderboard } from './pages/Leaderboard';
import { Resources } from './pages/Resources';

import { ThreeDMind } from './pages/ThreeDMind';
import { DetectiveLab } from './pages/DetectiveLab';
import { MapMaker } from './pages/MapMaker';
import { GameProvider } from './context/GameContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <NotificationProvider>
        <GameProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path="hub" element={<LearningHub />} />
              <Route path="hub/patterns" element={<PredictorHub />} />
              <Route path="hub/spatial" element={<ThreeDMind />} />
              <Route path="hub/logic" element={<DetectiveLab />} />
              <Route path="hub/directions" element={<MapMaker />} />
              <Route path="puzzle/patterns/:id" element={<PuzzleInterface />} />
              <Route path="puzzle/spatial/:id" element={<PuzzleInterface />} />
              <Route path="puzzle/logic/:id" element={<PuzzleInterface />} />
              <Route path="puzzle/directions/:id" element={<PuzzleInterface />} />
              <Route path="progress" element={<Progress />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="resources" element={<Resources />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </NotificationProvider>
    </ToastProvider>
  );
}

export default App;
