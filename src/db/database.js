import axios from 'axios'


const request = axios.create({ baseURL: process.env.REACT_APP_DATABASE_END_POINT })

export async function getCategory(userEmail) {
    const response = await request.get('/flashcard.json')
    const data = response.data
    const users = data.users
    var category;
    for (var user in users) {
        const email = users[user].email;
        if (email === userEmail){
            category = users[user].category;
            return category
        }
    }
    return []
}

export async function addNewCard(newcardInfo) {
    const response = await request.get('/flashcard.json')
    const data = response.data
    for (var user in data.users) {
        const userEmail = data.users[user].email;
        if (userEmail === newcardInfo.user){
            for (var cat in data.users[user].category) {
                const categoryname = data.users[user].category[cat].name;
                if (categoryname === newcardInfo.category) {
                    if (!data.users[user].category[cat].flashcards) {
                        data.users[user].category[cat].flashcards = []
                    }
                    // limit test user to have only 10 flashcard per category.
                    if (data.users[user].category[cat].flashcards.length >= 10
                        && userEmail === 'test@email.com') {
                        return false;
                    }
                    // push new card
                    data.users[user].category[cat].flashcards.push(newcardInfo.card)
                    console.log(data.users[user].category[cat].flashcards);
                    // console.log('card added!')
                    const newData = {
                        users: data.users
                    }
                    try {
                        await request.patch('/flashcard.json', newData).then(response => {
                            // console.log(response);
                            return true;
                        })
                    } catch (error) {
                        return false
                    }
                }
            }
        }
    }
    return false;
}

export async function deleteCard(newcardInfoList) {

    const checkInclude = (ele) => {
        const result = newcardInfoList.flashcards.find(n => n.front.text === ele.front.text)
        if (result) {
            return true
        }
        return false
    }

    const response = await request.get('/flashcard.json')
    const data = response.data
    for (var user in data.users) {
        if (data.users[user].email === newcardInfoList.user){
            for (var cat in data.users[user].category) {
                if (data.users[user].category[cat].name === newcardInfoList.category) {
                    // delete card here

                    const filterList = data.users[user].category[cat].flashcards.filter(
                        ele => !checkInclude(ele))

                    // console.log(filterList);
                    
                    data.users[user].category[cat].flashcards = filterList

                    const newData = {
                        users: data.users
                    }
                    try {
                        await request.patch('/flashcard.json', newData).then(response => {
                            return true;
                        })
                        return true;
                    } catch (error) {
                        return false
                    }
                }
            }
        }
    }
    return false;
}

export async function addNewCategory(categoryInfo) {
    const response = await request.get('/flashcard.json')
    const data = response.data
    for (var user in data.users) {
        if (data.users[user].email === categoryInfo.user){

            // limit test user to have only 4 category.
            if (data.users[user].category.length >= 4
                && data.users[user].email==='test@email.com') {
                    return false;
                }

            // console.log(data.users[user].category);
            data.users[user].category.push({
                name: categoryInfo.name,
                imageUrl: categoryInfo.imageUrl
            })
            const newData = {
                users: data.users
            }
            try {
                await request.patch('/flashcard.json', newData).then(response => {
                    console.log(response);
                    return true;
                })
            } catch (error) {
                return false
            }
        }
    }
    return false
}

export async function deleteCategory(categoryInfo) {
    const response = await request.get('/flashcard.json')
    const data = response.data
    for (var user in data.users) {
        if (data.users[user].email === categoryInfo.user) {
            for (var cat in data.users[user].category) {
                if (data.users[user].category[cat].name === categoryInfo.category){
                    data.users[user].category.splice(cat, 1)
                    const newData = {
                        users: data.users
                    }
                    try {
                        await request.patch('/flashcard.json', newData).then(response => {
                            console.log(response);
                            return true;
                        })
                    } catch (error) {
                        return false
                    }
                }
            }

        }
    }
    return false
}

export async function getPhoto(keyword) {
    const url = "https://api.unsplash.com/search/photos?page=1&per_page=6&query="
    const client = "&client_id=" + process.env.REACT_APP_UNPLASH_APP_ACCESS_KEY
    var photos;
    try {
        await axios.get(url + keyword + client).then(response => {
            photos = response.data.results  
        })
        return photos
    }
    catch(err) {
        return [
            {
                id: "1",
                urls: {
                    regular: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"
                },
                alt_describtion: "rick roll"
            },
            {
                id: "2",
                urls: {
                    regular: "https://images.immediate.co.uk/production/volatile/sites/4/2020/08/GettyImages_591540453-c-159fa30.jpg?quality=90&resize=940%2C400"
                },
                alt_describtion: "hackerman meme"
            },
            {
                id: "3",
                urls: {
                    regular: "https://st1.latestly.com/wp-content/uploads/2021/08/31-6-784x441.jpg"
                },
                alt_describtion: "cute cat"
            },
            {
                id: "4",
                urls: {
                    regular: "https://obs.line-scdn.net/0hOlfcmfRvEENbGjhuYQFvFGNMEyxodgNAPyxBQAd0TnciLwcXYXkNdnceHiRwL1cdNS9bITsbHXpxLgMXNQ/w644"
                },
                alt_describtion: "cute cat"
            },
            {
                id: "5",
                urls: {
                    regular: "https://i.kym-cdn.com/entries/icons/original/000/021/807/ig9OoyenpxqdCQyABmOQBZDI0duHk2QZZmWg2Hxd4ro.jpg"
                },
                alt_describtion: "cute cat"
            },
            {
                id: "6",
                urls: {
                    regular: "https://i.insider.com/619cd5edd2fd620018209b5a?width=700"
                },
                alt_describtion: "cute cat"
            },

        ]
    }
}
