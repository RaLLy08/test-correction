import { Injectable } from '@nestjs/common'
import { CrmType, Order, OrdersFilter, RetailPagination } from './types'
import axios, { AxiosInstance } from 'axios'
import { ConcurrencyManager } from 'axios-concurrency'
import { serialize } from '../tools'
import { plainToClass } from 'class-transformer'

@Injectable()
export class RetailService {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: `${process.env.RETAIL_URL}/api/v5`,
      timeout: 10000,
      headers: {
        'X-API-Key': process.env.RETAIL_KEY,
      },
    })

    this.axios.interceptors.request.use((config) => {
      // console.log(config.url)
      return config
    })
    this.axios.interceptors.response.use(
      (r) => {
        // console.log("Result:", r.data)
        return r
      },
      (r) => {
        // console.log("Error:", r.response.data)
        return r
      },
    )
  }

  async orders(filter?: OrdersFilter): Promise<[Order[], RetailPagination]> {
    const params = serialize(filter, '')

    const resp = await this.axios.get('/orders?' + params)
    
    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const orders = plainToClass(Order, resp.data.orders as Array<any>)
    const pagination: RetailPagination = resp.data.pagination

    return [orders, pagination]
  }

  async findOrder(id: string): Promise<Order | null> {
    // const resp = await this.axios.get('/orders/40')
    const mockorder: Order = {
      id: 33,
      number: '1c',
      createdAt: '23',
      status: 'complete',
      statusComment: 'test',
      customerComment: 'tesdt',
      delivery: {
        code: '12',
      },
      items: [
        {
          id: 3,
          status: 'ff',
          quantity: 33,
          offer: {
            displayName: 'wef',
            externalId: '3',
            article: 'werfw',
            properties: {},
          },
          comment: 'wer',
        },
        {
          id: 6,
          status: 'ff',
          quantity: 2223,
          offer: {
            displayName: 'wef',
            externalId: '3',
            article: 'werfw',
            properties: {},
          },
          comment: 'wer',
        },
        {
          id: 67,
          status: 'ff',
          quantity: 55,
          offer: {
            displayName: 'wef',
            externalId: '3',
            article: 'werfw',
            properties: {},
          },
          comment: 'wer',
        },
        {
          id: 456,
          status: 'ff',
          quantity: 3342,
          offer: {
            displayName: 'werhrhf',
            externalId: '43',
            article: 'werfbbrw',
            properties: {},
          },
          comment: 'wer',
        },
        {
          id: 643,
          status: 'ff',
          quantity: 3343,
          offer: {
            displayName: 'ergeger',
            externalId: '354',
            article: 'eregeg',
            properties: {},
          },
          comment: 'wergeer',
        },
        {
          id: 434,
          status: 'ff',
          quantity: 333,
          offer: {
            displayName: 'rthrhr',
            externalId: '3rht',
            article: 'rth',
            properties: {},
          },
          comment: 'hfghfhr',
        },
        {
          id: 335,
          status: 'ff',
          quantity: 333,
          offer: {
            displayName: 'rthrhr',
            externalId: '3rht',
            article: 'rth',
            properties: {},
          },
          comment: 'hfghfhr',
        },
        {
          id: 545,
          status: 'ff',
          quantity: 333,
          offer: {
            displayName: 'rthrhr',
            externalId: '3rht',
            article: 'rth',
            properties: {},
          },
          comment: 'hfghfhr',
        },
        {
          id: 115,
          status: 'ff',
          quantity: 333,
          offer: {
            displayName: 'rthrhr',
            externalId: '3rht',
            article: 'rth',
            properties: {},
          },
          comment: 'hfghfhr',
        },
        {
          id: 445,
          status: 'ff',
          quantity: 333,
          offer: {
            displayName: 'rthrhr',
            externalId: '3rht',
            article: 'rth',
            properties: {},
          },
          comment: 'hfghfhr',
        },
        {
          id: 435,
          status: 'ff',
          quantity: 333,
          offer: {
            displayName: 'rthrhr',
            externalId: '3rht',
            article: 'rth',
            properties: {},
          },
          comment: 'hfghfhr',
        },
        {
          id: 43415,
          status: 'ff',
          quantity: 333,
          offer: {
            displayName: 'rthrhr',
            externalId: '3rht',
            article: 'rth',
            properties: {},
          },
          comment: 'hfghfhr',
        },
        {
          id: 4145,
          status: 'ff',
          quantity: 333,
          offer: {
            displayName: 'rthrhr',
            externalId: '3rht',
            article: 'rth',
            properties: {},
          },
          comment: 'hfghfhr',
        },
      ],
      site: 'string',
      orderType: 'string',
    }

    // console.log(resp.data);
    
    return new Promise((res, rej) => res(mockorder))
  }

  async orderStatuses(): Promise<CrmType[]> {
     return new Promise((res, rej) => res(null))
  }

  async productStatuses(): Promise<CrmType[]> {
     return new Promise((res, rej) => res(null))
  }

  async deliveryTypes(): Promise<CrmType[]> {
     return new Promise((res, rej) => res(null))
  }
}
