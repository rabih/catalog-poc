import Footer from 'containers/Footer/Footer';
import Header from 'containers/Header/Header';
import Main from 'containers/Main/Main';

import './App.css';

function App() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const companyId = urlParams.get("companyId");

  return (
    <div className="App">
      <Header></Header>
      <Main companyId={companyId}></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
