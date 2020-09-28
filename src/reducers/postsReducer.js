const initialStore = [
    {
        id: 0,
        author: {
            name: "Anakin Skywalker",
            photo:
                "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Anakin-Jedi.jpg/220px-Anakin-Jedi.jpg",
            nickname: "@dart_vader",
        },
        content: "WTF? Who is Rey? Why she is Skywalker? Luke...?",
        image:
            "https://specials-images.forbesimg.com/imageserve/5e63b3c8e1e617000759130e/960x0.jpg?fit=scale",
        date: "Mon Sep 21 2020",
        social: {
            likes: 165,
            shares: 8,
            comments: 63,
        },
    },
    {
        id: 1,
        author: {
            name: "Luke Skywalker",
            photo:
                "https://s1.1zoom.ru/big0/995/Star_Wars_The_Last_Jedi_Men_Luke_Skywalker_Mark_536216_640x1024.jpg",
            nickname: "@good_luke",
        },
        content: "Rey called herself Skywalker because she is the last JEDI",
        image:
            "https://swshadowcouncil.files.wordpress.com/2018/01/8fcc2-t-star-wars-portfolio-06-2017-longform-a.jpg",
        date: "Tue Sep 22 2020",
        social: {
            likes: 134,
            shares: 6,
            comments: 52,
        },
    },
];

const postsReducer = (store = initialStore, action) => {
    switch (action.type) {
        case "POST_CREATE": {
            const currentAuthor = store.find(
                (el) => el.author.name === action.author
            );
            return [
                ...store,
                {
                    id: action.id,
                    author: {
                        name: currentAuthor.author.name,
                        photo: currentAuthor.author.photo,
                        nickname: currentAuthor.author.nickname,
                    },
                    content: action.content,
                    image: action.image,
                    date: new Date().toDateString(),
                    social: {
                        likes: 0,
                        shares: 0,
                        comments: 0,
                    },
                },
            ];
        }
        default:
            return initialStore;
    }
};

export default postsReducer;
