import React from "react";
import OrdersShowStore from "./store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import styles from "./styles.m.styl";
import { map } from "lodash";
import Item from "./components/Item";

type ShowParams = {
  id: string;
};

const OrdersShow = observer(
  (): JSX.Element => {
    const [state] = React.useState(new OrdersShowStore());
    const { id } = useParams<ShowParams>();
    
    React.useEffect(() => {
      if (state.initialized) return;
      state.initialize(id);
    })

    

    return (
        <div className={styles.screenWrapper}>
            <div className={styles.screen}>
                {!state.loading && state.order && (
                    <>
                        <div>{state.order.number}</div>
                        <div className={styles.items}>
                            {map(state.order.items,
                              item => <Item key={item.id} item={item}/>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
  }
);

export default OrdersShow;
