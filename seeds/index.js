const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i<300; i++) {
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '60fe628d13acb82f4ccc1662',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia laborum cumque sequi similique aliquam qui, omnis autem error laboriosam sint? Accusantium blanditiis ab fuga quisquam nostrum, aliquam labore voluptatibus.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                  {
                    url: 'https://res.cloudinary.com/dcqdfsswt/image/upload/v1627362300/YelpCamp/y4tzyw5d4ztdq5fmtq6x.jpg',
                    filename: 'YelpCamp/y4tzyw5d4ztdq5fmtq6x'
                  },
                  {
                    url: 'https://res.cloudinary.com/dcqdfsswt/image/upload/v1627362301/YelpCamp/zyb3joccvwlfv7hpi4d3.jpg',
                    filename: 'YelpCamp/zyb3joccvwlfv7hpi4d3'
                  }
              
            ]      
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
