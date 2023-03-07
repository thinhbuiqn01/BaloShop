import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
// Routing
import { BrowserRouter as Router, Switch } from "react-router-dom";

// Components
import Footer from "./components/Footer";
import Header from "./components/Header";

// Screens

// History
import Routes from "./routes";
import history from "./utils/history";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Routes />
      </Switch>
      {/* <Header />
      <main className="py-3">
        <Container> */}
      {/* <Route path='/order/:id' component={OrderScreen} />
                    <Route path='/place-order' component={PlaceOrderScreen} />
                    <Route path='/payment' component={PaymentScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/' component={HomeScreen} exact /> */}

      {/* </Container>
      </main>
      <Footer /> */}
    </Router>
  );
};

export default App;
