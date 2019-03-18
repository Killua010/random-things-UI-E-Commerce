
import CategoryList from "views/admin/CategoryList.jsx";
import CategoryNew from "views/admin/CategoryNew.jsx";
import SubCategoryList from "views/admin/SubCategoryList.jsx";
import SubCategoryNew from "views/admin/SubCategoryNew.jsx";

import TableFieldList from "views/admin/TableFieldList.jsx";
import TableFieldNew from "views/admin/TableFieldNew.jsx";
import ProductList from "views/admin/ProductList.jsx";
import ProductNew from "views/admin/ProductNew.jsx";
import PricingGroupList from "views/admin/PricingGroupList.jsx";
import PricingGroupNew from "views/admin/PricingGroupNew.jsx";

import Profile from "./views/client/Profile";
import MyCarts from "./views/client/MyCarts";
import MyAddress from "./views/client/MyAddress";
import PurchaseOrders from "./views/client/PurchaseOrders";

import Index from "./views/main/Index";
import Catalog from "./views/main/Catalog";
import ProductDescription from "./views/main/ProductDescription";
import Login from "./views/main/Login";
import ShoppingCart from "./views/main/ShoppingCart";
import ClientRegister from "./views/main/ClientRegister";
import Payment from "./views/main/Payment";
import FinishOrder from "./views/main/FinishOrder";
import Favorite from "./views/main/Favorite";

export var mainRoutes = [
  {
    path: "/",
    component: Index
  },
  {
    path: "/catalogo",
    component: Catalog
  },
  {
    path: "/produto",
    component: ProductDescription
  },
  {
    path: "/pagamento",
    component: Payment
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/carrinho",
    component: ShoppingCart
  },
  {
    path: "/cadastro",
    component: ClientRegister
  },
  {
    path: "/pedidoFinalizado",
    component: FinishOrder
  },
  {
    path: "/favorito",
    component: Favorite
  }
];

export const adminRoutes = [
  {
    path: ["/produtos/listar-categorias", "/produtos/nova-categoria",
          "/produtos/listar-subcategorias", "/produtos/nova-subcategoria"],
    name: "Categorias",
    nameChild: ["Todas Categorias", "Dados Categoria",
                "Todas SubCategorias", "Dados SubCategoria"],
    icon: "fas fa-book",
    iconChild: ["fas fa-bars", "fas fa-headphones",
                "fas fa-bars", "fas fa-guitar"],
    component: [CategoryList, CategoryNew,
                SubCategoryList, SubCategoryNew],
    layout: "/admin"
  },
  {
    path: ["/produtos/listar-produtos", "/produtos/novo-produto",
          "/produtos/listar-campo-tecnico", "/produtos/novo-campo-tecnico"],
    name: "Produtos",
    nameChild: ["Todos Produtos", "Dados Produto",
                "Campos Tecnicos", "Dados Tecnico"],
    icon: "fas fa-tshirt",
    iconChild: ["fas fa-bars", "fas fa-dice-d20",
                "fas fa-bars", "fas fa-scroll"],
    component: [ProductList, ProductNew,
                TableFieldList, TableFieldNew],
    layout: "/admin"
  },
  {
    path: ["/produtos/listar-grupo-precificacao", "/produtos/novo-grupo-precificacao"],
    name: "Precificação",
    nameChild: ["Precificaçoes", "Dados Precificação"],
    icon: "fas fa-money-bill-wave",
    iconChild: ["fas fa-bars", "fas fa-dollar-sign"],
    component: [PricingGroupList, PricingGroupNew],
    layout: "/admin"
  }
];

export const clientRoutes = [
  {
    path: "/inicio",
    name: "Dados Pessoais",
    icon: "nc-icon nc-single-02",
    component: Profile,
    layout: "/perfil"
  },
  {
    path: "/enderecos",
    name: "Meus endereços",
    icon: "nc-icon nc-compass-05",
    component: MyAddress,
    layout: "/perfil"
  },
  {
    path: "/cartoes",
    name: "Meus cartões",
    icon: "nc-icon nc-credit-card",
    component: MyCarts,
    layout: "/perfil"
  },
  {
    path: "/pedidos",
    name: "Meus pedidos",
    icon: "nc-icon nc-bag-16",
    component: PurchaseOrders,
    layout: "/perfil"
  }
];
