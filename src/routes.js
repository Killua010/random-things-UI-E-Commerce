
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
import ProductInactiveList from "views/admin/ProductInactiveList.jsx";
import ApprovedOrder from "views/admin/ApprovedOrder.jsx";
import CarriageOrder from "views/admin/CarriageOrder.jsx";
import DeliveredOrder from "views/admin/DeliveredOrder.jsx";
import PurchaseOrders from "./views/client/PurchaseOrders";
import ChangeOrder from "views/admin/ChangeOrder.jsx";
import AprovedChange from "views/admin/AprovedChange.jsx";
import ReprovedChange from "views/admin/ReprovedChange.jsx";
import PromotionalCouponList from "views/admin/PromotionalCouponList.jsx";
import PromotionalCouponNew from "views/admin/PromotionalCouponNew.jsx";
import ProviderList from "views/admin/ProviderList.jsx";
import ProviderNew from "views/admin/ProviderNew.jsx";
import StockList from "views/admin/StockList.jsx";
import StockInputList from "views/admin/StockInputList.jsx";
import StockNew from "views/admin/StockNew.jsx";
import ReportGeneralOrder from "views/admin/ReportGeneralOrder.jsx";
import ReportCategoryOrder from "views/admin/ReportCategoryOrder.jsx";
import ReportProductOrder from "views/admin/ReportProductOrder.jsx";

import Profile from "./views/client/Profile";
import MyCarts from "./views/client/MyCarts";
import MyAddress from "./views/client/MyAddress";
import MyChanges from "./views/client/MyChanges";
import MyCoupons from "./views/client/MyCoupons";

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
      "/produtos/listar-campo-tecnico", "/produtos/novo-campo-tecnico",
      "/produtos/inativos"],
		name: "Produtos",
		nameChild: ["Todos Produtos", "Dados Produto",
      "Campos Tecnicos", "Dados Tecnico",
      "Produtos Inativos"],
		icon: "fas fa-tshirt",
		iconChild: ["fas fa-bars", "fas fa-dice-d20",
      "fas fa-bars", "fas fa-scroll",
      "fas fa-bars"],
		component: [ProductList, ProductNew,
			TableFieldList, TableFieldNew, ProductInactiveList],
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
	},
	{
		path: ["/pedidos/aprovado", "/pedidos/em-transporte",
			"/pedidos/entregues"],
		name: "Pedidos",
		nameChild: ["Aprovados", "Em transportes",
			"Entregues"],
		icon: "fab fa-jedi-order",
		iconChild: ["fas fa-check-circle", "fas fa-shipping-fast",
			"fas fa-vihara"],
		component: [ApprovedOrder, CarriageOrder,
			DeliveredOrder],
		layout: "/admin"
	},
	{
		path: ["/trocas/solicitacoes","/trocas/aprovadas",
			"/trocas/reprovadas"],
		name: "Troca",
		nameChild: ["Solicitações", "Aprovadas",
			"Reprovadas"],
		icon: "fas fa-people-carry",
		iconChild: ["fas fa-people-carry", "fas fa-check-double",
			"fas fa-times"],
		component: [ChangeOrder, AprovedChange,
			ReprovedChange],
		layout: "/admin"
	}, {
		path: ["/relatorio/vendas", "/relatoria/vendas/categoria",
			"/relatoria/vendas/produtos"],
		name: "Relatorios",
		nameChild: ["Vendas Geral", "Vendas por Categoria",
			"Vendas por Produto"],
		icon: "fas fa-bars",
		iconChild: ["fas fa-barcode", "fas fa-suitcase-rolling",
			"fas fa-dolly-flatbed"],
		component: [ReportGeneralOrder, ReportCategoryOrder,
			ReportProductOrder],
		layout: "/admin"
	}, {
		path: ["/cupons/novo", "/cupons/listar"],
		name: "Cupons Promocionais",
		nameChild: ["Novo", "Todos"],
		icon: "fas fa-ticket-alt",
		iconChild: ["fas fa-tag", "fas fa-tags"],
		component: [PromotionalCouponNew, PromotionalCouponList],
		layout: "/admin"
	},
	{
		path: ["/estoque/atual", "/estoque/novo", "/estoque/lista"],
		name: "Estoque",
		nameChild: ["Atual", "Nova entrada", "Todas entradas"],
		icon: "fas fa-boxes",
		iconChild: ["fas fa-box-open", "fas fa-box-open", "fas fa-box"],
		component: [StockList, StockNew, StockInputList],
		layout: "/admin"
	},
	{
		path: ["/fornecedores/novo", "/fornecedores/lista"],
		name: "Fornecedores",
		nameChild: ["Novo", "Todos"],
		icon: "far fa-building",
		iconChild: ["fas fa-industry", "fas fa-city"],
		component: [ProviderNew, ProviderList],
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
	},
	{
		path: "/trocas",
		name: "Minhas Trocas",
		icon: "nc-icon nc-gift-2",
		component: MyChanges,
		layout: "/perfil"
	},
	{
		path: "/cupons",
		name: "Meus Cupons",
		icon: "nc-icon nc-coins",
		component: MyCoupons,
		layout: "/perfil"
	}
];
