import React, { Component } from 'react'
import Title from '../components/Title'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa'

 
export default class Services extends Component {
  state={
    services:[
      {
        icon:<FaCocktail />,
        title:"free cocktails",
        info:'react is a declarative, efficient and flexible javascript library for building user interfaces.'
      },
      {
        icon:<FaHiking />,
        title:"endless hiking",
        info:'react is a declarative, efficient and flexible javascript library for building user interfaces.'
      },
      {
        icon:<FaShuttleVan />,
        title:"free shuttle",
        info:'react is a declarative, efficient and flexible javascript library for building user interfaces.'
      },
      {
        icon:<FaBeer />,
        title:"strongest beer",
        info:'react is a declarative, efficient and flexible javascript library for building user interfaces.'
      }
    ]
  }
  render() {
    return (
      <section className="services">
      <Title title="services" />
      <div className="services-center">
        {this.state.services.map((item, index) => {
          return(
            <article key={index} className="service">
            <span>{item.icon}</span>
            <h6>{item.title}</h6>
            <p>{item.info}</p>
          </article>);
        })}
      </div>
      </section>
    )
  }
}
