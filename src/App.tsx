import { useState } from 'react'
import './App.css'
import EditableText from './components/EditableText'
import DifferentialDiagnosis from './components/DifferentialDiagnosis'

function App() {
  const [oneLiner, setOneLiner] = useState('');
  const [hpi, setHpi] = useState('');
  const [pmhMeds, setPmhMeds] = useState('');
  const [vitals, setVitals] = useState('');
  const [exam, setExam] = useState('');
  const [labs, setLabs] = useState('');
  const [problemRep, setProblemRep] = useState('');


  return (
    <div className="app-container">
      <header>
        <h1>Morning Report</h1>
      </header>
      <main className="main-grid">
        <div className="column">
          <div className="section">
            <h3>Patient one liner</h3>
            <EditableText initialText={oneLiner} onSave={setOneLiner} />
          </div>
          <div className="section">
            <h3>HPI</h3>
            <EditableText initialText={hpi} onSave={setHpi} isTextarea={true} />
          </div>
          <div className="section">
            <h3>PMH/Meds (abbrev)</h3>
            <EditableText initialText={pmhMeds} onSave={setPmhMeds} isTextarea={true} />
          </div>
        </div>
        <div className="column">
          <div className="section">
            <h3>Vital signs</h3>
            <EditableText initialText={vitals} onSave={setVitals} isTextarea={true} />
          </div>
          <div className="section">
            <h3>Exam</h3>
            <EditableText initialText={exam} onSave={setExam} isTextarea={true} />
          </div>
          <div className="section">
            <h3>Labs/Imaging</h3>
            <EditableText initialText={labs} onSave={setLabs} isTextarea={true} />
          </div>
        </div>
        <div className="column">
          <div className="section">
            <h3>Problem representation</h3>
            <EditableText initialText={problemRep} onSave={setProblemRep} isTextarea={true} />
          </div>
          <div className="section">
            <h3>Differential dx</h3>
            <DifferentialDiagnosis />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
