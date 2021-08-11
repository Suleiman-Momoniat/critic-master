let db = {
    users: [
        {
            userId: "ISoNEQSMFhWHg7amv3nyG7ZKC5a2",
            email: "new@email.com",
            handle: "new",
            createdAt: "2021-07-20T02:15:33.056Z",
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/critic-v2.appspot.com/o/413397713.jpeg?alt=media",
            bio: "Hello, I'm new",
            website: "https://user.com",
            location: "London, UK" 
        }
    ],
    lists: [
        {
            userHandle: 'user',
            movieList: [{
                "imageUrl": "/aPZOt9BR3gnk1RyX924ySq81S4P.jpg",
                "genre_ids": {
                    "0": "35",
                    "1": "10402",
                    "2": "10749",
                    "3": "10751"
                },
                "backdrop_path": "/rvsPkUYhWZkAKMb2fnWHw5pNAjZ.jpg",
                "original_language": "en",
                "description": "Matchmaker, Dolly Levi takes a trip to Yonkers, New York to see the well-known unmarried half-a-millionaire, Horace Vandergelder. While there, she convinces him, his two stock clerks and his niece and her beau to go to New York City.",
                "name": "Hello, Dolly!",
                "id": "14030",
                "vote_average": "7",
                "release_date": "1969-12-12"
            },
            {
                "imageUrl": "/bHHt3HIr7MpYiRSw1XNxZm3B3cn.jpg",
                "name": "Hello Again",
                "release_date": "2017-11-08",
                "original_language": "en",
                "id": "446289",
                "backdrop_path": "/4w7BJ1r8ovi1PAoFrpfIJYhfacm.jpg",
                "description": "Ten lost souls slip in and out of one another's arms in a daisy-chained musical exploration of love's bittersweet embrace. A film adaptation of Michael John LaChiusa's celebrated musical, originally based on Arthur Schnitzler's play, La Ronde.",
                "genre_ids": {
                    "0": "18",
                    "1": "10402",
                    "2": "10749"
                },
                "vote_average": "5.4"
            },
            {
                "original_language": "en",
                "backdrop_path": "/v2QVQs3ndYs8945dqDzglatCB6Y.jpg",
                "vote_average": "5.5",
                "description": "Lucy Chadman (Shelley Long) chokes to death and is resurrected by her loopy sister Zelda (Judith Ivey) on the one year anniversary of her death. Lucy, of course, does not believe she has actually been dead and thinks it is an elaborate hoax until she goes to her apartment and discovers her husband (Corbin Bernsen) married to her gold digging best friend, Kim (Sela Ward).",
                "imageUrl": "/uwBdAVvrk8iLB30cqu4Z1LXBm4T.jpg",
                "release_date": "1987-11-06",
                "genre_ids": {
                    "0": "35",
                    "1": "18",
                    "2": "14",
                    "3": "878",
                    "4": "10749"
                },
                "id": "35151",
                "name": "Hello Again",
                "title": "Hello"
            }
            ],
            createdAt: "2021-07-20T01:35:09.125Z",
            likeCount: 5,
            commentCount: 2  
        }
    ]
};

const userDetails = {
    //Redux data
    credentials:{
        userId: "JPrwDQa3jDWPfycQUJhtKJaSzUF2",
        email: "user@email.com",
        handle: "user",
        createdAt: "2021-07-20T02:15:33.056Z",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/critic-v2.appspot.com/o/413397713.jpeg?alt=media",
        bio: "Hello, I'm new",
        website: "https://user.com",
        location: "London, UK" 
    },
    likes: [
        {
            userHandle: "user",
            listId: "4uy1xic6bze6SGjfVYtQ"
        },
        {
            userHandle: "user",
            listId: "NGlbD0fVameLS5CLxMuI"
        }
    ],
    comments: [
        {
            userHandle: "user",
            listId: "4uy1xic6bze6SGjfVYtQ",
            body: "nice one mate!",
            createdAt: "2021-07-20T02:15:33.056Z"
        }
    ] ,
    notifications: [
        {
            recipient: 'user',
            sender: 'john',
            read: 'true | false',
            listId: '4uy1xic6bze6SGjfVYtQ',
            type: 'like | comment',
            createdAt: '2021-07-28T18:02:22.066Z'
        }
    ]
}
