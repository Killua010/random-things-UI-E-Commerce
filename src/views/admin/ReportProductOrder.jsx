import React, { Component } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Polar, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core components
import {
  orderProductByMounth,
  MainProducts
} from "variables/orderProductVariables.jsx";
import ReportOrderService from '../../services/ReportOrderService';

export default class ReportGeneralOrder extends Component {
  constructor(props) {
    super(props);

    this.service = new ReportOrderService("reports")
    this.state = {
      mounth: 0,
      ordersProductByMounth: [],
      ordersProductMale: [],
      ordersProductFemale: [],
      ordersProductNotBinary: [],
      ordersProductMaleYoung: [],
      ordersProductFemaleYoung: [],
      ordersProductNotBinaryYoung: [],
      ordersProductMaleAdult: [],
      ordersProductFemaleAdult: [],
      ordersProductNotBinaryAdult: [],
      ordersProductMaleOld: [],
      ordersProductFemaleOld: [],
      ordersProductNotBinaryOld: []
    };

    this.getAllOrders = this.getAllOrders.bind(this);

    this.getAllOrders();
  }

  updateFilter = async (value) => {
    await this.setState({
      mounth: value.target.value
    })
    this.getAllOrders()
  }

  async getAllOrders(){
    await this.service.getAllOrdersProduct().then((res) => {
      this.setState({
        ordersProductByMounth: res
      })
    })
    
    await this.service.getAllOrdersProductGender("MASCULINO", this.state.mounth).then((res) => {
      this.setState({
        ordersProductMale: res
      })
    })

    await this.service.getAllOrdersProductGender("FEMININO", this.state.mounth).then((res) => {
      this.setState({
        ordersProductFemale: res
      })
    })

    await this.service.getAllOrdersProductGender("NAOBINARIO", this.state.mounth).then((res) => {
      this.setState({
        ordersProductNotBinary: res
      })
    })

    await this.service.getAllOrdersProductGenderAge("MASCULINO", 18, 40, this.state.mounth).then((res) => {
      this.setState({
        ordersProductMaleYoung: res
      })
    })

    await this.service.getAllOrdersProductGenderAge("FEMININO", 18, 40, this.state.mounth).then((res) => {
      this.setState({
        ordersProductFemaleYoung: res
      })
    })

    await this.service.getAllOrdersProductGenderAge("NAOBINARIO", 18, 40, this.state.mounth).then((res) => {
      this.setState({
        ordersProductNotBinaryYoung: res
      })
    })

    await this.service.getAllOrdersProductGenderAge("MASCULINO", 41, 65, this.state.mounth).then((res) => {
      this.setState({
        ordersProductMaleAdult: res
      })
    })

    await this.service.getAllOrdersProductGenderAge("FEMININO", 41, 65, this.state.mounth).then((res) => {
      this.setState({
        ordersProductFemaleAdult: res
      })
    })

    await this.service.getAllOrdersProductGenderAge("NAOBINARIO", 41, 65, this.state.mounth).then((res) => {
      this.setState({
        ordersProductNotBinaryAdult: res
      })
    })

    await this.service.getAllOrdersProductGenderAge("MASCULINO", 66, 100, this.state.mounth).then((res) => {
      this.setState({
        ordersProductMaleOld: res
      })
    })

    await this.service.getAllOrdersProductGenderAge("FEMININO", 66, 100, this.state.mounth).then((res) => {
      this.setState({
        ordersProductFemaleOld: res
      })
    })

    await this.service.getAllOrdersProductGenderAge("NAOBINARIO", 66, 100, this.state.mounth).then((res) => {
      this.setState({
        ordersProductNotBinaryOld: res
      })
    })

  }
  
