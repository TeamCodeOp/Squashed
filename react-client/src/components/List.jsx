import React from 'react';
import axios from 'axios';
import { Grid, Image, Icon, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.updateViewCount = this.updateViewCount.bind(this);
  }

  componentWillUnmount() {
    console.log('unmounting');
    if (this.props.isViewFilter) {
      this.props.toggleViewFilter();
    }
  }

  updateViewCount(id) {
    axios.put('/viewCount', { id })
      .then((response) => {
        console.log('new view count: ', response.data.view_count);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Grid.Row columns={4}>
        {this.props.projects.map((project, i) => {
          return (
            <Grid.Column key={i}>
              <div style={{ float: 'left', position: 'relative' }}>
                <Link to={`/apps/${project.id}`}>
                  <Card style={{ maxWidth: '230px' }}>
                    <Image
                      onClick={() => this.updateViewCount(project.id)}
                      className="imgThumb"
                      src={project.image_Url || 'https://avatars0.githubusercontent.com/u/583231?s=460&v=4'}
                      style={{
                        borderRadius: '0px',
                        margin: 'auto'
                      }}
                    />
                    <Card.Content>
                      <Card.Header style={{ fontSize: '1em' }}>
                        {project.project_name}
                      </Card.Header>
                      <Card.Description style={{ fontSize: '.85em' }}>
                        {project.category}
                      </Card.Description>
                    </Card.Content>
                    {project.techs &&
                    <Card.Content extra textAlign="left">
                      {project.techs.filter(tech => this.props.techFilter.includes(tech)).join(' ')}
                    </Card.Content> }
                    {this.props.isViewFilter &&
                    <Card.Content extra textAlign="right">
                      <Icon name="eye" style={{ float: 'right' }} />
                      {project.view_count}
                    </Card.Content> }
                  </Card>
                </Link>
              </div>
            </Grid.Column>
          );
        })}
      </Grid.Row>
    );
  }
}

export default List;
