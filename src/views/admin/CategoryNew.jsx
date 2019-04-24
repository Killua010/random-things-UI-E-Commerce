import React, { Component } from 'react';
import CategoryService from '../../services/CategoryService';
import swal from 'sweetalert';
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import BlockUi from 'react-block-ui';
import { Loader } from 'react-loaders';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import Dropzone from 'react-dropzone'
import axios from 'axios';
import {
  Card, 
  Row,
  Col,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Label,
  Input,
} from "reactstrap";

export default class CategoryNew extends Component {

  constructor(props) {
    super(props);
    this.service = new CategoryService("categories");
    
    this.state = {
      category: {
        imgSrc: null
      },
      update: false,
      loaderType: 'ball-pulse-sync',
      blocking: false
    };

    this.updateData = this.updateData.bind(this)
    this.putCategory = this.putCategory.bind(this)
    this.postCategory = this.postCategory.bind(this)
    this.executeEvent = this.executeEvent.bind(this)
    this.alterBlockUI = this.alterBlockUI.bind(this)
    this.updateImage = this.updateImage.bind(this)
  }

  async putCategory(category){
    this.alterBlockUI()
    await this.service.put(category)
    this.props.history.push("listar-categorias");
    this.alterBlockUI()
  }

  async postCategory(category){
    this.alterBlockUI()
    await this.service.post(category)
    this.props.history.push("listar-categorias");
    this.alterBlockUI()
  }

  updateData(value){
    this.setState({
      category: {
        ...this.state.category,
        name: value.target.value
      }
    })
  }

  updateImage(value){
    this.setState({
      category: {
        ...this.state.category,
        image: value.target.value
      }
    })
  }

  executeEvent(category){ 
    if(this.state.update === false)
      this.postCategory(category)
    else  
      this.putCategory(category)
  }

  alterBlockUI(){
    this.setState({
      blocking: !this.state.blocking
    })
  }

  componentDidMount() {
    
    if(this.props.location.state !== undefined){
      this.setState({
        category: this.props.location.state.category,
        update: true
      })
    } else {
      this.setState({
        category: {},
        update: false
      })
    }
  }

  onDrop = (files, reject) => {
    // POST to a test endpoint for demo purposes
    console.log(files)
    if(reject && reject.length > 0){
      alert("error")
      return;
    }

    const fileItemReader = new FileReader();
    fileItemReader.addEventListener("load", () => {
      this.setState({
        category: {
          ...this.state.category,
          image: files[0],
          imgSrc: fileItemReader.result
        }
      })
    })

    // let data = new FormData();
    // const config = {
    //     headers: { 'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p' }
    // };
    // axios.post("localhost:8080/categories", data, config);

    // let data = new FormData();
    //     for (let i = 0; i < this.state.files.length; i++) {
    //         let file = accepted[i];
    //         data.append("file" + i, file, file.name);
    //     }
    //     const config = {
    //         headers: { 'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p' }
    //     };
    //     axios.post("categories", data, config);
    // }
    
    fileItemReader.readAsDataURL(files[0])
    // const req = request.post('https://httpbin.org/post');

    // files.forEach(file => {
    //   req.attach(file.name, file);
    // });

    // req.end();
  }

  render() {
    const {imgSrc} = this.state.category
    return (
      <div className="content">
        <BlockUi tag="div" blocking={this.state.blocking} loader={<Loader active type={this.state.loaderType} color="#02a17c"/>}>
            <Col xs="12">
            <h4 className="title">Dados da categoria</h4>
            <Card>
            <CustomTabs
                  plainTabs
                  headerColor="warning"
                  tabs={[
                    {
                      tabName: "Dados básicos",
                      tabContent: (
                        <div>
                          <Label for="categoryName">Nome da categoria</Label>
                          <Input type="text" id="categoryName" name="categoryName" value={this.state.category.name} onChange={this.updateData}></Input>
                        </div>
                      )
                    },
                    {
                      tabName: "Fotos",
                      tabContent: (
                        <div>
                          <Dropzone onDrop={this.onDrop} multiple={false} accept="image/*">
                            {imgSrc !== null ? <img src={imgSrc} /> : ''}
                          </Dropzone>
                          Imagem da Categoria
                        </div>
                      )
                    }
                  ]}
                />
                <CardFooter>
                <Button tag="label"
                      className="btn-simple float-right"
                      color="warning"
                      size="md"
                      onClick={() => { this.executeEvent(this.state.category) } }>
                      Salvar
                </Button>
                </CardFooter>
                </Card>
          </Col>
        </BlockUi>
      </div>
      
    )
  }
}

