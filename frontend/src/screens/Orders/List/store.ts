import { makeAutoObservable } from "mobx";
import { OrdersListItem, OrdersFilter } from "./types";
import { createBrowserHistory, History } from "history";
import client from "api/gql";
import { GET_ORDERS_QUERY } from "~/screens/Orders/List/queries";

export default class OrdersListState {
  initialized = false;
  loading = false;
  page = 1;
  totalPages = 1;
  orders: OrdersListItem[] = [];
  history: History;

  setInitialized(val: boolean) {
    this.initialized = val;
  }

  constructor() {
    makeAutoObservable(this);
    this.history = createBrowserHistory();
  }

  setOrders(orders: OrdersListItem[]): void {
    this.orders = orders;
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }

  setPage(page: number): void {
    this.page = page;
    const url = new URL(window.location.href);
    if (url.searchParams.get("page") !== this.page.toString()) {
      url.searchParams.set("page", "" + this.page);
      this.history.replace(url.pathname + url.search, {});
    }
  }

  setPageFromUrl(): void {
    const url = new URL(window.location.href);
    const page = url.searchParams.get("page");

    if (page) {
      if (+page) {
        this.page = +page
      } else {
        this.history.push(url.pathname);
      }
    }
  }

  nextPage(): void {
    if (this.page >= this.totalPages) return;
    this.setPage(this.page + 1);
    this.loading = true;
    this.loadOrders();
  }

  prevPage(): void {
    if (this.page <= 1) return;
    this.setPage(this.page - 1);
    this.loading = true;
    this.loadOrders();
  }

  setTotalPages(totalPages: number): void {
    this.totalPages = totalPages;
  }

  get canNext(): boolean {
    return (this.page < this.totalPages) && !this.loading;
  }

  get canPrev(): boolean {
    return (this.page > 1) && (this.page <= this.totalPages) && !this.loading;
  }

  async loadOrders() {
    this.startLoading();
    const ordersFilter: OrdersFilter = {
      page: this.page,
    };

    const {
        data: {
            getOrders: { orders, pagination },
        },
    } = await client.query(GET_ORDERS_QUERY, ordersFilter).toPromise();
      
    this.setOrders(orders);
    this.setTotalPages(pagination.totalPageCount);

    this.stopLoading();
  }

  initialize() {
    if (this.initialized) return;
    this.initialized = true;
    this.setPageFromUrl();
    this.loadOrders();
  }
}
