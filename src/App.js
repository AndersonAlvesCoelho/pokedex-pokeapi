import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import {Tooltip } from 'antd';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

import CardPokemon from "./components/CardPokemon/index";
import { getListPokemon } from './services/listPokemon';
import pokeball from './assets/imagens/pokeball.gif';

function App() {

  const [listPokemon, setListPokemon] = useState([]);
  const [api, setApi] = useState('https://pokeapi.co/api/v2/pokemon');

  useEffect(() => {
    setListPokemon([])
    setTimeout(() => {
      getListPokemon(api).then((result) => {
        setListPokemon(result)
      })
    }, 1000);
  }, [api])


  function next() {
    setApi(listPokemon.next)
  };

  function previous() {
    setApi(listPokemon.previous)
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <div className="icons-content ">
              <Tooltip title="next">
                {listPokemon.previous && (
                  <FaArrowCircleLeft size={50} type="button" onClick={previous} />
                )}
              </Tooltip>
            </div>
          </Nav>
          <Nav >
            <div className="icons-content">
              <Tooltip title="next">
                {listPokemon.next && (
                  <FaArrowCircleRight size={50} type="button" onClick={next} />
                )}
              </Tooltip>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {listPokemon.length !== 0 ? (<>

        <Container fluid className="my-5">
          <Row>
            {listPokemon.results.map((pokemon, index) => (
              <Col sm={3} key={index} className="mb-3">
                <CardPokemon pokemon={pokemon} />
              </Col>
            ))}
          </Row>
        </Container>

      </>) : (
          <img
            src={pokeball}
            width="200"
            height="200"
            className="d-inline-block align-top img-loadings"
            alt="React Bootstrap logo"
          />
        )}


    </>
  );
}

export default App;
