import React, { Component as Comp } from 'react'
import './Dashboard.css'
import Product from '../Product/Product'
import ref from '../../refrence'
import axios from 'axios'

export default class Dashboard extends Comp {
  constructor() {
    super()
    this.state = {
      inventory: []
    }
  }

  componentDidMount() {
    this.getItems()
  }

  componentDidUpdate(prevProps, prevState) {
    const { inventory } = this.state
    if (prevState.inventory !== inventory) this.getItems()
  }

  getItems = () => {
    axios
      .get(ref.BASE_URL)
      .then(res => {
        this.setState({
          inventory: res.data
        })
      })
      .catch(err => console.log(`get request err: ${err}`))
  }

  updateItem = (id, obj) => {
    axios
      .put(`${ref.BASE_URL}/${id}`, obj)
      .catch(err => console.log(`put request err: ${err}`))
  }

  deleteItem = id => {
    let deleteBool = window.confirm('Are You Sure You Want to Delete Item')
    if (deleteBool) {
      axios
        .delete(`${ref.BASE_URL}/${id}`)
        .catch(err => console.log(`delete request err: ${err}`))
    }
  }
  render() {
    const { inventory } = this.state
    const productArr = inventory.map(elm => {
      return (
        <Product
          key={elm.id}
          item={elm}
          deleteFn={this.deleteItem}
          updateFn={this.updateItem}
        />
      )
    })
    return <section>{productArr}</section>
  }
}
