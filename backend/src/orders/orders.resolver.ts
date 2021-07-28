import { OrdersFilter } from './../retail_api/types'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { RetailService } from '../retail_api/retail.service'
import { OrdersResponse } from '../graphql'

@Resolver('Orders')
export class OrdersResolver {
  constructor(private retailService: RetailService) {}

  @Query()
  async order(@Args() id: string) {

    return this.retailService.findOrder(id)
  }

  @Query()
  async getOrders(
    @Args() filter?: OrdersFilter,
  ): Promise<OrdersResponse> {
    
    const [orders, pagination] = await this.retailService.orders(filter)

    return { orders, pagination }
  }
}
