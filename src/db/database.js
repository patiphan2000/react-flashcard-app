import axios from 'axios'
import * as sample from './sample.json'

const request = axios.create({ baseURL: process.env.REACT_APP_DATABASE_END_POINT })

const data = {
    users: [
        {
            email: 'test@email.com',
            category: [
                {
                    name: 'French',
                    flashcards: [
                        {
                            front: {
                                text: 'front',
                                subText: 'front sub'
                            },
                            back: {
                                text: 'back',
                                subText: 'back sub'
                            }
                        },
                        {
                            front: {
                                text: 'front2',
                                subText: 'front sub'
                            },
                            back: {
                                text: 'back2',
                                subText: 'back sub'
                            }
                        },
                        {
                            front: {
                                text: 'front3',
                                subText: 'front sub'
                            },
                            back: {
                                text: 'back3',
                                subText: 'back sub'
                            }
                        }
                    ]
                },
            ]
        },
    ]
}

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

export function updateFlashcard() {
    const newData = {
        users: sample.users
    }
    request.patch('/flashcard.json', newData).then(response => {
        console.log(response);
    })
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
                    console.log('card added!');
                    const newData = {
                        users: data.users
                    }
                    try {
                        await request.patch('/flashcard.json', newData).then(response => {
                            console.log(response);
                            return true;
                        })
                    } catch (error) {
                        // const err = error as AxiosError
                        // if (err.response) {
                        //    console.log(err.response.status)
                        //    console.log(err.response.data)
                        // }
                        // this.handleAxiosError(error)
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

                    console.log(filterList);
                    
                    data.users[user].category[cat].flashcards = filterList

                    const newData = {
                        users: data.users
                    }
                    try {
                        await request.patch('/flashcard.json', newData).then(response => {
                            console.log(response);
                            return true;
                        })
                    } catch (error) {
                        // const err = error as AxiosError
                        // if (err.response) {
                        //    console.log(err.response.status)
                        //    console.log(err.response.data)
                        // }
                        // this.handleAxiosError(error)
                        return false
                    }
                }
            }
        }
    }
    return false;
}

export async function compareFlashcard() {
    console.log('compare!!');
    const response = await request.get('/flashcard.json')
    const data = response.data
    const result = (data.users === sample.users);
    console.log(data.users);
    console.log(sample.users);
    return result
}
