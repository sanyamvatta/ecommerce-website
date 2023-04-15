import './categories-list.styles.scss'
import React from 'react'
import CategoryItem from '../category-item/category-item.component'

export default function CategoriesContainer({categories}) {
  return (
    <div className="categories-container">
      {categories.map((category)=>{
        return (
          <CategoryItem key ={category.id} category={category}/>
        )
      })}


    </div>
  )
}
