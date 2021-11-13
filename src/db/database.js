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
        if (data.users[user].email === newcardInfo.user){
            for (var cat in data.users[user].category) {
                if (data.users[user].category[cat].name === newcardInfo.category) {
                    if (!data.users[user].category[cat].flashcards) {
                        data.users[user].category[cat].flashcards = []
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
    await axios.get(url + keyword + client).then(response => {
        photos = response.data.results  
    })
    return photos
}
