import ResumeUploader from "./components/ResumeUploader";
import ProgressStepper from "./components/ProgressStepper";
import LearningPathTable from "./components/LearningPathTable";
import Leaderboard from "./components/Leaderboard";
import "./styles.css";
export default function App() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Mavericks Coding Platform
      </h1>

      {/* Add Stepper */}
      <ProgressStepper currentStep={2} />

      {/* Existing Components */}
      <ResumeUploader />

      <LearningPathTable />

      <Leaderboard />
    </div>
  );
}
