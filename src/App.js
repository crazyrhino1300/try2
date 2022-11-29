
import './App.css';
import composers from "./assets/composers.json";
import composerComp from "./composer.js"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Overlay from './hoverbutton.js';


// please commit casdfasdf
function App() {
  const [total, totalYear] = useState(0);
  const [totalno, favtotal] = useState(0);
  const [favorites, favoriteComposers] = useState([]);
  const [gallery, setGal] = useState(composers);
  const [filters, setFilters] = useState([]);
  const [gall, setGall] = useState([])


  // compiles all of the years togethetr.
  function addYear(prop) {
    var bday = prop.birth;
    var bdayArray = bday.split('-');
    return totalYear(total + 2022 - parseInt(bdayArray[0]));
  }
  // adds 1 to the total number of favorited composers.
  function addFav() {
    return favtotal(totalno + 1);
  }

  /*
  input: num: average years since birth of the favorited composers.
  output: the era that it corresponds to
  */
  function determineEra(num) {
    if (num >= 272) {
      return "Your favorite era seems to be the Baroque Era";
    } else if (num < 272 && num >= 202) {
      return "Your favorite era seems to be the Classical Era";
    } else if (num < 202 && num >= 122) {
      return "Your favorite era seems to be the Romantic Era";
    } else if (num <122 && num >=0 ) {
      return "Your favorite era seems to be the Modern Era";
    }  else {
      return ""
    }
  }
  function averageYear() {
    if (totalno != 0) {
      return "Avg fav composer age: " + Math.round(total/totalno);
    }
    return "";
  }
  // ===========================================================================
  // --------------------------- Sorting functions -----------------------------
  function compare(prop1, prop2) {
    let name1 = prop1.name;
    let name2 = prop2.name;

    if (name1 < name2) { return -1; }
    if (name2 > name1) { return 1; }
    return 0;
    //code taken from w3 schools.
  }
  const [sortedP, setSort] = useState(false)
  function sortAlpha() {
    if (!sortedP) {setSort(true)}
    const composerArr = [...gallery]
    setGal(composerArr.sort(compare))
  }

  // russia, france, poland, germany, italy, austria, USA, UK
  // ===========================================================================
  // ------------------------- Filtering functions -----------------------------

  const [baroque, setBaroque] = useState(false);
  const [classical, setClassical] = useState(false);
  const [romantic, setRomantic] = useState(false);
  const [modern, setModern] = useState(false);
  const [austria, setAustria] = useState(false);
  const [france, setFrance] = useState(false);
  const [germany, setGermany] = useState(false);
  const [italy, setItaly] = useState(false);
  const [poland, setPoland] = useState(false);
  const [russia, setRussia] = useState(false);
  const [UK, setUK] = useState(false);
  const [USA, setUSA] = useState(false);
  // BY EPOCH
  function baroqueP(prop) {
    return prop.epoch == "Baroque"
  }
  function classicalP(prop) {
    return prop.epoch == "Classical"
  }
  function romanticP(prop) {
    return prop.epoch == "Early Romantic" || prop.epoch == "Romantic" || prop.epoch == "Late Romantic"
  }
  function modernP(prop) {
    return prop.epoch == "21st Century"
  }

  function filterBaroque() {
    if (!baroque) {setBaroque(true)}
    const filtMe = [...gallery]
    setGal(filtMe.filter(baroqueP))

    setFilters(filters => ["Baroque ", ... filters])
  }
  function filterClassical() {
    if (!classical) {setClassical(true)}
    const filtMe = [...gallery]
    setGal(filtMe.filter(classicalP))
    setFilters(filters => ["Classical ", ... filters])
  }
  function filterRomantic() {
    if (!romantic) {setRomantic(true)}
    const filtMe = [...gallery]
    setGal(filtMe.filter(romanticP))
    setFilters(filters => ["Romantic ", ... filters])
  }
  function filterModern() {
    if (!modern) {setModern(true)}
    const filtMe = [...gallery]
    setGal(filtMe.filter(modernP))
    setFilters(filters => ["Modern ", ... filters])
  }

  function filterTime(prop) {
    return (prop == "Baroque " || prop == "Classical " || prop == "Romantic " || prop == "Modern ")
  }
  function resetEpoch() {
    const filtMe = [...composers]
    setFilters(filters.filter(filterOrigins))
    setGal(filtMe)
    if (sortedP) {
      setGal(filtMe.sort(compare))
    }
    if (austria) {
      setAustria(false)
      setGal(filtMe.filter(item => item.origin == "Austria"))
    }
    if (france) {
      setFrance(false)
      setGal(filtMe.filter(item => item.origin == "France"))
    }
    if (germany) {
      setGermany(false)
      setGal(filtMe.filter(item => item.origin == "Germany"))
    }
    if (italy) {
      setItaly(false)
      setGal(filtMe.filter(item => item.origin == "Italy"))
    }
    if (poland) {
      setPoland(false)
      setGal(filtMe.filter(item => item.origin == "Poland"))
    }
    if (russia) {
      setRussia(false)
      setGal(filtMe.filter(item => item.origin == "Russia"))
    }
    if (UK) {
      setUK(false)
      setGal(filtMe.filter(item => item.origin == "UK"))
    }
    if (USA) {
      setUSA(false)
      setGal(filtMe.filter(item => item.origin == "USA"))
    }
  }
  // russia, france, poland, germany, italy, austria, USA, UK

  function filterAustria() {
    const filtMe = [...gallery]
    if (!austria) {setAustria(true)}
    setGal(filtMe.filter(item => item.origin == "Austria"))
    setFilters(filters => ["Austria ", ... filters])
  }
  function filterFrance() {
    const filtMe = [...gallery]
    if (!france) {setFrance(true)}
    setGal(filtMe.filter(item => item.origin == "France"))
    setFilters(filters => ["France ", ... filters])
  }
  function filterGermany() {
    const filtMe = [...gallery]
    if (!germany) {setGermany(true)}
    setGal(filtMe.filter(item => item.origin == "Germany"))
    setFilters(filters => ["Germany ", ... filters])
  }
  function filterItaly() {
    const filtMe = [...gallery]
    if (!italy) {setItaly(true)}
    setGal(filtMe.filter(item => item.origin == "Italy"))
    setFilters(filters => ["Italy ", ... filters])
  }
  function filterPoland() {
    const filtMe = [...gallery]
    if (!poland) {setPoland(true)}
    setGal(filtMe.filter(item => item.origin == "Poland"))
    setFilters(filters => ["Poland ", ... filters])
  }
  function filterRussia() {
    const filtMe = [...gallery]
    if (!russia) {setRussia(true)}
    setGal(filtMe.filter(item => item.origin == "Russia"))
    setFilters(filters => ["Russia ", ... filters])
  }
  function filterUK() {
    const filtMe = [...gallery]
    if (!UK) {setUK(true)}
    setGal(filtMe.filter(item => item.origin == "UK"))
    setFilters(filters => ["UK ", ... filters])
  }
  function filterUSA() {
    const filtMe = [...gallery]
    if (!USA) {setUSA(true)}
    setGal(filtMe.filter(item => item.origin == "USA"))
    setFilters(filters => ["USA ", ... filters])
  }
  function filterOrigins(prop) {
    return (prop == "Austria " || prop == "France " || prop == "Germany "||
    prop == "Italy " || prop == "Poland " || prop == "Russia " || prop == "UK " || prop == "USA ")
  }
  function resetOrigin() {
    setFilters(filters.filter(filterTime))
    setGal(filtMe)
    const filtMe = [...composers]
    if (sortedP) {
      setGal(filtMe.sort(compare))
    }
    if (baroque) {
      setBaroque(false)
      setGal(filtMe.filter(baroqueP))
    }
    if (classical) {
      setClassical(false)
      setGal(filtMe.filter(classicalP))
    }
    if (romantic) {
      setRomantic(false)
      setGal(filtMe.filter(romanticP))
    }
    if (modern) {
      setModern(false) 
      setModern(filtMe.filter(romanticP))
    }
  }

  function activateFilters() {
    setGall([...composers])
   
    if (baroque) {
      setGall(gall.filter(baroqueP))
      setFilters(filters => ["Baroque ", ... filters])
    } 
    console.log(baroque)
    console.log(gall)
    setGal(gall)
  }

  // ===========================================================================
  // ----------------------------- Reset functions -----------------------------
  function reset() {
    setGal(composers);
    setFilters([]);
  }

  // ===========================================================================
  // --------------------------- aggregator displa -----------------------------
  /* on click, adds the favorited composer to the list of composers. */
  function appendComposer(prop) {
    favoriteComposers(favorites => [prop.name, ...favorites]);
  }
  function removeComposer(prop) {

    if (favorites.includes(prop.name)) {
      for (let i=0; i < favorites.length; i++) {
        if (favorites[i] == prop.name) {
          console.log(favorites)
          favorites.splice(i, 1)     
          totalYear( total - (2022 - parseInt(prop.birth.split('-')[0])))
          favtotal(totalno - 1)
          break
        }
      }

    }
  }
  function renderFav() {
    return favorites.map((item) => <li>{item}</li>)
  }
  // ===========================================================================
  return (
    <div id="root">
      <header>
        <Navbar className="navbar">

          <Navbar.Brand href="home"><h1>&#127925; composers 101 &#127925;</h1></Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse className="justify-content-end">
          </Navbar.Collapse>

        </Navbar>

      </header>
      <Container>

        <Row >
          <Col md="12" lg="3" style = {{paddingBottom: "1rem"}}>
            <div className="left">
              <div style = {{display: "flex", alignItems:"center"}}>
                <h5>Which era of Classical music do you like best?</h5>
                <Overlay/>
              </div>
              
              <p className = "mainpage"><i><u>{averageYear()}</u></i> </p>

              <p className = "mainpage"><i><u>{determineEra(total / totalno)}</u></i></p>
              <h5>Favorite composers:</h5> 
              <p className = "mainpage">{renderFav()} </p>
            </div>

          </Col>


          <Col md="12" lg="9">
            <div className="col2Head">
              <div>
                <h2 style = {{marginBottom: "0px"}}> All of the composers listed: </h2>
                <p style = {{fontFamily: "'Montserrat Alternates', sans-serif"}}> Filters Active: {filters} </p>
              </div>
              <div style = {{display: "flex", flexFlow:"row"}}>
                <div className = "buttons">
                  <Button className="button1" variant = "outline-primary" onClick={() => sortAlpha()}>Sort Name A-Z</Button>
                  <Button className="button1" variant = "outline-danger" onClick={() => reset()}> Reset Filters</Button>

                </div>
                <div className="buttons">
                  
                  <Dropdown className = "button2" as={ButtonGroup}>
                    <Button variant="outline-success">Era Filter</Button>
                    <Dropdown.Toggle split variant="outline-success" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {filterBaroque()}}>Baroque</Dropdown.Item>
                      <Dropdown.Item onClick={() => filterClassical()}>Classical</Dropdown.Item>
                      <Dropdown.Item onClick={() => filterRomantic()}>Romantic</Dropdown.Item>
                      <Dropdown.Item onClick={() => filterModern()}>Modern</Dropdown.Item>
                      {/* <Dropdown.Divider />
                      <Dropdown.Item onClick={() => resetEpoch()}>Reset Epoch</Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown className = "button2" as={ButtonGroup}>
                    <Button variant="outline-success">Origin Filter</Button>
                    <Dropdown.Toggle split variant="outline-success" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => filterAustria()} >Austria</Dropdown.Item>
                      <Dropdown.Item onClick={() => filterFrance()}>France</Dropdown.Item>
                      <Dropdown.Item onClick={() => filterGermany()}>Germany</Dropdown.Item>
                      <Dropdown.Item onClick={() => filterItaly()}>Italy</Dropdown.Item>
                      <Dropdown.Item onClick={() => filterPoland()}>Poland</Dropdown.Item>
                      <Dropdown.Item onClick={() => filterRussia()}>Russia</Dropdown.Item>
                      <Dropdown.Item onClick={() => filterUK()}>UK</Dropdown.Item>
                      <Dropdown.Item onClick={() => filterUSA()}>USA</Dropdown.Item>
                      {/* <Dropdown.Divider />
                      <Dropdown.Item onClick={() => resetOrigin()}>Reset Origin</Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              
            </div>
            <br></br>
            <div className="gallery">
              {gallery.map((item) => (composerComp(item, addYear, addFav, appendComposer, removeComposer)))}
            </div>
          </Col>
        </Row>
      </Container>
      <footer style = {{borderTop: "1px solid rgb(0 0 0 / 18%)"}}>
        <i>
          Applying 2 of the same filter (ex both Austria and UK or both Baroque and classical) will result in 0 composers being showed. It's not broken.
        </i>
        <br></br>
        <i>All composers and their works can be found at https://openopus.org/.</i>
        <br></br>
        <i>All components were built and modified based on documentation from react-bootstrap.</i>
      </footer>
    </div>
  );
}

export default App;
