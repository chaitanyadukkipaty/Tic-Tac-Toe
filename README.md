<div align="center">

  ![Tic-Tac-Toe](https://imgur.com/kXrYcQr.png)
  [![Status](https://img.shields.io/badge/status-active-green.svg)]()
  [![License](https://img.shields.io/badge/license-GNU-blue.svg)](LICENSE.md)

</div>

---

<p align="center">Open source platform for sharing legal document templates.</p>
<p align="center">Currently live on: http://159.65.145.166:8000</p>

# Table of Content
+ [Rules](#description)
+ [Getting Started](#getting_started)
+ [Future Scope](#future_scope)
+ [File Structure](#file_structure)
+ [Contributing](#contributing)
+ [Authors](#authors)

## Rules<a name="description"></a>
+ Unlike Regular Tic Tac Toe 'X' doesnt always start first.
+ Each player begins with 100 points. Players can use these points to place bids.
+ Turns are decided by the bids placed by the players. The Player with bigger bid wins round and can freely place his/her move.
+ If both players reach 0 points before winning then the game is considered a draw
+ If both players bid the same points then its considered draw and they have to bid again

## Getting Started<a name="getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

Installing NodeJs
```
$ sudo apt-get install nodejs
```
Installing ReactJs
```
$ npm install -g create-react-app
```
### Installing

A step by step series of examples that tell you how to get a development env running

Cloning the repo
```
$ git clone https://github.com/chaitanyadukkipaty/Tic-Tac-Toe.git
```
Installing the dependencies
```
$ cd Tic-Tac-Toe
$ npm install
$ cd FrontEnd/
$ npm install
```
If you are running a development environment, use the following command:
```
$ npm run start 
```
If you are running a deployment environment, use the following command:
```
$ npm run build
```

Running the server
```
$ node app.js
```
The application will now be running on https://localhost:8080/

## Built With<a name="built_with"></a>
+ [MongoDB](https://www.mongodb.com/) - Database
+ [Express](https://expressjs.com/) - Server Framework
+ [ReactJs](https://reactjs.org/) - Web Framework
+ [NodeJs](https://nodejs.org/en/) - Server Environment


## Future Scope<a name="future_scope"></a>
+ Commentary/Chat section to make game more interactive

## File Structure <a name="file_structure"></a>
/app.js  : Main server code <br>
/FrontEnd  : Website code <br>
/models     : Data structures and methods to access them <br>

## Contributing<a name="contributing"></a>

1. Fork it (<https://github.com/chaitanyadukkipaty/Tic-Tac-Toe/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Authors<a name="authors"></a>
+ [Chaitanyakrishna Dukkipaty](https://github/chaitanyadukkipaty) <br>
