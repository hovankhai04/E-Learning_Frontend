import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { VocabularyPage } from '../modules/learning/Vocabulary/VocabularyPage'
import { LearningSession } from '../modules/learning/Vocabulary/LearningSession'
import { ReviewSession } from '../modules/learning/Vocabulary/ReviewSession'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <Header 
      isLoggedIn={isLoggedIn} 
      />
      <Routes>
        <Route
          path="/"
          element={
            <div className="main w-full flex flex-col items-center justify-center mt-20 mb-20">
              <p className="text-mint-50 py-4">Click the button to test the Login State (isLoggedIn or not)</p>
              <Button variant="primary" className='w-[30%] mx-auto' onClick={() => setIsLoggedIn(!isLoggedIn)}>Check!</Button>
            </div>
          }
        />
        <Route path="/learning" element={<VocabularyPage />} />
        <Route path="/learning/:topicId/part/:partIndex" element={<LearningSession />} />
        <Route path="/learning/:topicId/part/:partIndex/review" element={<ReviewSession />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
