
import CategoryList from "views/admin/CategoryList.jsx";
import CategoryNew from "views/admin/CategoryNew.jsx";
import SubCategoryList from "views/admin/SubCategoryList.jsx";
import SubCategoryNew from "views/admin/SubCategoryNew.jsx";

import Profile from "./views/client/Profile";
import MyCarts from "./views/client/MyCarts";
import MyAddress from "./views/client/MyAddress";
import PurchaseOrders from "./views/client/PurchaseOrders";

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
