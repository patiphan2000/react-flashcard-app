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

export async function compareFlashcard() {
    console.log('compare!!');
    const response = await request.get('/flashcard.json')
    const data = response.data
    const result = (data.users === sample.users);
    console.log(data.users);
    console.log(sample.users);
    return result
}
