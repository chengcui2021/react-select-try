import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Container, Col, Form, FormGroup, Label, Button } from "reactstrap";

function App() {

  const numberOfImages = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
  ];

  const [breedValue, setBreedValue] = useState('');
  const [breed, setBreed] = useState([]);
  const [number, setNumber] = useState(numberOfImages[0]);
  const [subBreedValue, setSubBreedValue] = useState(undefined);
  const [subbreed, setSubBreed] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch(
      `https://dog.ceo/api/breeds/list`
    )
      .then((res) => res.json())
      .then((data) => {
        data.message.forEach((n, i) => {
          const val = {}
          val.value = n
          breed.push(val)
        })
        setBreed(breed)
        setBreedValue(breed[0])

      });
  }, []);


  const onchangeSelect = (item) => {
    setBreedValue(item)

    fetch(
      `https://dog.ceo/api/breed/${item.value}/list`
    )
      .then((res) => res.json())
      .then((data) => {
        const selectedBreed = item.value
        data.message[selectedBreed].forEach((n, i) => {
          const val = {}
          val.value = n
          subbreed.push(val)
        });
        setSubBreed(subbreed)
        setSubBreedValue(subbreed[0])
      });

  };



  const onchangeSelectSub = (item) => {
    setSubBreedValue(item)
  };

  const onchangeNumber = (item) => {
    setNumber(item);
  };

  const viewImage = () => {
    if (!subBreedValue) {
      fetch(
        `https://dog.ceo/api/breed/${breedValue.value}/images/random/${number.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          setImages(data.message)
        });
    } else {
      fetch(
        `https://dog.ceo/api/breed/${breedValue.value}/${subBreedValue.value}/images/random/${number.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          setImages(data.message)
        });
    }

  };


  return (
    <div className="App">
      <Container className="content">
        <Form className="mt-5">
          <FormGroup row>
            <Label for="breed" sm={1}>
              Breed
            </Label>
            <Col sm={8}>
              <Select
                value={breedValue}
                onChange={onchangeSelect}
                options={breed}
                getOptionValue={(breed) => breed.value}
                getOptionLabel={(breed) => breed.value}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="subbreed" sm={1}>
              Subbreed
            </Label>
            <Col sm={8}>
              <Select
                value={subBreedValue}
                onChange={onchangeSelectSub}
                options={subbreed}
                getOptionValue={(subbreed) => subbreed.value}
                getOptionLabel={(subbreed) => subbreed.value}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="number" sm={1}>
              Number of image
            </Label>
            <Col sm={8}>
              <Select
                value={number}
                onChange={onchangeNumber}
                options={numberOfImages}
                getOptionValue={(numberOfImages) => numberOfImages.value}
                getOptionLabel={(numberOfImages) => numberOfImages.value}
              />
            </Col>
          </FormGroup>
          <Button color="primary" onClick={viewImage}>view images</Button>{' '}
        </Form>
        <br />
        <div className="row">
          {images.map((image, index) => <div className="col-xs-10">
            <img key={index} width={100} src={image} /></div>)}
        </div>
      </Container>
    </div>
  );
}

export default App;
