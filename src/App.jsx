import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Sessions from './components/Sessions';
import CTA from './components/CTA';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="app">
      <Navbar showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} />
      <main>
        <Hero setShowCreateModal={setShowCreateModal} />
        <Journey />
        <Sessions setShowCreateModal={setShowCreateModal} />
        <CTA setShowCreateModal={setShowCreateModal} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
