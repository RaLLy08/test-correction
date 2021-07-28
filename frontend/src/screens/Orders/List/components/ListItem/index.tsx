import React from "react";
import styles from "./styles.m.styl";
import { OrdersListItem } from "../../types";
import { observer } from "mobx-react-lite";
import moment from "moment";
import "moment/locale/ru";
import Tag from "components/Tag";
import OrderStatus from "components/OrderStatus";
import DeliveryType from "components/DeliveryType";
import { Link } from "react-router-dom";
 
const ListItem = observer(
  ({ order }: { order: OrdersListItem }): JSX.Element => {
    return (
        <div className={styles.row}>
            <div className={styles.cell}>
                <div className={styles.orderNumber}>
                    <Link to={`/orders/${order.id}`}>{order.number}</Link>
                </div>
            </div>
            <div className={styles.cell}>
                {moment(order.createdAt).format("DD.MM.YYYY HH:mm")}
            </div>
            <div className={styles.cell} title={order.delivery?.code}>
                {order.delivery && <DeliveryType code={order.delivery?.code} />}
            </div>
            <div className={styles.cell}>
                {moment().from(order.createdAt, true)}
            </div>
            <div className={styles.cell} title={order.status}>
                <OrderStatus code={order.status} />
            </div>
        </div>
    );
  }
);

export default ListItem;
