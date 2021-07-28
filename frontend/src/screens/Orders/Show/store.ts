import { ORDER_QUERY } from './queries';
import { makeAutoObservable } from "mobx";
import { SingleOrder } from "~/screens/Orders/Show/types";
import client from "api/gql";

export default class OrdersShowStore {
    initialized = false;
    loading = false;
    order: SingleOrder | null = null;
    id: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    startLoading(): void {
        this.loading = true;
    }

    stopLoading(): void {
        this.loading = false;
    }

    setOrder(order: SingleOrder): void {
        this.order = order;
    }

    async loadOrder() {
        this.startLoading();
        // this.id = id
        const { data: {order} } = await client
            .query(ORDER_QUERY, {
                number: this.id,
            })
            .toPromise();

            
        this.setOrder(order);
        this.stopLoading();
    }

    initialize(id: string | null) {
        if (this.initialized) return;
        this.initialized = true;
        this.id = id;
        this.loadOrder();
    }
}