  render() {
    return (
      <>
        <div className="content">
        <Card className="card-chart">
          <CardHeader>
            <Row>
              <Col className="text-center">
                <CardTitle tag="h1">Relatórios de venda por produtos</CardTitle>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-center">
                        <CardTitle tag="h4">Top 3 produtos mais vendidas por mês</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                  <div className="chart-area">
                      <Bar
                        data={(e) => orderProductByMounth.data(e, this.state.ordersProductByMounth)}
                        options={orderProductByMounth.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="text-center ml-5" lg="2">
                <Label for="mounth">Filtrar por mês:</Label>
                <Input type="select" name="mounth" id="mounth" value={this.state.mounth} onChange={this.updateFilter}>
                  <option value="0" >Nenhum</option>
                  <option value="1" >Janeiro</option>
                  <option value="2" >Fevereiro</option>
                  <option value="3" >Março</option>
                  <option value="4" >Abril</option>
                  <option value="5" >Maio</option>
                  <option value="6" >Junho</option>
                  <option value="7" >Julho</option>
                  <option value="8" >Agosto</option>
                  <option value="9" >Setembro</option>
                  <option value="10" >Outubro</option>
                  <option value="11" >Novembro</option>
                  <option value="12" >Dezembro</option>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <CardTitle tag="h2">Top 5 Produtos por gênero</CardTitle>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-center">
                        <CardTitle tag="h3">Gênero Masculino</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Polar
                    data={() => MainProducts(this.state.ordersProductMale)}
                    />
                  </CardBody>
                  </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-center">
                        <CardTitle tag="h3">Gênero Feminino</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Polar
                    data={() => MainProducts(this.state.ordersProductFemale)}
                    />
                  </CardBody>
                  </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-center">
                        <CardTitle tag="h3">Gênero Não Binário</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Polar
                    data={() => MainProducts(this.state.ordersProductNotBinary)}
                    />
                  </CardBody>
                  </Card>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <CardTitle tag="h2">Top 5 Produtos por gênero e idade entre 18 a 40 anos</CardTitle>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-center">
                        <CardTitle tag="h3">Gênero Masculino</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Polar
                    data={() => MainProducts(this.state.ordersProductMaleYoung)}
                    />
                  </CardBody>
                  </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-center">
                        <CardTitle tag="h3">Gênero Feminino</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Polar
                    data={() => MainProducts(this.state.ordersProductFemaleYoung)}
                    />
                  </CardBody>
                  </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-center">
                        <CardTitle tag="h3">Gênero Não Binário</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Polar
                    data={() => MainProducts(this.state.ordersProductNotBinaryYoung)}
                    />
                  </CardBody>
                  </Card>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <CardTitle tag="h2">Top 5 Produtos por gênero e idade entre 41 a 65 anos</CardTitle>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-center">
                        <CardTitle tag="h3">Gênero Masculino</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Polar
                    data={() => MainProducts(this.state.ordersProductMaleAdult)}
                    />
                  </CardBody>
                  </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-center">
                        <CardTitle tag="h3">Gênero Feminino</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Polar
                    data={() => MainProducts(this.state.ordersProductFemaleAdult)}
                    />
                  </CardBody>
                  </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-center">
                        <CardTitle tag="h3">Gênero Não Binário</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Polar
                    data={() => MainProducts(this.state.ordersProductNotBinaryAdult)}
                    />
                  </CardBody>
                  </Card>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <CardTitle tag="h2">Top 5 Produtos por gênero e idade a partir de 66 anos</CardTitle>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-center">
                        <CardTitle tag="h3">Gênero Masculino</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Polar
                    data={() => MainProducts(this.state.ordersProductMaleOld)}
                    />
                  </CardBody>
                  </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-center">
                        <CardTitle tag="h3">Gênero Feminino</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Polar
                    data={() => MainProducts(this.state.ordersProductFemaleOld)}
                    />
                  </CardBody>
                  </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-center">
                        <CardTitle tag="h3">Gênero Não Binário</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Polar
                    data={() => MainProducts(this.state.ordersProductNotBinaryOld)}
                    />
                  </CardBody>
                  </Card>
              </Col>
            </Row>
            </CardBody>
            </Card>
        </div>
      </>
    );
  }
}
