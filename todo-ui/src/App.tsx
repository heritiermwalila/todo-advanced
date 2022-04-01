import React from 'react';
import './App.scss';
import TodoContainer from './components/Todo/TodoContainer';
import AppProvider from './context/App';

function App() {
  // const [loading, setIsLoading] = React.useState(false)
  return (
    <AppProvider>
      <TodoContainer />
    </AppProvider>
  );
}

export default App;
