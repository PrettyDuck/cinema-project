import React, { useContext, useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import SearchFilms from './components/pages/SearchFilms';
import Film from './components/pages/Film';
import ReviewContext from './reviewContext';
import reviewReducer from './reviewReducer';

const App: React.FC = () => {
  const initialState = useContext(ReviewContext);
  const [state, dispatch] = useReducer(reviewReducer, initialState);
  return (
    <Router>
      <div className='flex flex-col h-screen'>
        <Header />
        <div className='mb-auto'>
          <ReviewContext.Provider value={{ state, dispatch }}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/search' component={SearchFilms} />
              <Route exact path='/films/:id' component={Film} />
            </Switch>
          </ReviewContext.Provider>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
