import React, { useContext, useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Film from './components/films/Film';
import ReviewContext from './reviewContext';
import reviewReducer from './reviewReducer';
import AddActorForm from './components/actors/AddActorForm';
import FilmForm from './components/films/FilmForm';
import Actor from './components/actors/Actor';
import AdminHome from './components/pages/AdminHome'

const App: React.FC = ({ match }: any) => {
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
              <Route exact path='/films/:id' component={Film} />
              <Route exact path='/addActor' component={AddActorForm} />
              <Route
                exact
                path='/addFilm'
                render={(props) => <FilmForm {...props} isUpdate={false} />}
              />
              <Route exact path='/actors/:id' component={Actor} />
              <Route
                exact
                path='/filmUpdate'
                render={(props) => <FilmForm {...props} isUpdate={true} />}
              />
              <Route exact path='/admin' component={AdminHome}/>
            </Switch>
          </ReviewContext.Provider>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
