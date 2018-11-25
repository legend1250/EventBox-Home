import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

@inject('stores')
@observer
class EventList extends Component{

  chunkArray(myArray, chunkSize){
    var results = []
    while (myArray.length) {
      results.push(myArray.splice(0, chunkSize))
    }
    
    return results
  }

  render(){
    const { events } = this.props.stores.event
    const { edges } = events

    return(
      <Grid columns={3} >
        {this.chunkArray(edges.toJS(), 3).map((item, index) => (
          <Grid.Row key={index} >
            {item && item.map(event => (
              <Grid.Column key={event.slug} >
                <EventItem event={event} />
              </Grid.Column>
            ))}
          </Grid.Row>
        ))}
      </Grid>
    )
  }
}

export default EventList

const EventItem = ({event}) => (
  <Card>
    <Image src={event.images.thumbnail} style={{height: 192}} />
    <Card.Content>
      <Card.Header style={{height: 46}} >
        <Link to={`/event/${event.slug}-${event.id}`} target="_blank">
          {event.title}
        </Link>
      </Card.Header>
      <Card.Meta>
        <span className='date'>CreatedAt: {new Date(Number(event.createdAt)).toLocaleString()}</span>
      </Card.Meta>
      <Card.Description style={{height: 58}} >{event.shortDescription}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {event.user.username}
      </a>
    </Card.Content>
  </Card>
)