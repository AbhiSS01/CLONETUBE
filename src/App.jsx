import React, {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/context/ThemeContext'
import './App.css'
import Header from './components/frontiers/Header'
import Sidebar from './components/frontiers/Sidebar'
import HomePage from './components/pages/HomePage'
import Trending from './components/pages/Trending'
import '@fortawesome/fontawesome-free/css/all.min.css';
import VideoDetailsPage from './components/pages/VideoDetails'
import SearchResultsPage from './components/pages/SearchResultPage'
import ShortsPage from './components/pages/ShortsPage'
import ErrorBoundary, { withErrorBoundary } from './components/error/ErrorBoundary';



function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="app">
            <Header toggleSidebar={toggleSidebar} />
            <div className="content-container">
              <Sidebar isOpen={sidebarOpen} />
              <main className={`main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/trending" element={<HomePage />} />
                  <Route path="/subscriptions" element={<HomePage />} />
                  <Route path="/library" element={<HomePage />} />
                  <Route path="/history" element={<HomePage />} />
                  <Route path="/music" element={<HomePage />} />
                  <Route path="/gaming" element={<HomePage />} />
                  <Route path="/news" element={<HomePage />} />
                  <Route path="/playlist" element={<HomePage />} />
                  <Route path="/sports" element={<HomePage />} />
                  <Route path="/learning" element={<HomePage />} />
                  <Route path="/fashion" element={<HomePage />} />
                  <Route path="/watch-later" element={<HomePage />} />
                  <Route path="/liked-videos" element={<HomePage />} />
                  <Route path="/video/:videoId" element={<VideoDetailsPage />} />
                  <Route path="/search/:query" element={<SearchResultsPage />} />
                  <Route path='/shorts' element={<ShortsPage />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
