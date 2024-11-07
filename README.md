# PowerPlay: A MQTT-Based Data Archiving System

## Overview

PowerPlay is a Docker-based microservices architecture designed to generate, capture, and display event-data from a MQTT topic.

## Components

- **pusher**: Generates events and publishes these to a MQTT topic
- **archiver**: Subscribes to the MQTT topic, retrieves data, and stores it in the MongoDB database.
- **mongodb**: Stores the archived events
- **api**: Exposes an API for retreiving with the archived data
- **event-management**: Webapp that gives you insights from event-data

## Getting Started

### Clone the Repository:

```
git clone https://github.com/EmilSoderlind/PowerPlay
```

### Build and Run

Since the different components is nicely structured in a dockerized way you can start all of them with this single command. Uses the `/docker-compose.yml` file.

```
docker-compose up
```

Navigate to `localhost:4200` and voila, events starts popping in!

## Improvements

Due to the limited timescope there is much of future enhancements to be done, such as:

- Authentication and Authorization: Consider adding authentication and authorization mechanisms to control access to the API MQTT topic.
- Error Handling: Implement robust error handling and logging.
- Scalability: Explore scaling strategies for handling increased load. Some kind of pagination
- Monitoring: Set up monitoring and alerting to track service health and performance.
- Further documentation: Adding more detailed documentation for each service, including documentating the API using a swagger for example.
