import React from "react";
import { CardBody, Card, CardHeader, CardTitle, Row, Col } from "reactstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Button from "components/CustomButtons/Button.jsx";

import "../../assets/css/index.css";

class PurchaseOrders extends React.Component {
  render() {
    return (
      <div className="content">
        <Row>
          <Col md={12}>
            <Card className="demo-icons">
              <CardHeader>
                <CardTitle>Meus Pedidos</CardTitle>
              </CardHeader>
              <CardBody>
                <Card>
                  <CardHeader>
                    <CardTitle>Pedido Nº123456</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Produto X × 2</TableCell>
                          <TableCell>R$ 8,00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Produto Y × 1</TableCell>
                          <TableCell>R$ 2,00</TableCell>
                        </TableRow>
                      </TableBody>
                      <TableHead>
                        <TableRow>
                          <TableCell>Frete</TableCell>
                          <TableCell>R$ 24,00</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow>
                          <TableCell>Total</TableCell>
                          <TableCell>R$ 34,00</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow>
                          <TableCell>Pedido em transporte</TableCell>
                          <TableCell>Previsão: 30/02/2019</TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Pedido Nº654321
                      <Button
                        type="button"
                        color="warning"
                        className="float-right"
                        onClick={this.openNewClientModal}
                      >
                        Solicitar troca
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Produto X × 2</TableCell>
                          <TableCell>R$ 8,00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Produto Y × 1</TableCell>
                          <TableCell>R$ 2,00</TableCell>
                        </TableRow>
                      </TableBody>
                      <TableHead>
                        <TableRow>
                          <TableCell>Frete</TableCell>
                          <TableCell>R$ 24,00</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow>
                          <TableCell>Total</TableCell>
                          <TableCell>R$ 34,00</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow>
                          <TableCell>Pedido Recebido</TableCell>
                          <TableCell>Em: 10/02/2019</TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PurchaseOrders;
