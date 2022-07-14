import Footer from 'containers/Footer/Footer';
import Header from 'containers/Header/Header';
import Main from 'containers/Main/Main';
import './App.css';
import testData from '../../testData';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Main data={testData}></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
